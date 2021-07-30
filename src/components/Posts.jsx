import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  loadPosts,
  selectPost,
  getUserPosts,
  getSelectedPost,
  updatePost,
} from "../store/posts";
import { getSelectedUser } from "../store/users";
function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector(getUserPosts);
  const history = useHistory();
  const selectedUser = useSelector(getSelectedUser);
  const handlePostSelect = async (postId) => {
    dispatch(selectPost(postId));
    history.push("/post");
    // dispatch(updatePost("sadeghsdxdzffffff", "tavakolisdfffed"));
  };

  useEffect(() => {
    dispatch(loadPosts());
  }, []);
  return (
    <main className="container posts-container">
      {selectedUser.name && (
        <span className="posts-sender">{selectedUser.name + " posts"}</span>
      )}
      <ul className="postsList">
        {posts.map((post) => (
          <li key={post.id}>
            <button onClick={() => handlePostSelect(post.id)}>
              {post.title}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Posts;
