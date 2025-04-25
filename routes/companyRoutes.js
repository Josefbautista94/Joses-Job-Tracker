import express from 'express';
import Company from '../models/Company.js'

const router = express.router();

//GET all companies 
router.get('/', async(req,res)=>{ // Defines the GET route, when someone sends a GET request to /companies, this function runs.
    try{
        const companies = await Company.find() // Company.find(): Queries the companies collection in MongoDB, await waits for the database to respond before moving to the next line.
        res.json(companies); //Sends the list of companies back to the client as JSON
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})

//POST new company
router.post('/', async (req,res)=>{

})

//PATCH update company
router.patch('/', async (req,res)=>{

})

//DELETE comapny
router.delete('/', async (req,res)=>{

})

export default router;