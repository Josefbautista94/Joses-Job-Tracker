# SBA319

# Job Application Tracker API

## Overview
A Node.js, Express, and MongoDB RESTful API to track job applications, companies, and users.

## Features
- Manage Users, Companies, Applications.
- Full CRUD functionality with validation.
- Seed script with mock data.
- MongoDB indexes for optimized querying.

## API Endpoints

### Users
- `GET /users` - Get all users
- `POST /users` - Create a user
- `PATCH /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

### Companies
- `GET /companies` - Get all companies
- `POST /companies` - Create a company
- `PATCH /companies/:id` - Update a company
- `DELETE /companies/:id` - Delete a company

### Applications
- `GET /applications` - Get all applications
- `POST /applications` - Create an application
- `PATCH /applications/:id` - Update an application
- `DELETE /applications/:id` - Delete an application

## Setup
1. Clone the repo
2. Run `npm install`
3. Create a `.env` file with your MongoDB URI:

```env
MONGO_URI=your_mongo_uri_here
PORT=5000

Run the server:

npm run dev

Seed the database:

node seed.js

Tech Stack
Node.js

Express

MongoDB

Mongoose
