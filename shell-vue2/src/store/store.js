import Vue from "vue";
import { defaultUsers } from "./users.constants.js";

const LOCAL_STORAGE_KEY = "shell-users";

// Load users from localStorage or fallback to defaultUsers
function loadUsers() {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultUsers;
  } catch {
    return defaultUsers;
  }
}

function persistUsers(users) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
}

const state = Vue.observable({
  users: loadUsers(),
});

const store = {
  state,

  setUsers(users) {
    state.users = [...users];
    persistUsers(state.users);
  },

  addUser(user) {
    state.users.push(user);
    persistUsers(state.users);
  },

  updateUser(updatedUser) {
    const index = state.users.findIndex((user) => user.id === updatedUser.id);

    if (index !== -1) {
      Vue.set(state.users, index, updatedUser);
      persistUsers(state.users);
    }
  },

  deleteUser(userId) {
    const filtered = state.users.filter((user) => user.id !== userId);
    this.setUsers(filtered);
  },
};

export default store;
