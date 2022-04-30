const express = require('express');
const studentModel = require('../model/StudentModel');

const route = express.Router();


route.get('/',async(req,res)=>{
    try{
        let studentList = await studentModel.find();
        res.json(studentList);
    }
    catch(err){
        console.log(err);
    }
});

route.delete('/:name',async(req,res)=>{
    try{
        let selectStudent = await studentModel.findOne({name:req.params.name});
        let result = await selectStudent.remove();
        res.json(result);
    }
    catch(err){
        console.log(err);
    }
});

route.patch('/:name',async(req,res)=>{
    try{
        let selectStudent = await studentModel.findOne({name:req.params.name});
        selectStudent.stream = req.body.stream;
        let result = await selectStudent.save();
        res.json(result);
    }
    catch(err){
        console.log(err);
    }
})

route.post('/',async(req,res)=>{
    try{
        let newStudent = new studentModel({
            name : req.body.name,
            rollNo : req.body.rollNo,
            stream : req.body.stream
        });

        let result = await newStudent.save();
        res.json(result);
    }
    catch(err){
        console.log(err);
    }
});

module.exports = route;