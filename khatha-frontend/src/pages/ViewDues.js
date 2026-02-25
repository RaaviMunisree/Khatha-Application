import { useEffect, useState } from "react";
import api from "../services/api";
import '../styles/ViewDues.css';
const ViewDues=()=>{
  const shopName=JSON.parse(localStorage.getItem('userShopName'));
  const [rows,setRows]=useState([]);
  const [loading,setLoading]=useState(false);
  useEffect(()=>{load();},[]);
  const load=async()=>{
    try{
      setLoading(true);
      const res=await api.post('/dues/getDuesByShop',{shopName});
      setRows(res.data||[]);
    }catch(err){
      alert(err?.response?.data?.message||'Failed to load dues');
    }finally{
      setLoading(false);
    }
  }
  return(
    <div className="dues-container">
      <h2>Customer Dues – {shopName}</h2>
      {loading? <p>Loading…</p> : (
        rows.length? (
          <table className="dues-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Purchases</th>
                <th>Payments</th>
                <th>Due</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r=>(
                <tr key={r._id}>
                  <td>{r.name}</td>
                  <td>{r.mobile}</td>
                  <td>₹{r.totalPurchases||0}</td>
                  <td>₹{r.totalPayments||0}</td>
                  <td>₹{r.due||0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ): <p>No customers found.</p>
      )}
    </div>
  );
}
export default ViewDues;
