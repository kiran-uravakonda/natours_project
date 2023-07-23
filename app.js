var express = require('express');
var morgan=require('morgan');
var app = express();
var toursRouter=require('./routers/toursRouter')
app.use(express.json())

// app.use(morgan('dev'))

app.use('/',toursRouter)

app.listen(3000, () => {
    console.log("server running on 3000 port")
});