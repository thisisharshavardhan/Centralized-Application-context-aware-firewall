import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
    device_nickname: { type: String, required: true, unique: true },
    device_type: { type: String, required: true },
    hostname: { type: String, required: true },
    os: { type: String, required: true },
    agentVersion: { type: String, required:true },
    ipAddress: { type: String },
    system_uuid: { type: String, unique: true },
    macAddress: { type: String },
    status: {
        type: String,
        enum: ['online', 'offline', 'pending', 'blocked'],
        default: 'pending'
    },

}, { timestamps: true });

export const Device = mongoose.model('Device', deviceSchema);
