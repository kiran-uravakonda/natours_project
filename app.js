var express = require('express');
var mongoose=require('mongoose');
var AppError=require('./utils/AppError')
var errorHandler=require('./controllers/errorController')
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


app.all('*',(req,res,next)=>{
    // var err=new Error(`can't find the ${req.originalUrl} on this server`)
    // err.status='fail'
    // err.statusCode=404
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})

app.use(errorHandler);

app.listen(3000, () => {
    console.log("server running on 3000 port")
}); 