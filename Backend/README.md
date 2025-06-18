
# 📡 Job Tracker API - Backend

This is the backend server for the Job Tracker MERN application. It provides a secure RESTful API with user authentication, role-based access, and CRUD operations for managing job applications, companies, and users.

---

## 🚀 Features

- JWT-based Authentication (Login/Register)
- Role-based access control (admin vs regular user)
- CRUD for Applications
- CRUD for Companies (admin only)
- Admin CRUD for Users
- MongoDB database with Mongoose models
- Seed script for users, companies, and applications
- Protected and admin-only routes using custom middleware
- Fully integrated with frontend (React)

---

## 🛣️ API Routes

### Auth
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Log in and receive JWT token

### Applications
- `GET /applications` - View logged-in user's applications
- `POST /applications` - Create a new application
- `PATCH /applications/:id` - Update an application
- `DELETE /applications/:id` - Delete an application

### Companies
- `GET /companies` - View all companies
- `POST /companies` - Add a company (admin only)
- `PATCH /companies/:id` - Edit a company (admin only)
- `DELETE /companies/:id` - Remove a company (admin only)

### Users (admin only)
- `GET /users` - View all users
- `POST /users` - Add a user
- `PATCH /users/:id` - Edit a user
- `DELETE /users/:id` - Remove a user

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- dotenv for environment variables
- cors for local development

---

## ⚙️ Setup Instructions

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file with the following variables:
   - `MONGO_URI=your_mongo_connection_string`
   - `JWT_SECRET=your_jwt_secret_key`
4. Run the server with `npm run dev` or `node server.js`
5. Seed the database with sample data using `node seed.js`

---

## 📁 Folder Structure

```
/models         --> Mongoose schemas (User, Company, Application)
 /routes        --> Express route handlers (authRoutes, userRoutes, etc.)
 /middleware    --> Authentication and admin protection middleware
 server.js      --> Main server entry point
 seed.js        --> Database seeding script
```

---

## 📌 Notes

- Ensure your MongoDB URI and JWT secret are securely stored in your `.env` file.
- Use tools like Postman to test endpoints during development.
- This backend pairs with a React frontend for full-stack job application tracking.
