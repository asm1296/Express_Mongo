const express = require('express');
const mongoose = require('mongoose');
const lodash = require('lodash');
const bcrypt = require('bcrypt');

const Prof = require('../model/ProfModel');
const ValidateToken = require('../middleware/ValidateToken');

const route = express.Router();

route.post('/signup', async(req,res)=>{
    try{
        let newProf = new Prof(lodash.pick(req.body,['name','classesManaged','email','password']));
        // async encryption 
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(req.body.password,salt,(err,encryPass)=>{
                if (err){
                    console.log(`Encryption Failed`);
                }else {
                    newProf.password = encryPass;
                    newProf.save((result,err)=>{
                        let newProfDetails = lodash.pick(result,['name','classesManaged']);
                        res.json(newProfDetails);
                    });
                }
            })
        })    
                    
           

        
    }
    catch(err){
        console.log(`something went wrong while sign up ${err}`);
        res.send(err);
    }
});

route.get('/',ValidateToken,async (req,res)=>{
    let result = await Prof.find();
    res.send(result);
})

route.delete('/:name',async(req,res)=>{
    try{
        let delProf = await Prof.findOne({name : req.params.name});
        let output = await delProf.remove();
        res.json(output);
    }
    catch(err){
        console.log('something went wrong while deleting Professor Details');
    }
})

module.exports = route;