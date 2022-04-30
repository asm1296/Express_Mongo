const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const profSchema = new mongoose.Schema({
    name : {type:String,required:true},
    classesManaged : {type:String, required:true},
    email : {type:String,required:true,unique:true},
    password : {type:String,required:true}
});

profSchema.methods = {
    generateToken : async function(){
        const token = await jwt.sign({name:this.name},config.get('JWTSecret'));
        return token;
    }
}

/* profSchema.method({
    generateToken : async function(){
        const token = await jwt.sign({name:this.name},config.get('JWTSecret'));
        return token;
    }
}) */

module.exports = mongoose.model('Prof',profSchema);