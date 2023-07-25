
var tours=require('../models/tourModel.js')
var fs=require('fs')
const Tour = JSON.parse(
    fs.readFileSync(`./sample-data/tours.json`, 'utf-8')
  );

//get api
exports. getAllTours= async(req, res) => {
    try{
        var result=await tours.find()
        res.send(result)
        
   }
   catch(err){
    res.status(400).json({
        status:'failed',
        message: err
    })
   }
}

//post api
exports.postNewTours= async (req, res) => {
   
    try{
         var result=await tours.create(Tour)
         res.send(result)
    }
    catch(err)
    {
        res.status(400).json({
            status:'failed',
            message: err.message
        })
    }
   
}


//get api by id
exports.getTourById= async(req, res) => {
   
     try{
        var result=await tours.findById(req.params.id)
       res.send(result)
   }
   catch(err)
   {
       res.status(400).json({
           status:'failed',
           message: err
       })
   }
}


//update patch api by id

exports.updateById= async(req, res) => {
    try{
        var result=await tours.findByIdAndUpdate(req.params.id,req.body,{
            new:true
            })
        
       res.send(result)
   }
   catch(err)
   {
       res.status(400).json({
           status:'failed',
           message: err
       })
   }
    
}

exports.deleteById=async (req,res)=>{
    try{
        var result=await tours.findByIdAndRemove(req.params.id)
       res.send("successfully deleted")
   }
   catch(err)
   {
       res.status(400).json({
           status:'failed',
           message: err
       })
   }
    
}




