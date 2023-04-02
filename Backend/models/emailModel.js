const mongoose = require("mongoose");
const emailSchema=mongoose.Schema({
    data:String,
    receiver:{type:String,default:"0"},
    createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("email",emailSchema);