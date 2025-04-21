import json
from datetime import datetime
import os
import uuid

# Define the file where posts will be stored
DATABASE_FILE = "scheduled_posts.json"

# Ensure the database file exists
if not os.path.exists(DATABASE_FILE):
    with open(DATABASE_FILE, "w") as f:
        json.dump([], f)

def load_data():
    """Load the data from the JSON file."""
    with open(DATABASE_FILE, "r") as f:
        return json.load(f)

def save_data(data):
    """Save the data to the JSON file."""
    with open(DATABASE_FILE, "w") as f:
        json.dump(data, f, indent=4)

def schedule_post_to_db(content, scheduled_time: datetime):
    """Schedule a post and store it in the database (JSON file)."""
    posts = load_data()
    post_id = str(uuid.uuid4())
    post = {
        "post_id": post_id,
        "content": content,
        "scheduled_time": scheduled_time.isoformat(),
        "posted": False  # Mark as not posted initially
    }
    posts.append(post)
    save_data(posts)
    return post_id

def get_scheduled_posts():
    """Get all scheduled posts that are due to be posted."""
    posts = load_data()
    current_time = datetime.utcnow()
    scheduled_posts = [
        post for post in posts if not post["posted"] and datetime.fromisoformat(post["scheduled_time"]) <= current_time
    ]
    return scheduled_posts

def mark_posted(post_id):
    """Mark a post as posted (update the database)."""
    posts = load_data()
    for post in posts:
        if post["post_id"] == post_id:
            post["posted"] = True
            save_data(posts)
            return post
    return None
