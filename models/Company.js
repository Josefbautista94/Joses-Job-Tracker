import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({

    name: { type: String, required: true, unique: true },
    industry: { type: String },
    location: { type: String },
    website: { type: String },
});

const Company = mongoose.model('Comany', companySchema);

export default Company;