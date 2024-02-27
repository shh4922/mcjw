import React, { useEffect, useState } from "react";
import { crewPost } from "../../interface/crewPost";
import "./postcard.css"
import { Link } from "react-router-dom";
type postProps = {
    post: crewPost
}

function PostCard( {post} : postProps) {
    return (
        <Link to={`/detail/${post.id}`} state={post}>
            <li className="card">
                <div className="card-content">
                    <span className="post-title">{post.title}</span>
                    <span className="post-content">{post.content}</span>
                    <span className="post-date">{post.date}</span>
                </div>
            </li>
        </Link>

    )
}

export default PostCard