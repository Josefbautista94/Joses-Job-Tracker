import express from 'express';
import Application from '../models/Application.js'

//Get all applications
router.get('/', async(req,res)=>{ //Defining a GET route

    try{
        const applications = await Application.find().populate('userId', 'name email') // Application.find(): Fetches all application documents from the applications collection in MongoDB, .populate('userId', 'name email'): It replaces the userId (which is normally just an ObjectId like 607abc...) with the actual user document in this case it only includes the name and email fields from the user
        res.json(applications) //Sends the array of applications back to the client as JSON
    }
    catch(err){
        res.status(400).json({message: err.message})
    }

})

export default router;