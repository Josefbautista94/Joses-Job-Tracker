import express from "express"; // Importing express to handle routes, middleware and server setup
import mongoose from "mongoose" // Importing Mongoose which is going to help me connect to MongoDB and model my data (CRUD, Validation, ect.)
import dotenv from "dotenv"  // Imports dotenv, a package that loads enviorment variables from .env file
import userRoutes from './routes/userRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import cors from 'cors';

dotenv.config(); // Tells the app to read the .env file and make those variables available using process.env

const app = express(); // Creating an Exspress app instance(this is the of my server where i'' define routes and middleware)
const PORT = process.env.PORT || 5000; // Sets the port on where my server would run on, it first tries to use the PORT from my .env file, if that doesnt exist, it defaults to 5000.
app.use(cors()); // Allow cross-origin requests (helps with 403 in dev)
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});
app.use(express.json()); // Middleware tha allows my app to parse JSON bodies in request, like when you send data with a POST request, it lets me access req.body
console.log("Server is ready to handle requests");
console.log("Using PORT:", PORT);
app.use('/users', userRoutes);
app.use('/applications', applicationRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI) // Connecting to MongoDB using MONGO_URI from .env
  .then(() => console.log("Mongo Connected")) // Logs if connection is successful
  .catch((err) => console.log(err)); // Catches and logs any connection errors


//Placeholder route
app.get('/', (req, res) => {
  res.send("Job Application Tracker API"); //When someone visits http://localhost:5000/, it sends back this message
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`)) // Starts the server