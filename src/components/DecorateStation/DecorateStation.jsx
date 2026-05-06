import React, { useState } from 'react';

const DecorateStation = ({ bakedCookies, onDecorateComplete, onNext }) => {
  const [toppings, setToppings] = useState([]);

  const addTopping = (topping) => {
    if (!toppings.includes(topping)) {
        setToppings([...toppings, topping]);
    }
  };

  const finishDecorating = () => {
    onDecorateComplete([{ ...bakedCookies[0], toppings }]);
    setToppings([]);
    onNext();
  };

  return (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
      <h2 style={{color: 'var(--accent-secondary)', fontSize: '3rem', textShadow: '2px 2px 0px #0f172a'}}>Decorate Station</h2>
      {bakedCookies.length === 0 ? (
        <p style={{fontSize: '1.5rem', marginTop: '30px', fontWeight: 'bold'}}>No cookies baked yet!</p>
      ) : (
        <div style={{margin: '30px auto', maxWidth: '500px', background: '#f8fafc', padding: '30px', border: 'var(--border-thick)', borderRadius: '16px', boxShadow: 'var(--shadow-chunky)'}}>
           <div style={{
             width: '250px', height: '250px', borderRadius: '50%', background: bakedCookies[0].quality === 'burnt' ? '#78350f' : bakedCookies[0].quality === 'raw' ? '#fcd34d' : 'var(--cookie-primary)', 
             border: 'var(--border-thick)', margin: '0 auto 30px', position: 'relative', overflow: 'hidden'
           }}>
             {toppings.map((t, i) => (
                <div key={i} style={{
                  position: 'absolute', 
                  top: `${20 + Math.random()*50}%`, 
                  left: `${20 + Math.random()*50}%`,
                  fontSize: '2.5rem'
                }}>{t === 'Sprinkles' ? '✨' : t === 'Chocolate Chip' ? '🍫' : '🍓'}</div>
             ))}
           </div>
           
           <div style={{display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '30px'}}>
              <button className="start-btn" onClick={() => addTopping('Sprinkles')} style={{padding: '12px', fontSize: '1.2rem', marginTop: '0'}}>+ Sprinkles</button>
              <button className="start-btn" onClick={() => addTopping('Chocolate Chip')} style={{padding: '12px', fontSize: '1.2rem', marginTop: '0'}}>+ Choco Chips</button>
           </div>
           <button className="start-btn" style={{background: 'var(--accent-primary)', width: '100%'}} onClick={finishDecorating}>Serve to Customer!</button>
        </div>
      )}
    </div>
  );
};

export default DecorateStation;
