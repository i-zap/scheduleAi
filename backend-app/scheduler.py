from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from database import get_scheduled_posts, mark_posted

def publish_scheduled_posts():
    """Check for posts that need to be published and mark them as posted."""
    scheduled_posts = get_scheduled_posts()
    for post in scheduled_posts:
        # Simulate posting logic here (e.g., print the post content)
        print(f"Posting: {post['content']}")
        # Mark as posted
        mark_posted(post['post_id'])

def start_scheduler():
    """Start the scheduler to run the publish_scheduled_posts function periodically."""
    scheduler = BackgroundScheduler()
    scheduler.add_job(publish_scheduled_posts, 'interval', minutes=1)  # Check every minute
    scheduler.start()
