import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import '../styles/MyDue.css';
const MyDue=()=>{
  const params=useParams();
  const _id=params.customerId || JSON.parse(localStorage.getItem('userId'));
  const [data,setData]=useState(null);
  const [loading,setLoading]=useState(false);
  useEffect(()=>{load();},[]);
  const load=async()=>{
    try{
      setLoading(true);
      const res=await api.post('/dues/getDue',{_id});
      setData(res.data);
    }catch(err){
      alert(err?.response?.data?.message||'Failed to load due');
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className="mydue-container">
      <h2>My Due</h2>
      {loading? <p>Loading…</p> : data? (
        <div className="mydue-card">
          <p>Total Purchases: ₹{data.totalPurchases||0}</p>
          <p>Total Payments: ₹{data.totalPayments||0}</p>
          <h3>Outstanding Due: ₹{data.due||0}</h3>
        </div>
      ): <p>No data</p>}
    </div>
  );
}
export default MyDue;
