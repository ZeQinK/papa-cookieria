import React, { useState, useMemo } from 'react';

// Pre-compute a grid of non-overlapping positions for emoji placement on the cookie
const generatePositions = (maxSlots) => {
  const positions = [];
  const cols = 4;
  const rows = Math.ceil(maxSlots / cols);
  const cellW = 60 / cols;  // percentage-based grid inside the cookie circle
  const cellH = 60 / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      positions.push({
        top: 20 + r * cellH + cellH * 0.2,
        left: 20 + c * cellW + cellW * 0.2,
      });
    }
  }
  return positions;
};

const MAX_TOPPINGS = 16;
const GRID_POSITIONS = generatePositions(MAX_TOPPINGS);

const DecorateStation = ({ bakedCookies, currentOrder, onDecorateComplete, onNext }) => {
  // Each entry is { type: 'Sprinkles' | 'Chocolate Chip', id: number }
  const [toppings, setToppings] = useState([]);
  const [nextId, setNextId] = useState(0);

  const addTopping = (type) => {
    if (toppings.length >= MAX_TOPPINGS) return; // cap at grid size
    setToppings(prev => [...prev, { type, id: nextId }]);
    setNextId(prev => prev + 1);
  };

  const finishDecorating = () => {
    const toppingNames = toppings.map(t => t.type);
    onDecorateComplete([{ ...bakedCookies[0], toppings: toppingNames }]);
    setToppings([]);
    setNextId(0);
    onNext();
  };

  // Count toppings by type for the order comparison display
  const sprinkleCount = toppings.filter(t => t.type === 'Sprinkles').length;
  const chocoCount = toppings.filter(t => t.type === 'Chocolate Chip').length;

  // Order requirements
  const orderToppings = currentOrder?.toppings || [];
  const getRequired = (name) => {
    const found = orderToppings.find(t => t.name === name);
    return found ? found.count : 0;
  };

  const requiredSprinkles = getRequired('Sprinkles');
  const requiredChoco = getRequired('Chocolate Chip');

  return (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
      <h2 style={{color: 'var(--accent-secondary)', fontSize: '3rem', textShadow: '2px 2px 0px #0f172a'}}>Decorate Station</h2>
      {bakedCookies.length === 0 ? (
        <p style={{fontSize: '1.5rem', marginTop: '30px', fontWeight: 'bold'}}>No cookies baked yet!</p>
      ) : (
        <div style={{margin: '30px auto', maxWidth: '500px', background: '#f8fafc', padding: '30px', border: 'var(--border-thick)', borderRadius: '16px', boxShadow: 'var(--shadow-chunky)'}}>
           {/* Order requirements display */}
           {currentOrder && (
             <div style={{background: '#fff7ed', padding: '12px', borderRadius: '10px', border: '3px dashed var(--cookie-primary)', marginBottom: '20px', textAlign: 'left'}}>
               <p style={{margin: '0 0 5px', fontWeight: '800', fontSize: '1.1rem'}}>📋 Order requires:</p>
               {orderToppings.map((t, i) => {
                 const current = t.name === 'Sprinkles' ? sprinkleCount : chocoCount;
                 const met = current >= t.count;
                 return (
                   <p key={i} style={{margin: '3px 0', fontSize: '1rem', color: met ? 'var(--accent-secondary)' : 'var(--danger)', fontWeight: '700'}}>
                     {met ? '✅' : '⬜'} {t.count}× {t.name} (added: {current})
                   </p>
                 );
               })}
             </div>
           )}

           {/* Cookie visual */}
           <div style={{
              width: '250px', height: '250px', borderRadius: '50%', 
              background: bakedCookies[0].quality === 'burnt' ? '#78350f' : bakedCookies[0].quality === 'raw' ? '#fcd34d' : 'var(--cookie-primary)', 
              border: 'var(--border-thick)', margin: '0 auto 30px', position: 'relative', overflow: 'hidden'
            }}>
              {toppings.map((t, i) => {
                const pos = GRID_POSITIONS[i];
                if (!pos) return null;
                return (
                  <div key={t.id} style={{
                    position: 'absolute', 
                    top: `${pos.top}%`, 
                    left: `${pos.left}%`,
                    fontSize: '1.8rem',
                    transition: 'all 0.2s ease',
                    animation: 'popIn 0.25s ease-out',
                  }}>{t.type === 'Sprinkles' ? '✨' : '🍫'}</div>
                );
              })}
           </div>
           
           {/* Topping buttons with counters */}
           <div style={{display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '30px'}}>
              <button 
                className="start-btn" 
                onClick={() => addTopping('Sprinkles')} 
                style={{padding: '12px', fontSize: '1.2rem', marginTop: '0', position: 'relative'}}
                disabled={toppings.length >= MAX_TOPPINGS}
              >
                + Sprinkles {sprinkleCount > 0 && <span style={{background: 'var(--danger)', color: '#fff', borderRadius: '50%', padding: '2px 8px', fontSize: '0.9rem', marginLeft: '5px'}}>{sprinkleCount}</span>}
              </button>
              <button 
                className="start-btn" 
                onClick={() => addTopping('Chocolate Chip')} 
                style={{padding: '12px', fontSize: '1.2rem', marginTop: '0', position: 'relative'}}
                disabled={toppings.length >= MAX_TOPPINGS}
              >
                + Choco Chips {chocoCount > 0 && <span style={{background: 'var(--danger)', color: '#fff', borderRadius: '50%', padding: '2px 8px', fontSize: '0.9rem', marginLeft: '5px'}}>{chocoCount}</span>}
              </button>
           </div>
           <button className="start-btn" style={{background: 'var(--accent-primary)', width: '100%'}} onClick={finishDecorating}>Serve to Customer!</button>
        </div>
      )}

      <style>{`
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default DecorateStation;
