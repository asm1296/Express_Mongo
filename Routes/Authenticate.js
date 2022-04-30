const express = require('express');
const Prof = require('../model/ProfModel');
const lodash = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');


const route = express.Router();

route.post('/', async(req,res)=>{
    let selectProf = await Prof.findOne({email:req.body.email});
    
    if (selectProf){
        let result = await bcrypt.compare(req.body.password,selectProf.password);
        if (result){
            let token = await selectProf.generateToken();
            res.header('x-auth-token',token).send(`Login Successful. Welcome - ${req.body.email}`);
        }
        else {
            res.send(`Incorrect Password. After 2 more unsuccessful attempts, account will be blocked`);
        }
    }
    else{
        res.send(`Email ID doesn't exist`);
    }


})

module.exports = route;