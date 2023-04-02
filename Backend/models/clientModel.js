const mongoose = require("mongoose");
const clientSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  whatsApp: { type: Number, required: false },
  password: { type: String, required: true },
  adresse: { type: String, required: false },
  role: { type: String, required: false },
  dateOfBirth: { type: Date, required: false },
  joinDate: { type: Date, default: Date.now },
  latitude:{type:String},
  longitude:{type:String},
  photoUrl: {type:String,required:false}

});
module.exports = mongoose.model("client", clientSchema);
