import { useNavigate } from "react-router-dom";
import '../styles/OwnerDashboard.css'; // Link to CSS file

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  return (
    <div className="dashboard-container">
      <h1>Welcome, {userName}</h1>
      <div className="dashboard-buttons">
        <button onClick={() => navigate('/view-customers')}>View Customers</button>
        <button onClick={() => navigate('/add-customer')}>Add Customer</button>
        <button onClick={() => navigate('/view-dues')}>View Dues</button>
      </div>
    </div>
  );
};

export default OwnerDashboard;
