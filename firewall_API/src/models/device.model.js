import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
    hostname: { type: String, required: true },                
    os: { type: String, required: true },                      
    agentVersion: { type: String, default: "1.0.0" },          
    ipAddress: { type: String },                              
    macAddress: { type: String },                              
    status: {
        type: String,
        enum: ['online', 'offline', 'pending', 'blocked'],
        default: 'pending'
    },                                                        
 
}, { timestamps: true });

export const Device = mongoose.model('Device', deviceSchema);
