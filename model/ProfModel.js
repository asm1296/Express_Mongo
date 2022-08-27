// Javascript way to create Schema and models using Mongoose
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

// Typescript way to create schema and model using typegoose
// import {getModelForClass,prop} from '@typegoose/typegoose';
// import {Base} from '@typegoose/typegoose/lib/defaultClasses';

// export class professorSchema extends Base{
//     @prop({required:true})
//     public name!:String;

//     @prop({required:true})
//     public classesManaged!:String;

//     @prop({required:true,unique:true})
//     public email!:String

//     @prop({required:true})
//     public password!:string

//     async public generateToken(){
//         let token = await jwt.sign({name:this.name},config.get('JWTSecret'));
//         return token;
//     }
// }

// export const ProfModel = getModelForClass(professorSchema);