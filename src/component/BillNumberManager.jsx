import React, { useState, useEffect } from 'react';
import './BillNumberManager.css'

const BillNumberManager = ({ onBillNumberChange }) => {
  const [billNumber, setBillNumber] = useState("");

  // Load bill number from localStorage when the component mounts
  useEffect(() => {
    const savedBillNumber = localStorage.getItem("currentBillNumber") || "";
    setBillNumber(savedBillNumber);
  }, []);

  // Update localStorage and parent component state
  const saveBillNumber = () => {
    localStorage.setItem("currentBillNumber", billNumber);
    onBillNumberChange(billNumber);
  };

  // Handle changes in the input field
  const handleBillNumberChange = (e) => {
    setBillNumber(e.target.value);
  };

  return (
    <div className="bill-number-manager">
      <div className="form-group">
        <label htmlFor="billNumber">Current Bill Number:</label>
        <input
          type="text"
          id="billNumber"
          value={billNumber}
          onChange={handleBillNumberChange}
        />
        <button onClick={saveBillNumber}>Save Bill Number</button>
      </div>
    </div>
  );
};

export default BillNumberManager;
