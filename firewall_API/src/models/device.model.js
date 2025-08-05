import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
    device_name: { type: String, required: true, unique: true },
    device_type: { type: String, required: true, enum: ['phone', 'laptop', 'desktop', 'server'] },
    device_os: { type: String, required: true },
    device_ip: { type: String, required: true, unique: true },
    device_location: { type: String, },
    device_mac: { type: String, required: true, unique: true },
    device_status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline'
    },

    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    rules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rule' }],
    deviceHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DeviceHistory' }],
}, { timestamps: true });

// Middleware to automatically save device history on updates
deviceSchema.pre('save', async function (next) {
    if (this.isModified()) {
        const modifiedFields = Object.keys(this._doc).filter(key => this.isModified(key));

        for (const fieldName of modifiedFields) {
            const historyEntry = new DeviceHistory({
                device: this._id,
                field_name: fieldName,
                old_value: this.get(fieldName, null, { getters: false }), // Get previous value
                new_value: this[fieldName]
            });
            await historyEntry.save();
        }
    }
    next();
});

export const Device = mongoose.model('Device', deviceSchema);
