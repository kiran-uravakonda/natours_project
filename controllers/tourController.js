var fs = require('fs');
var tours = JSON.parse(fs.readFileSync('./sample-data/tours.json', 'utf-8'));

exports.checkId=(req,res,next,val)=>{
   if(req.params.id*1>tours.length)
   {
       return res.status(400).json({
            Error: "id was not found"
        })
    }
    next();

}
exports.checkBody=(req,res,next)=>{
    
    if(!req.body.name)
    {
       return res.status(400).json({
            Error:"body doesn't have any data"
        })
    }
    next()
}

//get api
exports. getAllTours= (req, res) => {
    res.status(200).json({
        result: "success",
        data: {
            tours
        }
    })
}

//post api
exports.postNewTours= (req, res) => {
    var newId = tours[tours.length - 1].id + 1;
    var newUser = Object.assign({ id: newId }, req.body)
    tours.push(newUser)
    fs.writeFile('./sample-data/tours.json', JSON.stringify(tours), 'utf-8', (err) => {
        if (err) throw err;
        res.json(newUser)
    })
}

//get api by id
exports.getTourById= (req, res) => {
    var _id = req.params.id
     console.log(tours.length)
    var found = tours.some(value => value.id === parseInt(_id))
    if (found) {
        var result = tours.filter(element => element.id === parseInt(_id))

    }
    

    // var result=tours.find(element=>element.id===parseInt(_id))
    res.send(result)
}


//update patch api by id

exports.updateById= (req, res) => {
    var _id = req.params.id
    var found = tours.some(value => value.id === parseInt(_id))
    if (found) {
        tours.forEach(element => {
            if (element.id === parseInt(_id)) {
                element.duration = req.body.duration;
                res.json(element.duration)
            }
            
        });
      
    }
    
}

exports.deleteById=(req,res)=>{
    var _id = req.params.id
    var found = tours.some(value => value.id === parseInt(_id))
    if (found) {
        var result = tours.filter(element => element.id !== parseInt(_id))
       
    }
    
     
    // var result=tours.find(element=>element.id===parseInt(_id))
 
   else
   {
    res.status(400).json({
        Error:"error occured"
    })
   }

   res.send(result)
}




