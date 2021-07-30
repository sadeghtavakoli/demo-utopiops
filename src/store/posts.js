import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "posts",
  initialState: {
    list: [],
    selectedPost: {},
  },
  reducers: {
    // action => action handler
    postsReceived: (posts, action) => {
      posts.list = action.payload;
    },
    postUpdated: (posts, action) => {
      const updatedPost = action.payload;
      console.log("post updated", action.payload);
      const postId = updatedPost.id;

      const newPosts = posts.list.map((post) => {
        if (post.id !== postId) return post;

        return updatedPost;
      });
      posts.list = newPosts;
    },

    selectedPostChanged: (posts, action) => {
      const filteredPosts = posts.list.filter(
        (post) => post.id === action.payload
      );
      const selectedPost = filteredPosts[0];

      posts.selectedPost = selectedPost;
    },
  },
});

export const { postsReceived, selectedPostChanged, postUpdated } =
  slice.actions;

export default slice.reducer;

// Action Creators
const url = "/posts";

export const loadPosts = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url,
      onSuccess: postsReceived.type,
    })
  );
};
export const selectPost = (postId) => (dispatch, getState) => {
  console.log(postId);
  return dispatch({ type: "posts/selectedPostChanged", payload: postId });
};

export const updatePost = (title, body) => (dispatch, getState) => {
  const id = getState().entities.posts.selectedPost.id;
  const userId = getState().entities.users.selectedUser.id;
  const data = {
    userId,
    id,
    title,
    body,
  };
  return dispatch(
    apiCallBegan({
      url: url + "/" + id,
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      data,
      onSuccess: postUpdated.type,
    })
  );
};
// Selector

export const getUserPosts = (state) => {
  const posts = state.entities.posts.list;
  const userId = state.entities.users.selectedUser.id;
  const userPosts = posts.filter((post) => post.userId === userId);

  return userPosts;
};

export const getSelectedPost = (state) => state.entities.posts.selectedPost;
