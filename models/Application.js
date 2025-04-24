import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    companyName: { type: String, required: true, index: true },
    positionTitle: { type: String, required: true },
    status: {
        type: String,
        enum: [`Applied`, `Interviewing`, `Offer`, `Rejected`],
        default: `Applied`
    },
    dateApplied: { type: DataTransfer, default: Date.now },
    notes: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: `user`, required: true }

});

const Application = mongoose.model('Application')

export default Application;fffffff