const mongoose = require("mongoose");
const { Schema } = mongoose;
const demandSchema = mongoose.Schema({
  clientData : {type: Schema.Types.ObjectId, ref: 'client'},
  agentData : {type:Schema.Types.ObjectId, ref : 'agent'},
  status: { type: String, default: "new" },
  createdAt: { type: Date, default: Date.now },
  statusClient: { type: String, default: "new" },
  statusAdmin: { type: String, default: "new" },
  commandDescription: String,
});
module.exports = mongoose.model("demand", demandSchema);
