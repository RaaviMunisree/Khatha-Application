const express = require('express');
const { auth } = require('../middleware/auth');
const { addPayment, getPayments, createOrder, verifyPayment, getPublicKey } = require('../controllers/paymentController');

const router = express.Router();

router.post('/addPayment',auth,addPayment);
router.post('/getPayments',auth,getPayments);
router.post('/createOrder',auth,createOrder);
router.post('/verify',auth,verifyPayment);
router.get('/key',getPublicKey);

module.exports = router;
