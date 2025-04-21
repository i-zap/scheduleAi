'use client';
const BASE_URL = "http://localhost:8000"; // Replace with prod URL when needed

// utils/scheduleApi.js

// 🟡 Get all scheduled posts (all posts)
export const getAllScheduledPosts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/scheduled_posts`);  // Corrected URL to fetch all posts
    if (!res.ok) {
      throw new Error('Failed to fetch all scheduled posts');
    }
    const posts = await res.json();
    return posts;
  } catch (error) {
    console.error('Error fetching scheduled posts:', error);
    throw error;
  }
};

// 🟡 Get upcoming posts (not published yet)
export const getUpcomingPosts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/posts/upcoming`);  // Adjust URL to get only upcoming posts
    if (!res.ok) {
      throw new Error('Failed to fetch upcoming posts');
    }
    const posts = await res.json();
    return posts;
  } catch (error) {
    console.error('Error fetching upcoming posts:', error);
    throw error;
  }
};

// 🟡 Get published posts (already posted)
export const getPublishedPosts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/posts/published`);  // Adjust URL to get only published posts
    if (!res.ok) {
      throw new Error('Failed to fetch published posts');
    }
    const posts = await res.json();
    return posts;
  } catch (error) {
    console.error('Error fetching published posts:', error);
    throw error;
  }
};

// 🟡 Schedule a new post
export const generateAndSchedulePost = async (payload) => {
  try {
    const response = await fetch(`${BASE_URL}/generate-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to schedule post");
    }

    return response.json();
  } catch (error) {
    console.error("Error scheduling post:", error);
    throw error;
  }
};
