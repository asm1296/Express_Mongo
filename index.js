const express = require('express');

const mongoose = require('mongoose');

const studentRoute = require('./Routes/StudentRoute');

const profRoute = require('./Routes/ProfRoute');

const authRoute = require('./Routes/Authenticate');

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/VESIT",{useNewUrlParser:true,useUnifiedTopology:true});

mongoose.connection.once('open',()=>{
    console.log("Database is connected");
})

app.use('/api/students',studentRoute);
app.use('/api/professor',profRoute);
app.use('/api/auth',authRoute);

app.listen(5000,()=>{
    console.log("Server is up and running at 5000 port");
});