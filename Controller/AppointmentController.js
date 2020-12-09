const AppointmentsModel = require('../Models/AppointmentModel')
const SlotsModel = require('../Models/SlotModel');
const { body, validationResult } = require('express-validator');
const moment = require("moment")
const apiResponse = require('../Constants/APIResponse')

exports.getAppointments = [
    async (req, res) => {
        try {
            let findObj = {
                date: new Date(req.query.date)
            }
            let page = req.query.page || 1;
            let limit = req.query.limit || 10;
            let skip = (page - 1) * limit;
            let appointments = await AppointmentsModel.find(findObj).populate("slotId").skip(skip).limit(limit);
            let totalCount = await AppointmentsModel.countDocuments(findObj);

            return apiResponse.successResponseWithData(
                res,
                "Appointments provided successfully",
                {
                    records: appointments,
                    count: totalCount
                }
            );
        } catch (err) {
            return apiResponse.validationErrorWithData(res, "Error Occured", err);
        }
    }
];

exports.createAppointment = [
    body("patientName").exists().withMessage("Patient Name is required"),
    body("date").exists().withMessage("Date is required"),
    body("slotId").exists().withMessage("Slot is required"),
    body("contactNumber").exists().withMessage("Contact Number is required"),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(
                    res,
                    "Validation Error.",
                    errors.array()
                );
            } else {
                var findAppointments = await AppointmentsModel.find({
                    slotId: req.body.slotId
                });
                if (findAppointments.length === 0) {
                    const appointment = new AppointmentsModel(req.body);
                    await appointment.save();
                    return apiResponse.successResponse(
                        res,
                        "Appointments created Successfully",
                    );
                } else {
                    return apiResponse.validationError(res, "Appointment Slot is Already Booked");
                }
            }
        } catch (err) {
            console.log(err)
            return apiResponse.validationErrorWithData(res, "Error Occured", err);
        }
    }
]

exports.getSlots = [
    async (req, res) => {
        try {
            let findObj = {
                date: new Date(req.query.date),
            }
            if(req.query.type !== 'all'){
                findObj.type= req.query.type
            }
            let slots = await SlotsModel.find(findObj).sort({ fromTimeISO: 1 });
            return apiResponse.successResponseWithData(
                res,
                "Slots provided successfully",
                slots
            );
        } catch (err) {
            return apiResponse.validationErrorWithData(res, "Error Occured", err);
        }
    }
];

exports.createSlot = [
    body("type").exists().withMessage("Type is required"),
    body("date").exists().withMessage("date is required"),
    body("fromTime").exists().withMessage("From Time is required"),
    body("toTime").exists().withMessage("To Time is required"),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(
                    res,
                    "Validation Error.",
                    errors.array()
                );
            } else {
                let saveData = req.body;
                saveData.date = new Date(saveData.date)
                console.log(saveData)
                const slot = new SlotsModel(saveData);
                await slot.save();
                return apiResponse.successResponse(
                    res,
                    "Slot created Successfully",
                );
            }
        } catch (err) {
            console.log(err)
            return apiResponse.validationErrorWithData(res, "Error Occured", err);
        }
    }
]