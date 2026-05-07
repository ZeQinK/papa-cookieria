import React, { useState } from 'react';

const CUSTOMERS = [
  { name: "Cyber Sue", avatar: "👩‍💻" },
  { name: "Hacker Hank", avatar: "🧑‍💻" },
  { name: "Phishy Phil", avatar: "🐟" },
  { name: "Malware Mary", avatar: "👾" },
  { name: "Firewall Frank", avatar: "🔥" },
  { name: "Cookie Carl", avatar: "🍪" },
  { name: "Pixel Pete", avatar: "🕹️" },
  { name: "Debugger Dee", avatar: "🐛" },
];

const DOUGH_TYPES = [
  "Chocolate Chip",
  "Sugar Cookie",
  "Peanut Butter",
  "Oatmeal Raisin",
  "Double Chocolate",
];

const TOPPING_OPTIONS = [
  "Sprinkles",
  "Chocolate Chip",
];

const generateOrder = () => {
  const customer = CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];
  const dough = DOUGH_TYPES[Math.floor(Math.random() * DOUGH_TYPES.length)];

  // Randomly pick 1 or 2 topping types, each with a random count (1-5)
  const numToppingTypes = Math.random() > 0.4 ? 2 : 1;
  const shuffledToppings = [...TOPPING_OPTIONS].sort(() => Math.random() - 0.5);
  const selectedToppings = shuffledToppings.slice(0, numToppingTypes);

  const toppings = selectedToppings.map(t => ({
    name: t,
    count: Math.floor(Math.random() * 5) + 1, // 1 to 5
  }));

  return {
    customer,
    order: {
      dough,
      toppings,
      timeLimit: 30,
    }
  };
};

const OrderStation = ({ onOrderTaken, onNext }) => {
  const [customer, setCustomer] = useState(null);

  const generateCustomer = () => {
    const data = generateOrder();
    setCustomer(data);
  };

  const takeOrder = () => {
    if (customer) {
      onOrderTaken(customer.order);
      setCustomer(null);
      onNext();
    }
  };

  const formatToppings = (toppings) => {
    return toppings.map(t => `${t.count}× ${t.name}`).join(', ');
  };

  return (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
      <h2 style={{color: 'var(--accent-primary)', fontSize: '3rem', textShadow: '2px 2px 0px #0f172a'}}>Order Station</h2>
      {!customer ? (
        <button className="start-btn" style={{marginTop: '30px'}} onClick={generateCustomer}>Wait for Customer</button>
      ) : (
        <div style={{background: '#f8fafc', padding: '30px', border: 'var(--border-thick)', borderRadius: '16px', margin: '30px auto', maxWidth: '400px', boxShadow: 'var(--shadow-chunky)'}}>
          <div style={{fontSize: '4rem', marginBottom: '10px'}}>{customer.customer.avatar}</div>
          <h3 style={{fontSize: '2rem', marginBottom: '10px'}}>{customer.customer.name} is here!</h3>
          <div style={{textAlign: 'left', background: '#fff7ed', padding: '15px', borderRadius: '12px', border: '3px dashed var(--cookie-primary)', marginBottom: '15px'}}>
            <p style={{fontSize: '1.2rem', margin: '5px 0'}}><strong>🍪 Dough:</strong> {customer.order.dough}</p>
            <p style={{fontSize: '1.2rem', margin: '5px 0'}}><strong>🎨 Toppings:</strong> {formatToppings(customer.order.toppings)}</p>
          </div>
          <button className="start-btn" onClick={takeOrder} style={{background: 'var(--cookie-primary)', width: '100%', marginTop: '10px'}}>Take Order Ticket</button>
        </div>
      )}
    </div>
  );
};

export default OrderStation;
