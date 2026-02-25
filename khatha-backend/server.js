
const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

connectDB();


app.get("/api",(req,res)=>{
    res.json({message:"Hlo user"});
})
const authRoutes=require('./routes/authRoutes');
app.use("/auth",authRoutes);

const customerRoutes = require('./routes/customerRoutes');
app.use("/customers", customerRoutes);

const purchaseRoutes = require('./routes/purchaseRoutes');
app.use("/purchases", purchaseRoutes);

const paymentRoutes = require('./routes/paymentRoutes');
app.use("/payments", paymentRoutes);

const dueRoutes=require('./routes/dueRoutes');
app.use("/dues", dueRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
