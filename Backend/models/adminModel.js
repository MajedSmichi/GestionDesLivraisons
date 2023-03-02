const mongoose = require("mongoose");
const clientSchema = mongoose.Schema({
  email:{type:String,required:true},
  password: { type: String, required: true }
});
module.exports = mongoose.model("admin", clientSchema);