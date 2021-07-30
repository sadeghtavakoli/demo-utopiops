import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "users",
  initialState: {
    list: [],
    selectedUser: {},
  },
  reducers: {
    // action => action handler
    usersReceived: (users, action) => {
      users.list = action.payload;
    },
    selectedUserChanged: (users, action) => {
      const filteredUsers = users.list.filter(
        (user) => user.id === action.payload
      );
      const selectedUser = filteredUsers[0];

      users.selectedUser = selectedUser;
    },
  },
});

export const { usersReceived, usersRequested, usersRequestFailed } =
  slice.actions;

export default slice.reducer;

// Action Creators
const url = "/users";

export const loadUsers = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url,
      onSuccess: usersReceived.type,
    })
  );
};

export const setSelectedUser = (userId) => (dispatch, getState) => {
  return dispatch({ type: "users/selectedUserChanged", payload: userId });
};

// Selector

export const getUsers = (state) => state.entities.users.list;
export const getSelectedUser = (state) => state.entities.users.selectedUser;
