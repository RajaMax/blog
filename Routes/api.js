
const Router = require('express').Router();
const { body, validationResult } = require('express-validator');

const AppointmentController = require('../Controller/AppointmentController')

Router.get('/appointments',AppointmentController.getAppointments)
Router.get('/slots',AppointmentController.getSlots)
Router.post('/appointment',AppointmentController.createAppointment)
Router.post('/slot',AppointmentController.createSlot)





module.exports = Router;
