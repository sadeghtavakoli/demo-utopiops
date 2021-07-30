import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUsers,
  setSelectedUser,
  getUsers,
  getSelectedUser,
} from "../store/users";

function Users(props) {
  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  const selectedUser = useSelector(getSelectedUser);
  const handleUserSelect = (userId) => {
    dispatch(setSelectedUser(userId));
  };

  useEffect(() => {
    dispatch(loadUsers());
  }, []);
  return (
    <div className="container users-container">
      <ul className="users-list">
        {users.map((user) => (
          <li key={user.id}>
            <button
              className="user-btn"
              onClick={() => handleUserSelect(user.id)}
            >
              {user.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
