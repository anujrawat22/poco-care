const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender : {type : String,
  enum : ['male','female','other']},
  role: {
    type: String,
    enum: ["doctor", "patient", "admin"],
    default: "patient",
  },
  age: { type: Number },
  contact_info: { type: String, required: true },
  specialties: { type: String },
  availability: { type: String, enum: ["available", "not_available"], default : 'available' },
  bio: { type: String },
  img : {type : String ,required : true}
});

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
