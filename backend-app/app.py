from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ai_model import generate_caption

app = FastAPI()

# CORS: Allow frontend (Next.js) to connect to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # adjust if deployed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request body format
class PromptRequest(BaseModel):
    prompt: str

# API Route: Local LLM Inference
@app.post("/generate")
async def generate_text(request: PromptRequest):
    try:
        prompt = request.prompt.strip()
        if not prompt:
            return {"error": "Prompt cannot be empty."}

        response = generate_caption(prompt)
        return {"response": response}
    except Exception as e:
        return {"error": str(e)}

# Health check
@app.get("/")
async def root():
    return {"message": "Local AI backend is up and running!"}
