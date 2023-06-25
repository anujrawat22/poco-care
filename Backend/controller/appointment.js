const { AppointmentModel } = require("../models/appointment.model");

exports.userAppointments = async (req, res) => {
  try {
    const userId = req.userId;
    const role = req.role;
    const { id } = req.body;
    const { search } = req.query;
    if (role == "doctor") {
      const appointments = await AppointmentModel.find({ doctor: userId });
      res.status(201).send({ appointments });
    } else if (role == "patient") {
      const appointments = await AppointmentModel.find({ patient: userId });
      res.status(201).send({ appointments });
    } else if (search == "doctor" && id) {
      const appointments = await AppointmentModel.find({ doctor: id });
      res.status(201).send({ appointments });
    } else if (search == "patient" && id) {
      const appointments = await AppointmentModel.find({ patient: id });
      res.status(201).send({ appointments });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.createAppointments = async (req, res) => {
  try {
    const { doctor, date, description, status, start_time, end_time } =
      req.body;
    const patient = req.userId;
    const appointment = await new AppointmentModel({
      doctor,
      date,
      description,
      status,
      start_time,
      end_time,
      patient,
    });
    appointment.save();
    res.status(201).json({ msg: "Appointment created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const payload = req.body;
    const { id } = req.params;
    const { role, userId } = req;

    const appointment = await AppointmentModel.findOne({ _id: id });

    if (
      userId == appointment.doctor ||
      userId == appointment.patient ||
      role == "admin"
    ) {
      await AppointmentModel.findOneAndUpdate({ _id: id }, { $set: payload });
      res.status(204).send({ msg: "Updated successfully" });
    } else {
      res.status(401).send({ msg: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const role = req.role;
    const userId = req.userId;

    if (role == "admin") {
      await AppointmentModel.deleteOne({ _id: id });
      res.status(201).send({ msg: "Appointment deleted" });
    } else {
      const appointment = await AppointmentModel.findOne({ _id: id });
      if (appointment) {
        if (appointment.patient == userId || appointment.doctor == userId) {
          await AppointmentModel.deleteOne({ _id: id });
          res.status(201).json({ msg: "Appointment deleted" });
        } else {
          res.status(401).json({ msg: "Unauthorized" });
        }
      } else {
        res.status(404).json({ msg: "Appointment not found" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};
