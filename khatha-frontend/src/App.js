import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import ViewCustomers from "./pages/ViewCustomers";
import AddCustomer from "./pages/AddCustomer";
import AddPurchase from "./pages/AddPurchase";
import AddPayment from "./pages/AddPayment";
import GetPurchases from "./pages/GetPurchases";
import GetPayments from "./pages/GetPayments";
import ProtectedRoute from "./pages/ProtectedRoute";
import PayNow from "./pages/PayNow";
import ViewDues from "./pages/ViewDues";
import MyDue from "./pages/MyDue";

function App() {
  return (
   <>
     <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/register'  element={<Register />}/>
        <Route path='/customer'  element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>}/>
        <Route path='/owner'  element={<ProtectedRoute><OwnerDashboard /></ProtectedRoute>}/>
        <Route path='/view-customers' element={<ProtectedRoute><ViewCustomers /></ProtectedRoute>} />
        <Route path='/add-customer' element={<ProtectedRoute><AddCustomer /></ProtectedRoute>} />
        <Route path='/add-purchase/:customerId' element={<ProtectedRoute><AddPurchase /></ProtectedRoute>}/>
        <Route path='/add-payment/:customerId' element={<ProtectedRoute><AddPayment /></ProtectedRoute>}/>
        <Route path='/get-purchases/:customerId' element={<ProtectedRoute><GetPurchases /></ProtectedRoute>}/>
        <Route path='/get-payments/:customerId' element={<ProtectedRoute><GetPayments /></ProtectedRoute>}/>
        <Route path='/pay' element={<ProtectedRoute><PayNow /></ProtectedRoute>}/>
        <Route path='/view-dues' element={<ProtectedRoute><ViewDues /></ProtectedRoute>}/>
        <Route path='/my-due' element={<ProtectedRoute><MyDue /></ProtectedRoute>}/>
        <Route path='/customer-due/:customerId' element={<ProtectedRoute><MyDue /></ProtectedRoute>}/>

      </Routes>
     </Router>
   
   </>
  );
}

export default App;
