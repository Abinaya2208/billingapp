import React, { useState } from "react";
import "./CreateBill.css";
import productData from './product.json'

const unitOptions = ["ltr", "kg", "Piece"]; // Unit options

const CreateBill = ({ onCreateBill }) => {
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [products, setProducts] = useState([{ description: "", hsm: "", package: "", qty: "", unit: "", rate: "", amount: "" }]);
  const [date, setDate] = useState("");
  const [transport, setTransport] = useState("");
  const [total, setTotal] = useState(0);

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    const product = { ...updatedProducts[index] };
  
    // Update the value in the state first
    if (name === "description") {
      const selectedProduct = productData.find(product => product.product === value);
      product.description = value;
      product.hsm = selectedProduct ? selectedProduct.hsm : "";
    } else if (name === "qty" || name === "rate") {
      // Update qty or rate first
      product[name] = value;
    } else {
      product[name] = value;
    }
  
    // Recalculate amount if qty or rate changes
    if (name === "qty" || name === "rate") {
      const qty = parseFloat(product.qty) || 0;
      const rate = parseFloat(product.rate) || 0;
      product.amount = qty * rate;
    }
  
    updatedProducts[index] = product;
  
    // Update the products state
    setProducts(updatedProducts);
  
    // Recalculate total
    const newTotal = updatedProducts.reduce((acc, product) => {
      return acc + (parseFloat(product.amount) || 0);
    }, 0);
    setTotal(newTotal);
  };

  const addProduct = () => {
    setProducts([...products, { description: "", hsm: "", package: "", qty: "", unit: "", rate: "", amount: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentBillNumber = parseInt(localStorage.getItem('currentBillNumber') || '0', 10);
    const newBillNumber = currentBillNumber + 1;
    localStorage.setItem('currentBillNumber', newBillNumber.toString());
    onCreateBill({ customer, products, date, transport, total });
  };

  return (
    <div className="create-bill-container">
      <h1 className="header">Best Agencies</h1>
      <form onSubmit={handleSubmit} className="bill-form">
        <div className="section">
          <h2>Customer Details</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <select
              id="name"
              name="name"
              value={customer.name}
              onChange={handleCustomerChange}
              required
            >
              <option value="" disabled>Select Customer</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={customer.address}
              onChange={handleCustomerChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone (Optional)</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={customer.phone}
              onChange={handleCustomerChange}
            />
          </div>
        </div>

        <div className="section">
          <h2>Product Details</h2>
          {products.map((product, index) => (
            <div key={index} className="product-group">
              <div className="form-group">
                <label htmlFor={`description-${index}`}>Description</label>
                <select
                  id={`description-${index}`}
                  name="description"
                  value={product.description}
                  onChange={(e) => handleProductChange(index, e)}
                  required
                >
                  <option value="" disabled>Select Product</option>
                  {productData.map((item, idx) => (
                    <option key={idx} value={item.product}>
                      {item.product}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor={`hsm-${index}`}>HSM Code</label>
                <input
                  type="text"
                  id={`hsm-${index}`}
                  name="hsm"
                  value={product.hsm}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label htmlFor={`package-${index}`}>Package</label>
                <input
                  type="text"
                  id={`package-${index}`}
                  name="package"
                  value={product.package}
                  onChange={(e) => handleProductChange(index, e)}
                />
              </div>

              <div className="form-group">
                <label htmlFor={`qty-${index}`}>Qty</label>
                <input
                  type="number"
                  id={`qty-${index}`}
                  name="qty"
                  value={product.qty}
                  onChange={(e) => handleProductChange(index, e)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor={`unit-${index}`}>Unit</label>
                <select
                  id={`unit-${index}`}
                  name="unit"
                  value={product.unit}
                  onChange={(e) => handleProductChange(index, e)}
                >
                  <option value="" disabled>Select Unit</option>
                  {unitOptions.map((unit, idx) => (
                    <option key={idx} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor={`rate-${index}`}>Rate</label>
                <input
                  type="number"
                  id={`rate-${index}`}
                  name="rate"
                  value={product.rate}
                  onChange={(e) => handleProductChange(index, e)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor={`amount-${index}`}>Amount</label>
                <input
                  type="number"
                  id={`amount-${index}`}
                  name="amount"
                  value={product.amount}
                  readOnly
                />
              </div>

              {products.length > 1 && (
                <button
                  type="button"
                  className="remove-product-btn"
                  onClick={() => setProducts(products.filter((_, i) => i !== index))}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" className="add-product-btn" onClick={addProduct}>
            Add Another Product
          </button>
        </div>

        <div className="section">
          <h2>Bill Information</h2>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="transport">Transport</label>
            <input
              type="text"
              id="transport"
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
              required
            />
          </div>
          <div className="form-group total">
            <label>Total</label>
            <input type="number" value={total} readOnly />
          </div>
        </div>

        <button type="submit" className="generate-bill-btn">Generate Bill</button>
      </form>
    </div>
  );
};

export default CreateBill;
