const User=require('../models/User');
const bcrypt=require("bcryptjs");
const jwt = require('jsonwebtoken');
exports.addCustomer = async (req, res) => {
    const { name, mobile, password, role, shopName } = req.body;
    console.log(name);
    console.log(password);
    console.log(mobile);
    console.log(role);
    console.log(shopName);
    

    try {
        const existingUser = await User.findOne({ mobile, role, shopName });
        if (existingUser) {
            return res.status(409).json({ message: "User with this mobile,role and shop already exists" }); // 409 Conflict
        }
        console.log(req);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, mobile, password: hashedPassword, role, shopName });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' });

        return res.status(201).json({ // 201 Created for successful resource creation
            _id: user._id,
            name: user.name,
            mobile: user.mobile,
            shopName: user.shopName,
            token,
            message: "Registration successful" // Explicit success message
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during registration' }); // More specific error message
    }
};
exports.getCustomers=async(req,res)=>{
    const { shopName } = req.body || {}; 
    console.log(shopName);
    const role="customer";
    try{
        const customers=await User.find({shopName,role}).lean();
        if(customers.length==0){
            return res.status(404).json({ message: "No customers found for this shop." });
        }
        console.log(customers);
        return res.json(customers);
    }catch(err){
        res.json({message:"cannot able to load customers"});
    }
};
