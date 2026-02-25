const mongoose=require('mongoose');
const PaymentSchema=new mongoose.Schema({
    customer:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    date:{type: Date,default: Date.now,},
    cost:{type:Number,required:true}
});
PaymentSchema.index({customer:1,date:-1});
module.exports=mongoose.model("Payment",PaymentSchema);
