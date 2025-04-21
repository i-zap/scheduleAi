from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from aiModel import LocalLLM
from database import schedule_post_to_db
from pydantic import BaseModel
from typing import List
import json
from pathlib import Path
import logging

# Setup logging
logging.basicConfig(level=logging.DEBUG)

app = FastAPI()

JSON_FILE_PATH = Path("scheduled_posts.json")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = LocalLLM()

class PostRequest(BaseModel):
    prompt: str
    scheduled_time: datetime

@app.post("/generate-post")
async def generate_post(request: PostRequest):
    """Generate a post using the LLM and schedule it."""
    generated_content = llm.generate_post(request.prompt)
    scheduled_time = request.scheduled_time

    # Call the function with the correct parameters (content and scheduled_time)
    post_id = schedule_post_to_db(generated_content, scheduled_time)

    return {
        "post_id": post_id,
        "content": generated_content,
        "scheduled_time": scheduled_time
    }

class Post(BaseModel):
    title: str
    content: str
    scheduled_time: datetime
    posted: bool

# Get all scheduled posts
@app.get("/scheduled_posts", response_model=List[Post])
async def get_scheduled_posts():
    try:
        with open(JSON_FILE_PATH, "r", encoding="utf-8") as file:
            data = json.load(file)

        posts = [
            Post(
                title=post.get("title", ""),
                content=post.get("content", ""),
                scheduled_time=datetime.fromisoformat(post["scheduled_time"]),
                posted=post.get("posted", False)  # default to False if missing
            )
            for post in data
        ]

        return posts

    except Exception:
        raise HTTPException(status_code=500, detail="Unable to fetch scheduled posts")

# Get only upcoming (not posted) posts
@app.get("/posts/upcoming", response_model=List[Post])
async def get_upcoming_posts():
    try:
        with open(JSON_FILE_PATH, "r", encoding="utf-8") as file:
            data = json.load(file)

        upcoming = [
            Post(
                title=post.get("title", ""),
                content=post.get("content", ""),
                scheduled_time=datetime.fromisoformat(post["scheduled_time"]),
                posted=post.get("posted", False)
            )
            for post in data if not post.get("posted", False)
        ]

        return upcoming

    except Exception:
        raise HTTPException(status_code=500, detail="Unable to fetch upcoming posts")

# Get only published posts
@app.get("/posts/published", response_model=List[Post])
async def get_published_posts():
    try:
        with open(JSON_FILE_PATH, "r", encoding="utf-8") as file:
            data = json.load(file)

        published = [
            Post(
                title=post.get("title", ""),
                content=post.get("content", ""),
                scheduled_time=datetime.fromisoformat(post["scheduled_time"]),
                posted=post.get("posted", False)
            )
            for post in data if post.get("posted", False)
        ]

        return published

    except Exception:
        raise HTTPException(status_code=500, detail="Unable to fetch published posts")
