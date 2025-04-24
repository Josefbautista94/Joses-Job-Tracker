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

});

//POST new user
router.post('/', async (req, res) => { // Defining a POST route, when someone sends a POST request to /users, this function runs, async allows you to use await inside of the function for async tasks like saving to the DB
    try {
        const { name, email } = req.body; // Using destructuring to pull name and email from the body of the request
        const newUser = new User({ name, email }); // Creating a new instance of the User model using the provided name and email
        await newUser.save() // Saves the new user to mongoDB
        res.status(201).json(newUser);  //Successfully created
    }
    catch (err) {
        res.status(400).json({ message: err.message }); //If there’s an error (like missing fields, duplicate email, etc.), this code runs.
    }
});

//PATCH user
router.patch('/:id', async (req, res) => {    // Defining a PATCH route to update a user
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); //:id is a route parameter, it captures the user’s unique ID from the URL
        //User.findByIdAndUpdate(): This method finds a user by their ID and updates them with the new data.
        // req.params.id: The ID taken from the URL (e.g., /users/123 → 123).
        //req.body: The data sent in the request to update the user with (e.g., { name: "Updated Name" }).
        // { new: true }: This makes sure it returns the updated user. If you leave this out, it would return the old user before the update.

        res.json(user); //Sends back the updated user as JSON.

    }
    catch (err) {
        res.status(400).json({ message: err.message }); // If anything goes wrong (e.g., invalid ID, database issue), it catches the error.
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id); // Finds user by ID and deletes them from the DB
        res.json({ message: `User deleted` }); // Sends back a confirmation message
    }
    catch (err) {
        res.status(500).json({ message: err.message }); // Sends error if something goes wrong
    }
});

export default router;
