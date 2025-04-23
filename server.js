import express from "express"; // Importing express to handle routes, middleware and server setup
import mongoose from "mongoose" // Importing Mongoose which is going to help me connect to MongoDB and model my data (CRUD, Validation, ect.)
import dotenv from "dotenv"  // Imports dotenv, a package that loads enviorment variables from .env file

dotenv.config(); // Tells the app to read the .env file and make those variables available using process.env

const app = express(); // Creating an Exspress app instance(this is the of my server where i'' define routes and middleware)

app.use(express.json()); // Middleware tha allows my app to parse JSON bodies in request, like when you send data with a POST request, it lets me access req.body

const PORT = process.env.PORT || 5050; // Sets the port on where my server would run on, it first tries to use the PORT from my .env file, if that doesnt exist, it defaults to 5000.

//MongoDB connection
mongoose.connect(process.env.MONGO_URI, { // Connecting to my MongoDB database usin the MONGO_URI from the .env file

    useNewUrlParser: true, // Uses the new MongoDB URL string parser
    useUnifiedTopology: true // Opts into the MongoDB driver's new connection engine.

})
    .then(() => console.log("Mongo Connected")) // This logs if connection is successful
    .catch((err) => console.log(err)); // This catches any errors during connection and logs them.


//Placeholder route
app.get('/', (req, res) => {
  res.send("Job Application Tracker API"); //When someone visits http://localhost:5000/, it sends back this message
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`)) // Starts the server