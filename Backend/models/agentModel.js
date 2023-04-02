const mongoose = require("mongoose");
const agentSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  adresse: { type: String, required: false },
  whatsApp: { type: Number, required: false },
  vehicule: { type: String, required: false },
  idCard: { type: Number, required: false },
  dateOfBirth: { type: Date, required: false },
  latitude: { type: String },
  longitude: { type: String },
  role: { type: String, required: true },
  joinDate: { type: Date, default: Date.now },
  photoUrl: String,
  cardPhoto1: String,
  cardPhoto2: String,
});
module.exports = mongoose.model("agent", agentSchema);
