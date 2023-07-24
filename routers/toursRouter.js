var express=require('express');

var controller=require('../controllers/tourController.js')

var router=express.Router();

router.param('id',controller.checkId)




//get api
router.route('/')
.get(controller.getAllTours )

//post api
.post(controller.checkBody, controller.postNewTours)

//get api by id
router.route('/:id')
.get( controller.getTourById)


//update patch api by id

.patch(controller.updateById )

//delete api by id

.delete(controller.deleteById)


module.exports=router;