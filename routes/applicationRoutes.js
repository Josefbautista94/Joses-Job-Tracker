import express from 'express';
import Application from '../models/Application.js'

//Get all applications
router.get('/', async (req, res) => { //Defining a GET route

    try {
        const applications = await Application.find().populate('userId', 'name email') // Application.find(): Fetches all application documents from the applications collection in MongoDB, .populate('userId', 'name email'): It replaces the userId (which is normally just an ObjectId like 607abc...) with the actual user document in this case it only includes the name and email fields from the user
        res.json(applications) //Sends the array of applications back to the client as JSON
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

})

// POST new application
router.post("/", async (req, res) => { // Defines a POST route

    try {
        const { companyName, positionTitle, status, notes, userId } = req.body; // Destructuring data from the request body
        const newApplication = new Application({ // Creates a new instance of the Application model, Prepares the data to be saved to MongoDB, Doesn't save it yet, just structures it.
            companyName,
            positionTitle,
            status,
            notes,
            userId
        });
        await newApplication.save() // This actually saves the new application to MongoDB, await waits until the save finishes
        res.status(201).json(newApplication); // Responds with: Status 201 = Created, The new application in JSON format.
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

export default router;