const express = require("express")
const { userAppointments, createAppointments, deleteAppointment, updateAppointment } = require("../controller/appointment")
const { authorizeRoles, authenticate } = require("../middlewares/authMiddleware")

const appointmentRouter = express.Router()

appointmentRouter.get("/user",userAppointments)


appointmentRouter.post("/create",authorizeRoles(['patient']),createAppointments)


appointmentRouter.patch("/update/:id",authorizeRoles(['patient','admin','doctor']),updateAppointment)

appointmentRouter.delete("/delete/:id",authorizeRoles(['patient','admin','doctor']),deleteAppointment)


module.exports = {appointmentRouter}