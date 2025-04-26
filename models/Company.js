import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({

    name: { type: String, required: true, unique: true, index: true }, 
    industry: { type: String },
    location: { type: String },
    website: { type: String },
});

const Company = mongoose.model('Company', companySchema);

export default Company;