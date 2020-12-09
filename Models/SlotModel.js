const mongoose = require('mongoose');
const SlotSchema = mongoose.Schema({
    date: { type: Date },
    type: { type: String, enum: ['morning', 'evening'] },
    fromTime: { type: String },
    toTime: { type: String },
    fromTimeISO: { type: Date },
    toTimeISO: { type: Date },
    isBooked: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Slots', SlotSchema);