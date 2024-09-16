import React, { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js/dist/html2pdf.min.js';

function BillDisplay({ customer, products, billDetails, totalAmount, onBack }) {
  const [billNumber, setBillNumber] = useState('');

  useEffect(() => {
    // Retrieve and increment bill number
    const currentBillNumber = parseInt(localStorage.getItem('currentBillNumber') || '0', 10);
    setBillNumber(currentBillNumber);
    setTimeout(()=>{
      handleDownloadPDF()
    },1000)
  }, []);

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    const printContent = document.querySelector('.bill-display').innerHTML;

    const printStyles = `
      <style>
        @media print {
          .print-button {
            display: none; 
          }
        }
      </style>
    `;

    printWindow.document.write('<html><head><title>Print Bill</title>');
    printWindow.document.write(printStyles);
    printWindow.document.write('</head><body>');  
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handleDownloadPDF = () => {
    const element = document.querySelector('.bill-display');
    const currentBillNumber = parseInt(localStorage.getItem('currentBillNumber') || '0', 10);
    const options = {
      margin: 1,
      filename: `bill_${currentBillNumber}.pdf`, // Use bill number in the filename
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(options).save();
  };

  return (
    <>
      <div style={{
        fontFamily: 'Arial, sans-serif',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        boxSizing: 'border-box'
      }} className='bill-display'>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i className="fa fa-phone" style={{ marginRight: '8px' }}></i>
            <span>Phone: 8305283052</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i className="fa fa-credit-card" style={{ marginRight: '8px' }}></i>
            <span>GPay: 9444053925</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i className="fa fa-tag" style={{ marginRight: '8px' }}></i>
            <span>GSTIN: 33AHFPN5398EZZ6</span>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{ fontSize: '1.5rem', margin: '0' }}>BEST AGENCIES</h2>
          <p>All Types of Bag Printing Inks & PVC Plastic Sticks All Size Available</p>
          <p>231/B8, Varanapuram 5th Street, Bhavani - 638 301</p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '20px'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '10px'
          }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Bill No: {billNumber}</p>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <p><span style={{ fontWeight: 'bold' }}>M/s:</span> {customer.name}</p>
              <p><span style={{ fontWeight: 'bold' }}>Address:</span> {customer.address}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
              <p><span style={{ fontWeight: 'bold' }}>Date:</span> {billDetails.date}</p>
              <p><span style={{ fontWeight: 'bold' }}>Transport:</span> {billDetails.transport}</p>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Sl. No</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Description of Goods</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>HSM Code</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Qty</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Rate</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{index + 1}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{product.description}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{product.hsm}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{product.qty} {product.unit}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{product.rate}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{product.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <p>Total: {totalAmount}</p>
            <p>Taxable Value: {totalAmount}</p>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px'
        }}>
          <div style={{
            border: '1px solid #ddd',
            padding: '10px',
            width: '48%',
            textAlign: 'left'
          }}>
            <p><span style={{ fontWeight: 'bold' }}>Account Details:</span></p>
            <p>A/c Name: Best Agencies</p>
            <p>A/c Number: 187538305283052</p>
            <p>Tamilnad Mercantile Bank,</p>
            <p>Bhavani Branch</p>
            <p>Branch IFSC: TMBL0000187</p>
          </div>
          <div style={{
            border: '1px solid #ddd',
            padding: '10px',
            width: '48%',
            textAlign: 'center'
          }}>
            <p>For BEST AGENCIES</p>
            <p style={{ marginTop: '120px', fontWeight: 'bold' }}>Authorized Signatory</p>
          </div>
        </div>
      </div>
      {/* Print and Download Button Section */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            marginRight: '10px'
          }}
          onClick={handlePrint}
        >
          Print
        </button>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            marginTop: '10px',
            marginLeft: '10px'
          }}
          onClick={onBack}
        >
          Back
        </button>
      </div>
    </>
  );
}

export default BillDisplay;
