const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["doctor", "patient", "admin"],
    default: "patient",
  },
  age: { type: Number },
  contact_info: { type: Number, required: true },
  specialties: { type: String },
  availability: { type: String, enum: ["available", "not available"] },
  bio: { type: String },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
