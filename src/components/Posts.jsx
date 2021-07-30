import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadPosts,
  selectPost,
  getUserPosts,
  getSelectedPost,
  updatePost,
} from "../store/posts";

function Posts(props) {
  const dispatch = useDispatch();
  const posts = useSelector(getUserPosts);
  const selectedPost = useSelector(getSelectedPost);
  const handlePostSelect = async (postId) => {
    dispatch(selectPost(postId));
    dispatch(updatePost("sadeghsdxdzffffff", "tavakolisdfffed"));
  };

  useEffect(() => {
    dispatch(loadPosts());
  }, []);
  return (
    <div className="container posts-container">
      <ul className="postsList">
        {posts.map((post) => (
          <li key={post.id}>
            <button onClick={() => handlePostSelect(post.id)}>
              {post.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
