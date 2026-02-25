const express=require('express');
const {auth}=require('../middleware/auth');
const {getDueForCustomer,getDuesByShop}=require('../controllers/dueController');
const router=express.Router();

router.post('/getDue',auth,getDueForCustomer);
router.post('/getDuesByShop',auth,getDuesByShop);

module.exports=router;
