const Purchase=require('../models/Purchase');
const User=require('../models/User');
exports.addPurchase=async (req,res)=>{
    const {_id,date,name,cost}=req.body||{};
    console.log(req.body);
    try{
    const existing=await User.findById({_id});
    if(!existing) return res.json({message:"User doesnot exist"});
    const newPurchase= await Purchase.create({ customer: _id,  date,name,cost});
    await newPurchase.save();
    res.status(201).json({ newPurchase });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }

};
exports.getPurchases= async (req,res)=>{
    const {_id}=req.body||{};
    console.log(_id);
   if (!_id) {
      return res.status(400).json({ message: "Missing _id in request body" });
    }
    try{
      const existing=await User.findById({ _id });
      if(!existing) return res.json({message:"User doesnot exist"});
      const purchases=await Purchase.find({customer:_id}).sort({date:-1}).lean();
      return res.json(purchases);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
