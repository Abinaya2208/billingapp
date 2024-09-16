import React, { useState, useEffect } from 'react';
import CreateBill from './component/CreateBill';
import BillDisplay from './component/BillDisplay';
import BillNumberManager from './component/BillNumberManager'; // Import the new component
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [billData, setBillData] = useState(null);
  const [billNumber, setBillNumber] = useState("");

  useEffect(() => {
    // Load bill number from localStorage on component mount
    const savedBillNumber = localStorage.getItem("currentBillNumber") || "";
    setBillNumber(savedBillNumber);
  }, []);

  const handleCreateBill = (data) => {
    setBillData(data);
    setShowForm(false);
    setShowBill(true);
  };

  const handleShowForm = () => {
    setShowForm(true);
    setShowBill(false);
  };

  const handleBillNumberChange = (newNumber) => {
    setBillNumber(newNumber);
  };

  const onBack = () => {
    setShowForm(false);
    setShowBill(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Best Agencies</h1>
      </header>

      {/* Bill Number Manager */}
      {!showForm && !showBill && (
        <div>
          <BillNumberManager
            currentBillNumber={billNumber}
            onBillNumberChange={handleBillNumberChange}
          />
          <div className="button-container">
            <button className="create-bill-button" onClick={handleShowForm}>
              Create Bill
            </button>
          </div>
        </div>
      )}

      {/* Create Bill Form Component */}
      {showForm && <CreateBill onCreateBill={handleCreateBill} />}

      {/* Bill Display Component */}
      {showBill && billData && <BillDisplay 
        customer={billData.customer} 
        products={billData.products} 
        billDetails={{ date: billData.date, transport: billData.transport }}
        totalAmount={billData.total} 
        onBack={onBack}
      />}
    </div>
  );
}

export default App;
