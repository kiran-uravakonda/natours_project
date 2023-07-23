var express=require('express');

var controller=require('../controllers/tourController.js')

var router=express.Router();

router.param('id',controller.checkId)


router.use(controller.checkBody)


//get api
router.get('/api/v1/tours',controller.getAllTours )

//post api
router.post('/api/v1/tours',controller.checkBody, controller.postNewTours)

//get api by id
router.get('/api/v1/tours/:id', controller.getTourById)


//update patch api by id

router.patch('/api/v1/tours/:id',controller.updateById )

//delete api by id

router.delete('/api/v1/tours/:id',controller.deleteById)


module.exports=router;