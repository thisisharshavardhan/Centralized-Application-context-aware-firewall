import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
    device_name: {
        type: String,
        required: true,

    },
    Configuration: {
        CPU: {
            type: String,
            // required: true,
        },
        RAM: {
            type: String,
            // required: true,
        },
        Network: {
            type: String,
            // required: true,
        },

    },
    ip: {
        type: String,
        required: true,
        // unique: true,
    },
    os: {
        type: String,
        required: true,
    },
    os_version: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'online',
    },
    hostname: {
        type: String,
        required: true,
    },
},{timestamps: true});

export const Device = mongoose.model('Device', deviceSchema);
