import mongoose from 'mongoose';

const deviceHistorySchema = new mongoose.Schema({
    field : { type: String, required: true },
    oldValue: { type: mongoose.Schema.Types.Mixed },
    newValue: { type: mongoose.Schema.Types.Mixed },
    
    device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
})

export const DeviceHistory = mongoose.model('DeviceHistory', deviceHistorySchema);