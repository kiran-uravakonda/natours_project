var mongoose=require('mongoose');
var tourSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter a name"],
        
     },
     duration:{
        type:Number,
        required:[true,"please enter a duration"],
       
     },
     maxGroupSize:{
        type:Number,
        required:[true,"please enter a groupSize"],
       
     },
     difficulty:{
        type:String,
        required:[true,"please enter a difficulty"],
        
     },
    ratingsAverage:{
        type:Number,
        default: 4.5
      
    },
    ratingsQuantity:{
        type:Number,
        default: 0
        
    },
    price:{
        type:Number,
        required:[true,"please enter a price"],
        
    },
    summary:{
        type:String,
        trim:true,
        required:[true,"please enter a summary"],
        
    },
    description:{
        type:String,
        trim:true,
        required:[true,"please enter a description"],
        
    },
    imageCover:{
        type:String,
        required:[true,"please enter a description"],
       
    },
    images:[String],
    createdAt:{
          type:Date,
          default: Date.now()
    },
    startDates:[Date]

})

 module.exports=mongoose.model('tour',tourSchema);
 

