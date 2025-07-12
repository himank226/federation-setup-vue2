// Shell App Store using Vue.observable for reactivity in Vue 2
import Vue from "vue";

const LOCAL_STORAGE_KEY = "shell-users";

const storedUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

const defaultUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@example.com",
  },
];

const state = Vue.observable({
  users: storedUsers || defaultUsers,
});

function saveUsers(users) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
}

const store = {
  state,

  setUsers(newUsers) {
    state.users = newUsers;
    saveUsers(newUsers);
  },

  addUser(user) {
    state.users.push(user);
    saveUsers(state.users);
  },

  updateUser(updatedUser) {
    const index = state.users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      Vue.set(state.users, index, updatedUser);
      saveUsers(state.users);
    }
  },

  deleteUser(userId) {
    state.users = state.users.filter((user) => user.id !== userId);
    saveUsers(state.users);
  },
};

export default store;
