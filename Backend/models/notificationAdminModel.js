const mongoose = require("mongoose");
const notificationSchema=mongoose.Schema({
    data:String,
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("notificationAdmin",notificationSchema);