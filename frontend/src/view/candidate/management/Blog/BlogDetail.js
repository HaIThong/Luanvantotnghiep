import React from "react";
import "./BlogDetail.css"; // Import file CSS riêng cho BlogDetail

export default function BlogDetail({ post, onBack }) {
  return (
    <div className="blog-detail-container">
      <button className="btn btn-back" onClick={onBack}>
        ← Quay Lại
      </button>
      <div className="blog-detail-card shadow-lg">
        <h2 className="blog-title">{post.title}</h2>
        <img
          src={post.image_url}
          alt={post.title}
          className="blog-detail-image my-3 rounded"
        />
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
