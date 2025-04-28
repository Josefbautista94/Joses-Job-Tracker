import express from 'express';
import Application from '../models/Application.js'
const router = express.Router(); 

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
router.post('/', async (req, res) => { // Defines a POST route

    try {
        const { companyName, positionTitle, status, notes, website, userId } = req.body;// Destructuring data from the request body
        const newApplication = new Application({// Creates a new instance of the Application model, Prepares the data to be saved to MongoDB, Doesn't save it yet, just structures it.
            companyName,
            positionTitle,
            status,
            notes,
            website,  // I FORGOT ABOUT THIS OMG MAN
            userId
        });
        await newApplication.save() // This actually saves the new application to MongoDB, await waits until the save finishes
        res.status(201).json(newApplication); // Responds with: Status 201 = Created, The new application in JSON format.
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})
//PATCH update application status
router.patch('/:id', async (req, res) => { // Defines a PATCH route
    try {
        const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true }); //Application.findByIdAndUpdate(): Finds an application by its ID, Updates it with the data in req.body. req.params.id: The ID from the URL (e.g., /applications/12345 --> 12345). req.body: The data to update.
        //{ new: true }: Tells Mongoose to return the updated application (not the old one). Without this, you’d get the application before the update.
        res.json(application) //Sends back the updated application as JSON.
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})

//DELETE application
router.delete('/:id', async (req, res) => { // Defines a DELETE route 
    try {
        await Application.findByIdAndDelete(req.params.id); // Looks up the application by ID and deletes it from MongoDB, If the ID doesn't exist or is invalid, it will throw an error, req.params.id = the ID from the URL.
        res.json({ message: `Application Deleted` }) // Sends back a simple confirmation message after deletion.

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }


})

export default router;