const mongoose=require('mongoose');
const Purchase=require('../models/Purchase');
const Payment=require('../models/Payment');
const User=require('../models/User');

exports.getDueForCustomer=async(req,res)=>{
  const {_id}=req.body||{};
  if(!_id) return res.status(400).json({message:'Missing _id'});
  try{
    const [purchaseAgg]=await Purchase.aggregate([
      {$match:{customer: new mongoose.Types.ObjectId(_id)}},
      {$group:{_id:null,total:{$sum:'$cost'}}}
    ]);
    const [paymentAgg]=await Payment.aggregate([
      {$match:{customer: new mongoose.Types.ObjectId(_id)}},
      {$group:{_id:null,total:{$sum:'$cost'}}}
    ]);
    const totalPurchases=(purchaseAgg&&purchaseAgg.total)||0;
    const totalPayments=(paymentAgg&&paymentAgg.total)||0;
    const due=totalPurchases-totalPayments;
    res.json({_id, totalPurchases, totalPayments, due});
  }catch(err){
    console.error(err);
    res.status(500).json({message:'Server Error'});
  }
};

exports.getDuesByShop=async(req,res)=>{
  const {shopName}=req.body||{};
  if(!shopName) return res.status(400).json({message:'Missing shopName'});
  try{
    const customers=await User.find({shopName,role:'customer'}).lean();
    const ids=customers.map(c=>c._id);
    const purchaseMap=new Map();
    const paymentMap=new Map();
    if(ids.length){
      const purchases=await Purchase.aggregate([
        {$match:{customer:{$in:ids}}},
        {$group:{_id:'$customer', total:{$sum:'$cost'}}}
      ]);
      purchases.forEach(p=>purchaseMap.set(p._id.toString(), p.total));
      const payments=await Payment.aggregate([
        {$match:{customer:{$in:ids}}},
        {$group:{_id:'$customer', total:{$sum:'$cost'}}}
      ]);
      payments.forEach(p=>paymentMap.set(p._id.toString(), p.total));
    }
    const result=customers.map(c=>{
      const cid=c._id.toString();
      const totalPurchases=purchaseMap.get(cid)||0;
      const totalPayments=paymentMap.get(cid)||0;
      const due=totalPurchases-totalPayments;
      return {_id:c._id,name:c.name,mobile:c.mobile, totalPurchases, totalPayments, due};
    });
    res.json(result);
  }catch(err){
    console.error(err);
    res.status(500).json({message:'Server Error'});
  }
};
