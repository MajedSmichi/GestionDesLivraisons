const mongoose = require("mongoose");
const notificationSchema=mongoose.Schema({
    data:String,
    receiver:{type:String,default:"0"},
    status:{type:String,default:"new"},
    createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("notification",notificationSchema);