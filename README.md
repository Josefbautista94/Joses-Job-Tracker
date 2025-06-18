
# 📂 Job Tracker - Full Stack Application

A complete full-stack application built with **Node.js**, **Express**, **MongoDB**, and **React** (MERN). This project enables users to manage job applications, companies, and users with full authentication, role-based access, and real-time CRUD operations.

---

## 🧠 Overview

This repo contains both the frontend and backend code for the Job Tracker app. It was initially a learning exercise in full-stack development, now evolved into a robust MERN application with full CRUD capabilities and secure authentication.

---

## 🛠️ Tech Stack

- **Frontend:** React (with Vite), React Router, Context API, CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT, Role-based access
- **Environment:** Vite (frontend), dotenv (backend)
- **Deployment:** Vercel (frontend), Render/Heroku (backend) *(planned)*

---

## 🚀 Features

- Register/Login system with JWT authentication
- Role-based access: Admin vs Regular Users
- Full CRUD for:
  - Users (admin only)
  - Companies
  - Job Applications
- Dynamic user linking in applications
- Website link support in forms
- Responsive, mobile-friendly dark theme
- Context-based global login state
- Seed script with mock data for rapid setup

---

## 📁 Folder Structure

```
/frontend     --> React client (Login, Register, CRUD UI)
/backend      --> Express API (auth, apps, users, companies)
/README.md    --> This file
```

Each subdirectory includes its own README for details and setup.

---

## ⚙️ Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=5001
```

Run the backend:

```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. Seed the Database

```bash
cd backend
node seed.js
```

---

## 📌 Notes

- Initially started as a CRUD experiment, now a full MERN-style project
- Shows integration of full-stack technologies with real-world features
- Authentication and protected routing fully implemented
- Fully expandable into dashboards, analytics, filters, and more

---

## 📈 Future Enhancements

- Add search, filtering, and pagination to lists
- Dashboard views with stats/analytics
- Notifications or toast feedback
- Deployment and hosting (Render + Vercel)

---

## ✅ Current Status

- ✔️ CRUD complete for Users, Companies, Applications
- ✔️ Authentication implemented with login/register and role control
- 🔜 Deployment and advanced UI features next

---

## 🔗 Live Demo

https://joses-job-tracker.vercel.app/
