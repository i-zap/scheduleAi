'use client';

import { useState } from "react";
import { generateAndSchedulePost } from "../../utils/scheduleApi";

export default function Scheduler() {
  const [postData, setPostData] = useState({
    title: "",
    scheduleTime: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const requestData = {
        content: postData.title,
        scheduled_time: postData.scheduleTime,
        prompt: postData.title,
      };

      const response = await generateAndSchedulePost(requestData);

      if (response && response.post_id) {
        setPostData({
          title: "",
          scheduleTime: "",
        });
      } else {
        setError("Failed to schedule the post. Please try again.");
      }
    } catch (error) {
      console.error("Error scheduling post:", error);
      setError("Error scheduling post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="schedule-post">
      <div className="container">
        <div className="schedule-header animate__animated animate__fadeIn">
          <h1>
            Schedule Your <span className="gradient-text">Post</span>
          </h1>
          <p>Let our AI help you create engaging content for your audience</p>
        </div>

        <form onSubmit={handleSubmit} className="schedule-form animate__animated animate__fadeInUp">
          <div className="form-group">
            <label htmlFor="title">
              WRITE YOUR PROMPT
              <span
                className="tooltip"
                data-tooltip="Describe what you want to post about. Our AI will generate content based on this prompt."
              >
                <i className="fas fa-question-circle"></i>
              </span>
            </label>
            <textarea
              id="title"
              name="title"
              placeholder="E.g., 'Write an engaging post about our new product launch with a call to action'"
              value={postData.title}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="platforms">
            <h3>Select Platforms</h3>
            <div className="platform-options">
              <label className="platform-option">
                <input type="checkbox" defaultChecked />
                <span className="platform-icon">
                  <i className="fab fa-twitter"></i>
                </span>
                <span>Twitter</span>
              </label>
              <label className="platform-option">
                <input type="checkbox" />
                <span className="platform-icon">
                  <i className="fab fa-facebook"></i>
                </span>
                <span>Facebook</span>
              </label>
              <label className="platform-option">
                <input type="checkbox" />
                <span className="platform-icon">
                  <i className="fab fa-instagram"></i>
                </span>
                <span>Instagram</span>
              </label>
              <label className="platform-option">
                <input type="checkbox" />
                <span className="platform-icon">
                  <i className="fab fa-linkedin"></i>
                </span>
                <span>LinkedIn</span>
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="scheduleDate">
                DATE
                <span
                  className="tooltip"
                  data-tooltip="Select when you want your post to be published."
                >
                  <i className="fas fa-question-circle"></i>
                </span>
              </label>
              <input
                type="date"
                id="scheduleDate"
                name="scheduleDate"
                value={postData.scheduleTime.split("T")[0]}
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    scheduleTime: `${e.target.value}T${postData.scheduleTime.split("T")[1] || "00:00"}`,
                  })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="scheduleTime">
                TIME
                <span
                  className="tooltip"
                  data-tooltip="Select the time you want your post to be published."
                >
                  <i className="fas fa-question-circle"></i>
                </span>
              </label>
              <input
                type="time"
                id="scheduleTime"
                name="scheduleTime"
                value={postData.scheduleTime.split("T")[1] || ""}
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    scheduleTime: `${postData.scheduleTime.split("T")[0] || ""}T${e.target.value}`,
                  })
                }
                required
              />
            </div>
          </div>

          <div className="smart-timing">
            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider"></span>
              <span className="toggle-label">Use Smart Timing (recommended)</span>
            </label>
            <p className="helper-text">
              Our AI will adjust your posting time for maximum engagement based
              on your audience's activity.
            </p>
          </div>

          {error && <div className="text-red-500">{error}</div>}

          <div className="form-actions">
            <button type="button" className="btn-secondary">
              Preview
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
              id="scheduleBtn"
            >
              <span className="btn-text">
                {isLoading ? "Scheduling..." : "SCHEDULE POST"}
              </span>
              <span className="btn-icon">
                <i className="fas fa-paper-plane"></i>
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
