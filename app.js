var express = require('express');
var mongoose=require('mongoose');
var dotenv=require('dotenv');
var morgan=require('morgan');
var app = express();
var toursRouter=require('./routers/toursRouter');
app.use(express.json());


dotenv.config({path:'./config.env'})
app.use(express.static('public'))
app.use(morgan('dev'))

//for localhost database version url
// var url=process.env.DATABASE_LOCAL;

//for hosted database version url

var url=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(url)
.then((value)=>{
    console.log("database connected successfully")
})
.catch((err)=>{
    console.log("database not connected")
})
app.use('/api/v1/tours',toursRouter)


app.listen(3000, () => {
    console.log("server running on 3000 port")
});