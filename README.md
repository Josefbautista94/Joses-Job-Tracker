# SBA319 - Job Application Tracker

## Overview
A Full Stack application built with **Node.js**, **Express**, **MongoDB**, and **React** (MERN-inspired but not fully MERN yet). This project started as a way to test and practice full-stack CRUD operations, dynamic data handling, and RESTful API integration.

---

## Features
- Manage **Users**, **Companies**, and **Applications**.
- Full **CRUD** functionality for all entities.
- Dynamic **User Selection** when creating applications.
- **Website** support for applications and companies.
- Clean, **dark-themed** responsive frontend.
- MongoDB indexing for optimized data retrieval.
- **Seed script** with mock data for fast setup.

---

## Notes
- This project wasn't initially intended to be fully MERN — it was a **test run** to get hands-on with full-stack CRUD concepts.
- Frontend and backend integration was built to **experiment** with real-time data updates, form handling, and API structures.
- The plan is to **continue evolving** this into a more complete MERN application.

---

## Future Plans 🚀
- Implement **Authentication/Login** system (JWT or Sessions).
- Add **User Registration** and **role-based access**.
- Build a **Dashboard** with analytics or summaries.
- Add **search, filtering**, and **pagination** to lists.
- Deploy backend to **Render/Heroku**, frontend to **Netlify/Vercel**.

---

## API Endpoints

### Users
- `GET /users` - Fetch all users
- `POST /users` - Create a new user
- `PATCH /users/:id` - Update an existing user
- `DELETE /users/:id` - Delete a user

### Companies
- `GET /companies` - Fetch all companies
- `POST /companies` - Create a new company
- `PATCH /companies/:id` - Update a company
- `DELETE /companies/:id` - Delete a company

### Applications
- `GET /applications` - Fetch all job applications
- `POST /applications` - Create a new application
- `PATCH /applications/:id` - Update an application
- `DELETE /applications/:id` - Delete an application

---

## Setup Instructions

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
Install dependencies:

npm install

Create a .env file:

MONGO_URI=your_mongo_uri_here
PORT=5001

Start the backend server:

npm run dev

Frontend Setup
Navigate to the frontend folder:

cd frontend

Install frontend dependencies:

npm install

Start the frontend:

npm run dev

Seed the Database
To populate the database with mock data:

node seed.js


Tech Stack
Node.js

Express

MongoDB with Mongoose

React with Vite

CSS for styling (Dark Theme)

Status
✅ CRUD complete for users, companies, and applications.
🔜 Authentication & deployment coming soon!