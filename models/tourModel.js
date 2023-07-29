var mongoose=require('mongoose');
var slugify=require('slugify')
var validator=require('validator')
var tourSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter a name"],
        minlength:[10,'the name should be atleast 10 characters'],
        maxlength:[400,'the name should be maximum of 40 characters'],
        validate:[validator.isAlpha,'the name should be only characters']

        
     },
     slug:String,
     secreteTour:{
        type:Boolean,
        default:false
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
        enum:{
            values:["difficult","easy","medium","easy"],
            message:'a difficulty must be a either difficult,easy,medium'
        }
        
     },
    ratingsAverage:{
        type:Number,
        default: 4.5,
        min:[1,'the rating should be atleast 1'],
        max:[5,'the rating should be less than 5']
      
    },
    ratingsQuantity:{
        type:Number,
        default: 0
        
    },
    price:{
        type:Number,
        required:[true,"please enter a price"],
        
    },
    priceDiscount:{
        type:Number,
           validate:{
            validator:function(value)
            {
                return value<this.price
            },
            message:'discount price ({value}) should be less than a actual prize'
           }
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

},
{
    toJSON:{'virtuals':true},
    toObject:{'virtuals':true}
}
)

tourSchema.virtual('durationWeeks').get(function (){
    return this.duration/7
})

// document middleware only for save() and create() functions
tourSchema.pre('save',function(next)
{
     this.slug=slugify(this.name)
     console.log(this.slug)
     next()
    
})
// tourSchema.pre('save',function(next){
//     console.log('hello world!');
//     next()
// })
// tourSchema.post('save',function (doc,next){
//     console.log(doc)
//     next()
// })

//query middleware

// tourSchema.pre('find',function(next)
tourSchema.pre(/^find/,function(next)
{
    this.find({secreteTour:{$ne:true}})
    this.start=Date.now()
    next()
})

tourSchema.post(/^find/,function(docs,next)
{
    console.log(`query time is ${Date.now()-this.start} milliSeconds`)
   console.log(docs)
    next()
})
 module.exports=mongoose.model('tour',tourSchema);
 

