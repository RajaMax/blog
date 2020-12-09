const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = mongoose.Schema({
    patientName: { type: String, required: true },
    image: { type: String, default: "" },
    date:{type:Date,require:true},
    slotId: { type: Schema.Types.ObjectId, ref: 'Slots' },
    contactNumber: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Appointments', AppointmentSchema);