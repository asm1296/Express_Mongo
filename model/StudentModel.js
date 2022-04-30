const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name : {type:String,required:true},
    rollNo : {type:Number,required:true,default:1},
    stream : {type:String,required:true}
});

module.exports = mongoose.model('StudentModel',studentSchema);