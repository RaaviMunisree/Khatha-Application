import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";
import '../styles/GetPayments.css'; // Make sure this path matches your folder structure

const GetPayments = () => {
  const [sum, setSum] = useState('');
  const { customerId } = useParams() || {};
  const _id = customerId;
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    handlePayments();
  }, []);

  const handlePayments = async () => {
    try {
      const res = await api.post('/payments/getPayments', { _id });
      setPayments(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Error fetching payments");
    }
  };

  useEffect(() => {
    const total = payments.reduce((acc, item) => acc + item.cost, 0);
    setSum(total);
  }, [payments]);

  return (
    <div className="payments-container">
      {payments.length > 0 ? (
        <table className="payments-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((item, index) => (
              <tr key={index}>
                <td>{new Date(item.date).toLocaleDateString('en-GB')}</td>
                <td>₹{item.cost}</td>
              </tr>
            ))}
            <tr className="total-row">
              <th>Amount</th>
              <th>₹{sum}</th>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="no-payments">No Payments</p>
      )}
    </div>
  );
};

export default GetPayments;
