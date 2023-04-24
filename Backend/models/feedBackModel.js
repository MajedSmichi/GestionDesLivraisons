const mongoose = require("mongoose");
const feedBackSchema=mongoose.Schema({
    data:String,
    clientName:String,
    agentName:String,
    rate:String,
    receiverAgent:String,
    createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("feedBack",feedBackSchema);