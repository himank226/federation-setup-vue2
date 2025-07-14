# 🏗️ Modular Frontend Platform — Vue 2 Host + Vue 3 Remote Apps (All Apps Use Webpack Module Federation)

## 💡 Overview

This project demonstrates a **modular micro-frontend architecture**, where a **legacy Vue 2 shell app** dynamically loads **Vue 3 remote apps** using **Webpack Module Federation** across all apps.

---

## 🚩 Problem Statement

- A **Vue 2 shell app** manages **global store**, **i18n**, and **API actions**.
- **Vue 3 remote apps** are dynamically loaded:
  - Consume the parent’s store reactively
  - Use parent’s i18n instance
  - Emit events to request updates
- Shell app handles all store updates.

---

## 🗺️ Architecture (All Apps with Webpack Module Federation)

### Shell App: `shell-vue2`

- Vue 2 app acting as host shell.
- Provides:
  - **Reactive global store** (`Vue.observable`)
  - **i18n instance** (vue-i18n)
  - API actions and routing.
- Loads remotes via routes:
  - `/users`: User List App
  - `/edit-user?id=123`: Edit User App

---

### Remote App 1: `users-app-vue3`

- Vue 3 app
- Displays user table from shell store
- Reacts to updates automatically
- Uses shell i18n for translations

---

### Remote App 2: `edit-user-app-vue3`

- Vue 3 app
- Displays editable user form
- Emits update events to parent on submit
- Parent handles updates using `store.updateUsers()` and simulates API (localStorage)

---

## ⚙️ Module Federation Setup (Used in Shell and All Remote Apps)

### What is Module Federation?

All apps use **Webpack Module Federation** to enable:

- Dynamic runtime loading of remote apps
- Independent builds and deployments
- Shared dependencies at runtime

---

### Where it is used

- ✅ **Shell App (Vue 2)**: Configured as host, loads remotes on demand.
- ✅ **Users App (Vue 3)**: Configured as remote, exposes mount point.
- ✅ **Edit User App (Vue 3)**: Configured as remote, exposes mount point.

---

### Benefits

- 🎯 Independent deployments
- 🚀 On-demand code splitting
- ⚡ Shared runtime libraries
- 🔒 Strong decoupling

---

## 🧩 Shared Services Provided by Shell App

### 💬 Translations (i18n)

- Centralized in shell app
- Remotes **inject i18n** and use `i18n.t(...)`
- Supports adding new languages easily

---

### 🗺️ Router

- Fully owned by shell app
- Controls which remote app is loaded and when
- Supports lazy loading for performance

---

### 🗃️ Global Store

- Central reactive store using `Vue.observable`
- Holds user list and selected user
- Parent handles all mutations via `store.updateUsers()` after receiving events from remotes
- Future-ready for migration to Vuex or Pinia

---

### 🔄 Update Flow

1️⃣ Remote apps display data reactively from store.
2️⃣ Remote apps emit update events to parent.
3️⃣ Parent calls `store.updateUsers()` to update state and simulate API (localStorage).
4️⃣ Changes automatically update all connected views.

---

## 💾 Data Simulation & Persistence

### Static Data

- Uses mock user data initialized in shell app.

---

### Local Storage Persistence

- Saves data to localStorage after each update.
- Reloads persisted data on refresh.

---

### Benefits

- ✅ Simulates real API workflows
- ✅ Consistent state persistence
- ✅ No backend dependency

---

## 🗂️ Dynamic Remote App Loading via `remoteConfig.js`

### Centralized Config Example

```js
{
  path: "/users",
  scope: "user_app_vue3",
  route_name: "users",
  app_name: "user_app_vue3",
  devUrl: "http://localhost:8081/remoteEntry.js",
  prodUrl: "https://users-app-vue3.vercel.app/remoteEntry.js",
  loader: () => import("user_app_vue3/mount"),
}

Benefits
✅ Add new remote apps by only updating remoteConfig.js

✅ No need to touch router or federation config

✅ Scalable and maintainable
```

```
1️⃣ Clone the repository
git clone https://github.com/himank226/federation-setup-vue2.git
cd federation-setup-vue2

2️⃣ Install and run Shell App
cd ../users-app-vue3
npm install
npm run serve
Runs at: http://localhost:8081

3️⃣ Install and run User List App
cd ../edit-user-app-vue3
npm install
npm run serve
Runs at: http://localhost:8082

4️⃣ Install and run Edit User App

cd shell-vue2
npm install
npm run serve
Runs at: http://localhost:8080

5️⃣ Visit the shell app
Open http://localhost:8080 in your browser.

Go to /users to view the user list

Go to /edit-user?id=1 to edit user details
```

📸 Screenshots
![User List Page](./screenshots/screenshot-user-list.png)

![Edit User Page](./screenshots/screenshot-edit.png)

💻 Demonstration

🔗 Live App: https://shell-vue2.vercel.app/

🎥 Walkthrough Video: [link](https://www.loom.com/share/395249f7637e44a2bd2b79e94bbaf2c1?sid=1c417146-00c3-4904-b8dc-3b2e7d129736)

💻 Source Code: [GitHub Repository](https://github.com/himank226/federation-setup-vue2)
