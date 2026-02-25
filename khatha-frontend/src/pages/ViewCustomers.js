import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/ViewCustomers.css"; // Link to the CSS

const ViewCustomers = () => {
  const navigate = useNavigate();
  const shopName = JSON.parse(localStorage.getItem("userShopName"));
  const [customersList, setCustomersList] = useState([]);

  useEffect(() => {
    handleCustomers();
  }, []);

  const handleCustomers = async () => {
    try {
      const res = await api.post("customers/getCustomers", { shopName });
      console.log(res);
      setCustomersList(res.data);
    } catch (err) {
      alert("Failed to fetch customers.");
    }
  };

  return (
    <div className="customer-table-container">
      <h2>Customers of {shopName}</h2>
      {customersList.length > 0 ? (
        <table className="customer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th colSpan="4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customersList.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.mobile}</td>
                <td>
                  <button onClick={() => navigate(`/add-purchase/${item._id}`)}>Add Purchase</button>
                </td>
                <td>
                  <button onClick={() => navigate(`/get-purchases/${item._id}`)}>Get Purchases</button>
                </td>
                <td>
                  <button onClick={() => navigate(`/add-payment/${item._id}`)}>Add Payment</button>
                </td>
                <td>
                  <button onClick={() => navigate(`/get-payments/${item._id}`)}>Get Payments</button>
                </td>
                <td>
                  <button onClick={() => navigate(`/customer-due/${item._id}`)}>View Due</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No customers found.</p>
      )}
    </div>
  );
};

export default ViewCustomers;
