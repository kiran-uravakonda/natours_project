
var tours = require('../models/tourModel.js')
var fs = require('fs')
const Tour = JSON.parse(
    fs.readFileSync(`./sample-data/tours.json`, 'utf-8')
);

//middleware
exports.aliasing=(req,res,next)=>{
    req.query.limit='5';
    req.query.sort='-price,-ratingsAverage';
    req.query.fields='name,duration,ratingsAverage,price,ratingsQuantity';
    next()
}



//get api
exports.getAllTours = async (req, res) => {

    try {
        //query filtering 
        // console.log(req.query)
        const queryData = { ...req.query }
        const excludeField = ['page', 'sort', 'limit', 'fields']
        excludeField.forEach(el => delete queryData[el])

        //advanced query filtering
        var queryStr = JSON.stringify(queryData)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        var query = tours.find(JSON.parse(queryStr))

        //sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy)

        }

        //limiting

    if(req.query.fields)
    {
        var field=req.query.fields.split(',').join(' ')
        query=query.select(field)
    }


    //pagination

    var page=req.query.page*1||1;
    // console.log(`the page is ${page}`)
    var limit=req.query.limit*1||100
    // console.log(`the limit is ${limit}`)
    var skip=(page-1)*limit;
    // console.log(`the skip is ${skip}`)
    query=query.skip(skip).limit(limit)

    if(req.query.page)
    {
        var totalCount=await tours.countDocuments()
        if(skip>=totalCount) throw "this page doesn't exist"
    }

        var result = await query
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
        var result = await tours.create(Tour)
        res.send(result)
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




