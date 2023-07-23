var express=require('express');
var morgan=require('morgan');
var app=express();


app.use(morgan('tiny'))

app.get('/',(req,res)=>{
    res.send("hello world!")
})

app.listen(2000,()=>{
    console.log("server running ");
})