import express from 'express';
import Company from '../models/Company.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js';
const router = express.Router();

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
router.post('/', [protect, adminOnly], async (req, res) => { // Defines a POST route
    try {
        const { name, industry, location, website } = req.body; // Destructure data from the request body
        const newCompany = new Company({ name, industry, location, website });  // Create a new company instance
        await newCompany.save();  // Save it to MongoDB
        res.status(201).json(newCompany);  // Respond with 201 Created + the new company data
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//PATCH update company
router.patch('/:id', [protect, adminOnly], async (req, res) => { // Defines a PATCH route, :id is a dynamic parameter, capturing the company’s unique ID from the URL
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true }) // Find company by ID and update it with provided data, returning the updated version
        res.json(company) // Sends back the updated company as JSON.
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

})

//DELETE comapny
router.delete('/:id', [protect, adminOnly], async (req, res) => { // Defining a DELETE route
    try {
        await Company.findByIdAndDelete(req.params.id); // Find company by ID and delete it
        res.json({ message: "Company Deleted" }); // Send confirmation message
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

})

export default router;