# aiModel.py
from llama_cpp import Llama
import os

MODEL_PATH = os.path.join(os.getcwd(), "models", "blake.gguf")

class LocalLLM:
    def __init__(self):
        try:
            self.llm = Llama(
                model_path=MODEL_PATH,
                n_ctx=2048,
                n_threads=8,
                n_gpu_layers=25,
                chat_format="llama-2"
            )
            print("✅ LLM model loaded successfully.")
        except Exception as e:
            print(f"❌ Failed to load LLM model: {str(e)}")
            self.llm = None

    def generate_post(self, prompt: str) -> str:
        if not self.llm:
            return "LLM model is not available."

        try:
            print(f"🧠 Prompt received by LLM: {prompt}")
            response = self.llm.create_chat_completion(
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=200
            )
            if "choices" in response and response["choices"]:
                content = response["choices"][0]["message"]["content"].strip()
                print(f"✅ Generated content: {content}")
                return content
            print("⚠️ No choices returned from model.")
            return "No content generated."
        except Exception as e:
            print(f"❌ Error generating response: {str(e)}")
            return "Error generating content."

# app.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from aiModel import LocalLLM
from database import schedule_post_to_db, init_db
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = LocalLLM()

@app.on_event("startup")
def startup():
    init_db()

class PostRequest(BaseModel):
    prompt: str
    scheduled_time: datetime

@app.post("/generate_and_schedule")
def generate_and_schedule(post_req: PostRequest):
    if llm.llm is None:
        raise HTTPException(status_code=500, detail="AI model not loaded")

    content = llm.generate_post(post_req.prompt)
    if "Error" in content:
        raise HTTPException(status_code=500, detail="AI generation failed")

    post_id = schedule_post_to_db(content, post_req.scheduled_time)
    return {
        "content": content,
        "scheduled_time": post_req.scheduled_time.isoformat(),
        "post_id": post_id
    }

# database.py
import sqlite3
from datetime import datetime
import uuid

DB_PATH = "scheduleAI.db"

def init_db():
    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS scheduled_posts (
                    post_id TEXT PRIMARY KEY,
                    content TEXT NOT NULL,
                    scheduled_time TEXT NOT NULL,
                    posted INTEGER DEFAULT 0
                )
            ''')
            conn.commit()
            print("✔️ Database initialized successfully")
    except sqlite3.Error as e:
        print(f"❌ Error initializing the database: {e}")

def schedule_post_to_db(content, scheduled_time):
    try:
        scheduled_time = datetime.strptime(str(scheduled_time), "%Y-%m-%dT%H:%M:%S")
        post_id = str(uuid.uuid4())
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO scheduled_posts (post_id, content, scheduled_time, posted)
                VALUES (?, ?, ?, ?)
            ''', (post_id, content, scheduled_time.isoformat(), 0))
            conn.commit()
            print("✔️ Post scheduled successfully")
            return post_id
    except Exception as e:
        print(f"❌ Error scheduling post: {e}")
        return None

def get_scheduled_posts():
    now = datetime.utcnow()
    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT post_id, content, scheduled_time FROM scheduled_posts
                WHERE scheduled_time <= ? AND posted = 0
            ''', (now.isoformat(),))
            posts = cursor.fetchall()
            return posts
    except Exception as e:
        print(f"❌ Error fetching scheduled posts: {e}")
        return []

def mark_posted(post_id):
    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute("UPDATE scheduled_posts SET posted = 1 WHERE post_id = ?", (post_id,))
            conn.commit()
            print(f"✔️ Post {post_id} marked as posted")
    except Exception as e:
        print(f"❌ Error marking post as posted: {e}")

# scheduler.py
import schedule
import time
import logging
from database import get_scheduled_posts, mark_posted

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("scheduler.log"),
        logging.StreamHandler()
    ]
)

def post_to_platform(content):
    try:
        logging.info(f"[POSTED]: {content}")
        return True
    except Exception as e:
        logging.error(f"Failed to post content: {e}")
        return False

def job():
    logging.info("Running scheduled job check...")
    posts = get_scheduled_posts()
    for post_id, content, scheduled_time in posts:
        if post_to_platform(content):
            mark_posted(post_id)
            logging.info(f"Marked post {post_id} as posted.")
        else:
            logging.error(f"Failed to post content: {content}")

def run_scheduler():
    logging.info("Starting the post scheduler...")
    schedule.every(10).seconds.do(job)
    while True:
        schedule.run_pending()
        time.sleep(1)
