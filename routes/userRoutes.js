import express from "express"
import User from '../models/User.js'

const router = express.Router(); // Create a mini Express app to handle routes for this feature

//GET all users 
router.get('/', async (req, res) => { // Defines a GET route for /users, async means you can use await inside this function to handle asynchronous tasks (like database calls).

    try {
        const users = await User.find(); // This fetches all users from the users collection in MongoDB, since it’s asynchronous, you use await to wait for it to complete.
        res.json(users); //Sends the array of users back as a JSON response.


    }
    catch (err) {
        res.status(500).json({ message: err.message }); // If there’s any error during the process it sends back a 500 Internal Server Error with a message
    }

})