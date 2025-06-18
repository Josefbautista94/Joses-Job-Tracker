
# 🖥️ Job Tracker - Frontend

This is the frontend client for the Job Tracker MERN application. It provides a responsive user interface for job seekers to register, log in, and manage their job applications. The app includes role-based navigation and protected routes for user and admin views.

---

## 🚀 Features

- Responsive, mobile-friendly design
- User Authentication (Login/Register)
- Role-based conditional UI (admin vs user)
- Protected routes using React Router
- CRUD interface for job applications
- Admin views for managing users and companies
- React Context API for global auth state
- Token persistence via localStorage
- Mobile hamburger menu and styled NavBar

---

## 🧭 Navigation Overview

| Page          | Access Level    | Description                              |
|---------------|-----------------|------------------------------------------|
| `/`           | Public          | Homepage landing screen                   |
| `/login`      | Public          | User login form                           |
| `/register`   | Public          | User registration form with validation    |
| `/applications` | Authenticated | Job application dashboard (CRUD)         |
| `/companies`  | Authenticated   | Company list and management               |
| `/users`      | Admin only      | Manage user accounts                      |

---

## 🛠️ Tech Stack

- React
- React Router DOM
- Context API
- Vite
- CSS (modular & global)
- localStorage for token persistence

---

## 📁 Folder Structure

```
/components       --> Shared components like NavBar
/context          --> AuthContext (manages login state)
/pages
  /Home           --> Landing page
  /Login          --> Auth page
  /Register       --> Auth page with confirm password
  /Applications   --> CRUD for job applications
  /Companies      --> CRUD for companies
  /Users          --> Admin user management
main.jsx          --> Entry point with router + context
App.jsx           --> Route definitions and layout
```

---

## ⚙️ Setup Instructions

1. Clone the repository
2. Run `npm install` to install dependencies
3. Make sure your backend server is running at `http://localhost:5001`
4. Start the frontend with:

```bash
npm run dev
```

---

## 🧪 Development Notes

- NavBar updates dynamically based on login state
- Pages like `/applications` and `/users` are protected by checking `user` context
- The "Confirm Password" logic in `Register.jsx` prevents mismatched passwords
- Logout clears context + localStorage and redirects to `/`

---

## 🌐 Live Demo

https://joses-job-tracker.vercel.app/