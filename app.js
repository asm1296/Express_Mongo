import express from "express";      
//EXPRESS JS is a framework which provides features to build node js based application.
///With express js, it become easy, fast, minimal work.

//A .env file or dotenv file is a simple text configuration file for 
//controlling your Applications environment constants.
// module that loads environment variables from a .env file into process.env
require('dotenv').config();

import bcrypt from 'bcrypt';


import cors from 'cors';

import cookieParser from 'cookie-parser';

// The uuid, or universally unique identifier, npm package is a secure way to 
//generate cryptographically strong unique identifiers with Node. js that doesn't 
//require a large amount of code
import {v1 as uuid1} from 'uuid';

//Formidable module is used for parsing form data, especially file uploads.
import fomidable from 'formidable';

import jwt from 'jsonwebtoken';

// import router object
import userRouter from './Routes/UserRouter';

// 1)	What are event emitters and how we write in node js?
// As we have different events in Browser like click, button press, mouse movement.
// Like this, we can create events in node js using ‘events’ module.
// This events module provides EventEmitter class. 
// Object initialized from this class exposes two methods – 
// A)	emit is used to trigger an event
// B)	on is used to add a callback function that's going to be executed when the event is triggered
// const EventEmitter = require('events');

// const eventEmitter = new EventEmitter();
// eventEmitter.on('start', () => {
//   console.log('started');
// });
// eventEmitter.emit('start');


const app = express(); // Creating express application.

// express.json() - This return middleware which parse request with JSON object in request body.
//express.urlencoded() - This return middleware which parse request with urlencoded(string/array) object in request bod

// To process all request with middleware, we implement - 
app.use(express.json());
//app.use(express.urlencoded());

// A cookie is a piece of data that is sent to the client-side with a response and is stored on the client-side itself by the Web Browser the user is currently using. With the help of cookies –
//It is easy for websites to remember the user’s information
//It is easy to capture the user’s browsing history
//It is also useful in storing the user’s sessions
// cookie-parse parse cookies attached to request obj sent from client. usecase - token
app.use(cookieParser());

let corsOptions = {
    origin:'xpshop.netlify.com', // '*' allow all origins
}
// This is a middleware which will enable cross origin resource sharing (CORS) 
// using additional browser hearders like Access-Control-Allow-Origin, Access-Control-Allow-Methods for all routes
app.use(cors(corsOptions))

// Seperate routes based on category into files/mini-application with router object which itself is mini-application.
app.use('/api/user', userRouter);
//app.use('/api/product', productRoute);
//app.use('/api/location', locationRoute);

const passwordAuth = async(pwd)=>{
    // bcrypt module
    // let salt = await bcrypt.genSalt();
    // let encryPwd = await bcrypt.hash(pwd,salt);
    // return encryPwd;

    // crypto module
    // let salt = uuid1();
    // let encryPwd = crypto.createHmac('sha256',salt).update(pwd).digest('hex');
    // return encryPwd;
}

const signInPwd = async(inputPwd) =>{
    // db operation -->
    let dbPwd;
    bcrypt.compare(inputPwd,dbPwd).then((resp)=>{console.log('login success')});
    //or
    return (passwordAuth(inputPwd) == dbPwd);
}

//creating route based on method- GET,POST,PUT,DELETE - where we process request and send back response 
app.get('/',(req,res)=>{
   return res.send("Welcome to Home Screen");
})

// cookie implementation
app.get('/setCookie',(req,res)=>{
    //how to set cookie
    res.cookie('cookieName','cookieValue',{expires:new Date(Date.now()+(10*60*1000))});
    console.log('unique salt to individual user for encrytion', uuid1())
    res.send('cookie set successfully');
    //how to clear cookie
    //res.clearCookie('cookieName')
})

app.post('/upload',(req,res)=>{
    let reqToken = req.header['x-auth'];
    let valid = jwt.verify(reqToken,'mySecret');    //secret must be kept in env variable
    if(valid){
        let form = new fomidable.IncomingForm({keepExtensions:true,maxFileSize:2*1024*1024})
        form.parse(req,(err,fields,file)=>{
            const {name, email, language, education} = fields;
            let fileData = fs.readFileSync(file.path);
        })
    }else{
        console.log('invalid token');
    }
})

// JWT or Json Web Token used to share security information between a client and a server.
// Signed JWT contains Header, Payload, Signature. Header and payload are JSON object.
// Header contains {"typ":"jwt","alg":"HS56"} alg used to encrypt. This is used for authentication.
// Previously session Ids were used for auth which we need to saved on server. But with jst, nothing
// has to be saved on server, all info is stored in token. If we have multiple server for load mgmt,
// using same secret over multiple server, we can use same jwt. for session id, it is difficult
app.get('/login',(req,res)=>{
    // user-password authorization
    let token = jwt.sign('identitydetails','mySecret');
    res.header['x-auth'] = token;
    return res.json({message:'login successful'});
})

// We bind our express application at specified port and listen to request/connection
app.listen(5000,()=>{
    console.log(`App is running at 5000`);
})

