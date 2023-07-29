
var tours = require('../models/tourModel.js')
var fs = require('fs')
const Tour = JSON.parse(
    fs.readFileSync(`./sample-data/tours.json`, 'utf-8')
);

var APIFeatures=require('../utils/apiFeatures.js');

//middleware
exports.aliasing=(req,res,next)=>{
    req.query.limit='5';
    req.query.sort='-price,-ratingsAverage';
    req.query.fields='name,duration,ratingsAverage,price,ratingsQuantity';
    next()
}



exports.aggregate=async(req,res,next)=>{
    try{
    var value=await tours.aggregate([
        
           {
            $match: { ratingsAverage:{$gt:4} },
           },
           {
            $group:
            {
                _id:null,
                numOfTours:{$sum:1},
                numRatings:{$sum:'$ratingsQuantity'},
                avgPrice:{$avg:'$price'},
                maxPrice:{$max:'$price'},
                minPrice:{$min:'$price'},
               ratingAvg:{$avg:'$ratingsAverage'}
            }
           },
           {
            $sort:
            {
               avgPrice:1
            }
           }
    ])
    res.status(200).json({
        count: value.length,
        finalRes: value
    })

}
catch (err) {
    res.status(400).json({
        status: 'failed',
        message: err.message
    })
}
}





exports.aggregateAdvance=async(req,res,next)=>{
    try{
        var year=req.params.year*1
    var value=await tours.aggregate([
        {
            $unwind:'$startDates'
        },
        {
            $match:{
                startDates:
                {$gte:new Date(`${year}-01-01`),$lte:new Date(`${year}-12-31`)}
                
            }
        },
        {
            $group:{
               _id:{$month:'$startDates'},
               numTour:{$sum:1},
               tour:{$push:'$name'}

            }
        },
        {
            $sort:{numTour:-1}
        },
        {
            $limit:12
        }

    ])
    res.status(200).json({
        count: value.length,
        finalRes: value
    })

}
catch (err) {
    res.status(400).json({
        status: 'failed',
        message: err.message
    })
}
}







//get api
exports.getAllTours = async (req, res) => {

    try {
        //query filtering 
        // console.log(req.query)
        var feature=new APIFeatures(tours.find(),req.query)
    .filter()
    .sort()
    .fields()
    .pagination();

        var result = await feature.query
        res.status(200).json({
            count: result.length,
            finalRes: result
        })

    }
    catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

//post api
exports.postNewTours = async (req, res) => {

    try {
        var result = await tours.create(req.body)
        res.status(200).json({
            count: result.length,
            finalRes: result
        })

    }
    catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }

}


//get api by id
exports.getTourById = async (req, res) => {

    try {
        var result = await tours.findById(req.params.id)
        res.send(result)
    }
    catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }
}


//update patch api by id

exports.updateById = async (req, res) => {
    try {
        var result = await tours.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })

        res.send(result)
    }
    catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }

}

exports.deleteById = async (req, res) => {
    try {
        var result = await tours.findByIdAndRemove(req.params.id)
        res.send("successfully deleted")
    }
    catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }

}




