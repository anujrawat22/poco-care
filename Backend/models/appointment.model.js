const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled"],
    default: "scheduled",
  },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
});

const AppointmentModel = mongoose.model("Appointment", appointmentSchema);

module.exports = { AppointmentModel };
