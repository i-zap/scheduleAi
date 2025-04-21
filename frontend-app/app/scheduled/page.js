'use client';
import React, { useEffect, useState } from 'react';
import { getUpcomingPosts } from '../../utils/scheduleApi'; // Import the API function for upcoming posts only
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  // Import FontAwesomeIcon
import { faEdit, faTrash, faPlus, faBrain, faChartLine, faImage, faArrowRight, faClock } from '@fortawesome/free-solid-svg-icons';  // Import required icons
import '../global.css';  // Import global styles

const ScheduledPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const upcoming = await getUpcomingPosts(); // Fetch upcoming posts

                const allPosts = upcoming.map((post) => ({
                    ...post,
                    post_id: uuidv4(),
                    posted: post.posted || false, // Ensure 'posted' field exists
                    // For upcoming posts, set a scheduled time based on a future date
                    scheduled_time: post.scheduled_time || (post.posted === false ? new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString() : new Date().toISOString()), // Set tomorrow's date for scheduled posts
                }));

                setPosts(allPosts);
            } catch (err) {
                setError('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const renderPosts = (filter) => {
        const filteredPosts = posts.filter((post) => {
            if (filter === 'upcoming') return post.posted === false;
            return false;
        });

        if (filteredPosts.length === 0) {
            return <div className="no-posts">No posts to display.</div>;
        }

        // Reverse the order of posts before rendering
        return filteredPosts.reverse().map((post) => (
            <div className="post-card animate__animated animate__fadeInUp" key={post.post_id}>
                <div className="post-content">
                    <p>{post.content}</p>
                    <div className="post-time">
                        <FontAwesomeIcon icon={faClock} /> {post.scheduled_time ? new Date(post.scheduled_time).toLocaleString() : 'N/A'}
                    </div>
                </div>
                <div className="post-actions">
                    <button className="btn-icon" title="Edit"><FontAwesomeIcon icon={faEdit} /></button>
                    <button className="btn-icon" title="Delete"><FontAwesomeIcon icon={faTrash} /></button>
                </div>
            </div>
        ));
    }

    return (
        <section className="posts-management">
            <div className="container">
                <div className="posts-header animate__animated animate__fadeIn">
                    <h1>Manage Your <span className="gradient-text">Posts</span></h1>
                    <a href="/scheduler" className="btn-primary">
                        <FontAwesomeIcon icon={faPlus} /> New Post
                    </a>
                </div>

                {/* Removed tab functionality */}
                <div className="posts-container">
                    <div className="tab-content active" id="upcoming">
                        {renderPosts('upcoming')}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ScheduledPosts;
 