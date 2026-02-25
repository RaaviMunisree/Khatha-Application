import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/PayNow.css';
const PayNow=()=>{
  const [_id]=useState(JSON.parse(localStorage.getItem('userId')));
  const [amount,setAmount]=useState('');
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const handlePay=async(e)=>{
    e.preventDefault();
    try{
      setLoading(true);
      let keyId=process.env.REACT_APP_RAZORPAY_KEY_ID;
      if(!keyId){
        const keyRes=await api.get('/payments/key');
        keyId=keyRes?.data?.keyId;
      }
      if(!keyId){
        alert('Razorpay key is not configured');
        setLoading(false);
        return;
      }
      const orderRes=await api.post('/payments/createOrder',{amount});
      const options={
        key:keyId,
        amount:orderRes.data.amount,
        currency:orderRes.data.currency,
        name:'Khatha App',
        description:'Customer Payment',
        order_id:orderRes.data.id,
        handler: async function (response){
          await api.post('/payments/verify',{
            razorpay_order_id:response.razorpay_order_id,
            razorpay_payment_id:response.razorpay_payment_id,
            razorpay_signature:response.razorpay_signature,
            _id,
            amount,
            date:new Date()
          });
          alert('Payment successful');
          navigate(`/get-payments/${_id}`);
        },
        theme:{color:'#007BFF'}}
      const r=window.Razorpay?new window.Razorpay(options):null;
      if(r){r.open();}
      else{alert('Payment gateway unavailable');}
    }catch(err){
      alert('Payment failed');
    }finally{
      setLoading(false);
    }
  }
  return(
    <div className="paynow-container">
      <form className="paynow-form" onSubmit={handlePay}>
        <h2>Pay Now</h2>
        <input type="number" min="1" step="0.01" placeholder="Amount" value={amount} onChange={(e)=>setAmount(e.target.value)} required/>
        <button type="submit" disabled={loading}>{loading?'Processing...':'Pay'}</button>
      </form>
    </div>
  );
}
export default PayNow;
