const Payment=require('../models/Payment');
const User=require('../models/User');
const Razorpay=require('razorpay');
const crypto=require('crypto');

exports.getPublicKey=(req,res)=>{
  const keyId=process.env.RAZORPAY_KEY_ID||null;
  res.json({keyId});
};

exports.addPayment=async(req,res)=>{
    const {_id,date,cost}=req.body;
     try{
        const existing=await User.findById({_id});
        if(!existing) return res.json({message:"User doesnot exist"});
        const newPayment= await Payment.create({ customer: _id,  date,cost});
        await newPayment.save();
        res.status(201).json({ newPayment });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }  
};

exports.getPayments= async (req,res)=>{
    const {_id}=req.body;
    try{
      const existing=await User.findById({ _id });
      if(!existing) return res.json({message:"User doesnot exist"});
      const payments=await Payment.find({customer:_id}).lean();
      return res.json(payments);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.createOrder=async(req,res)=>{
  const {amount,currency='INR',receipt}=req.body||{};
  try{
    const instance=new Razorpay({key_id:process.env.RAZORPAY_KEY_ID,key_secret:process.env.RAZORPAY_KEY_SECRET});
    const order=await instance.orders.create({amount:Math.round(Number(amount)*100),currency,receipt:receipt||`rcpt_${Date.now()}`});
    res.json(order);
  }catch(err){
    console.error(err);
    res.status(500).json({message:'Order creation failed'});
  }
};

exports.verifyPayment=async(req,res)=>{
  const {razorpay_order_id,razorpay_payment_id,razorpay_signature,_id,amount,date}=req.body||{};
  try{
    const body=razorpay_order_id+'|'+razorpay_payment_id;
    const expectedSignature=crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SECRET).update(body).digest('hex');
    if(expectedSignature!==razorpay_signature) return res.status(400).json({message:'Invalid signature'});
    const existing=await User.findById({_id});
    if(!existing) return res.json({message:"User doesnot exist"});
    const newPayment=await Payment.create({customer:_id,date:date||new Date(),cost:Number(amount)});
    await newPayment.save();
    res.json({status:'ok',paymentId:razorpay_payment_id});
  }catch(err){
    console.error(err);
    res.status(500).json({message:'Verification failed'});
  }
};
