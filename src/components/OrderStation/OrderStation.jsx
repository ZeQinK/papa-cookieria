import React, { useState } from 'react';

const OrderStation = ({ onOrderTaken, onNext }) => {
  const [customer, setCustomer] = useState(null);

  const generateCustomer = () => {
    setCustomer({
      name: "Cyber Sue",
      order: {
        dough: "Chocolate Chip",
        topping: "Sprinkles",
        timeLimit: 30
      }
    });
  };

  const takeOrder = () => {
    if (customer) {
      onOrderTaken(customer.order);
      setCustomer(null);
      // Automatically jump to bake station for demo purposes
      onNext();
    }
  };

  return (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
      <h2 style={{color: 'var(--accent-primary)', fontSize: '3rem', textShadow: '2px 2px 0px #0f172a'}}>Order Station</h2>
      {!customer ? (
        <button className="start-btn" style={{marginTop: '30px'}} onClick={generateCustomer}>Wait for Customer</button>
      ) : (
        <div style={{background: '#f8fafc', padding: '30px', border: 'var(--border-thick)', borderRadius: '16px', margin: '30px auto', maxWidth: '400px', boxShadow: 'var(--shadow-chunky)'}}>
          <h3 style={{fontSize: '2rem', marginBottom: '10px'}}>{customer.name} is here!</h3>
          <p style={{fontSize: '1.2rem'}}><strong>Wants:</strong> {customer.order.dough} cookie with {customer.order.topping}</p>
          <button className="start-btn" onClick={takeOrder} style={{background: 'var(--cookie-primary)', width: '100%', marginTop: '20px'}}>Take Order Ticket</button>
        </div>
      )}
    </div>
  );
};

export default OrderStation;
