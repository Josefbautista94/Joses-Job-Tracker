import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Company from './models/Company.js';
import Application from './models/Application.js';

dotenv.config(); // Loads environment variables from the .env file into process.env

//This tells Mongoose to connect to the MongoDB database.
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected for seeding'); // If the connection to MongoDB is successful, this block runs.
        return seedData(); // This function handles: Clearing old data, inserting sample users, companies, applications.
    })
    .catch((err) => { // If any error occurs while connecting (e.g., bad URI, network issues), this block runs.
        console.error('Connection error:', err.message);
        process.exit(1);
    });

async function seedData() {
    try {
        // Clear old data
        await User.deleteMany(); // This clears out all documents from the users collection in MongoDB, await makes the function pause until MongoDB finishes deleting.
        await Company.deleteMany(); // Same idea, clears all data from the companies collection.
        await Application.deleteMany(); // Deletes everything from the applications collection.

        // Seed Users
        const users = await User.insertMany([
            { name: "Jose Bautista", email: "jose@example.com" },
            { name: "Ana Martinez", email: "ana@example.com" },
            { name: "Carlos Diaz", email: "carlos@example.com" }
        ]);

        // Seed Companies
        const companies = await Company.insertMany([
            { name: "Google", industry: "Tech", location: "Mountain View", website: "https://google.com" },
            { name: "Amazon", industry: "E-commerce", location: "Seattle", website: "https://amazon.com" },
            { name: "Netflix", industry: "Entertainment", location: "Los Gatos", website: "https://netflix.com" }
        ]);

        // Seed Applications with real user IDs
        await Application.insertMany([
            {
                companyName: "Google",
                positionTitle: "Frontend Developer",
                status: "Applied",
                notes: "Need to follow up",
                userId: users[0]._id
            },
            {
                companyName: "Amazon",
                positionTitle: "Backend Engineer",
                status: "Interviewing",
                notes: "Had phone interview",
                userId: users[1]._id
            }
        ]);

        console.log('Users, Companies, and Applications seeded successfully');
        process.exit();
    } catch (err) {
        console.error('Seeding error:', err.message);
        process.exit(1);
    }
}
