import express from 'express';
import Company from '../models/Company.js'

const router = express.router();

//GET all companies 
router.get('/', async (req, res) => { // Defines the GET route, when someone sends a GET request to /companies, this function runs.
    try {
        const companies = await Company.find() // Company.find(): Queries the companies collection in MongoDB, await waits for the database to respond before moving to the next line.
        res.json(companies); //Sends the list of companies back to the client as JSON
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//POST new company
router.post('/', async (req, res) => {
    try {
        const { name, industry, location, website } = req.body; // Destructure data from the request body
        const newCompany = new Company(name, industry, location, website) // Create a new company instance
        await newCompany.save();  // Save it to MongoDB
        res.status.json(newCompany) // Respond with 201 Created + the new company data
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//PATCH update company
router.patch('/:id', async (req, res) => {
    try {

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

})

//DELETE comapny
router.delete('/id', async (req, res) => {
    try {

    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

})

export default router;