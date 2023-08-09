import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;
const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    member: [
        {
            userId: {
                type: ObjectId,
                ref: "Users"
            },
        }
    ],
    startDate: {
        type: String,
        default: new Date()
    },
    project_money: {
        type: Number,
        default: 1000000
    }
}, { timestamps: true, collection: 'projects' });


export default mongoose.model('projects', projectSchema);