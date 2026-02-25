import { useNavigate } from 'react-router-dom';
import '../styles/CustomerDashboard.css';
const CustomerDashboard = () => {
  const navigate=useNavigate();
  const _id= JSON.parse(localStorage.getItem("userId"));
  const userName=JSON.parse(localStorage.getItem("userName"));
  const userShopName=JSON.parse(localStorage.getItem("userShopName"));


  return (
    <>
     <h1>Welcome {userName} to {userShopName}</h1>
     <br /> <br />
     <button onClick={()=>navigate(`/get-purchases/${_id}`)}>Get Purchases</button>
     <button onClick={()=>navigate(`/get-payments/${_id}`)}>Get Payments</button>
     <button onClick={()=>navigate('/pay')}>Pay Now</button>
     <button onClick={()=>navigate('/my-due')}>View My Due</button>
    </>
  );
};

export default CustomerDashboard;
