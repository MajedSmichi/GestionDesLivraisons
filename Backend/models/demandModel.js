const mongoose = require("mongoose");
const demandSchema = mongoose.Schema({
  data: String,
  receiver: { type: String, default: "0" },
  receiverAgent: { type: String, default: "0" },
  status: { type: String, default: "new" },
  createdAt: { type: Date, default: Date.now },
  clientName: String,
  clientPhone: Number,
  clientAdress: String,
  agentName: String,
  agentPhone: Number,
  adress:String,
  commandDescription: String,
});
module.exports = mongoose.model("demand", demandSchema);
