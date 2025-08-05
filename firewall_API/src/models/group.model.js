import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    group_name: { type: String, required: true, unique: true },    
    group_status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }],
}, { timestamps: true });

export const Group = mongoose.model('Group', groupSchema);