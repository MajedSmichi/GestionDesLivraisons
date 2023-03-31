const mongoose = require("mongoose");
const adminSchema = mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email:{type:String,required:false},
  password: { type: String, required: false },
  dateOfBirth: { type: Date, required: false },
  whatsApp: { type: Number, required: false },
  phone: { type: Number, required: false },
  photoUrl: String,
  role:{type:String,required:false}
 
});
module.exports = mongoose.model("admin", adminSchema);