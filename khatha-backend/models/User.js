const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    mobile:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true},
    shopName:{type:String,required:true}
})
UserSchema.index({mobile:1,shopName:1});
UserSchema.index({shopName:1,role:1});

module.exports = mongoose.model("User", UserSchema);
