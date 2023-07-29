var express=require('express');

var controller=require('../controllers/tourController.js')

var router=express.Router();

router.route('/aggregate').get(controller.aggregate)
router.route('/monthly-tours/:year').get(controller.aggregateAdvance)

router.route('/top-5').get(controller.aliasing,controller.getAllTours)
//get api
router.route('/')
.get(controller.getAllTours )

//post api
.post(controller.postNewTours)

//get api by id
router.route('/:id')
.get( controller.getTourById)


//update patch api by id

.patch(controller.updateById )

//delete api by id

.delete(controller.deleteById)


module.exports=router;