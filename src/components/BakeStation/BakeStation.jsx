import React, { useState, useEffect } from 'react';

const BakeStation = ({ currentOrder, onBakeStart, onBakeComplete, onNext }) => {
  const [baking, setBaking] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;
    if (baking && progress < 100) {
      timer = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(timer);
            return 100;
          }
          return p + 5;
        });
      }, 300); // Bake takes ~6 seconds to hit 100
    }
    return () => clearInterval(timer);
  }, [baking, progress]);

  const startBaking = () => {
    setBaking(true);
    setProgress(0);
    if (onBakeStart) onBakeStart();
  };

  const finishBaking = () => {
    setBaking(false);
    onBakeComplete([{ quality: progress >= 80 ? 'perfect' : 'raw' }]);
    onNext();
  };

  return (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
      <h2 style={{color: 'var(--cookie-primary)', fontSize: '3rem', textShadow: '2px 2px 0px #0f172a'}}>Bake Station</h2>
      {!currentOrder ? (
         <p style={{fontSize: '1.5rem', marginTop: '30px', fontWeight: 'bold'}}>No order ticket! Go back to Order Station.</p>
      ) : (
        <div style={{margin: '30px auto', maxWidth: '400px', background: '#f8fafc', padding: '30px', border: 'var(--border-thick)', borderRadius: '16px', boxShadow: 'var(--shadow-chunky)'}}>
           <p style={{fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '20px'}}>Current Order: {currentOrder.dough}</p>
           
           <div style={{height: '40px', background: '#e2e8f0', borderRadius: '20px', border: 'var(--border-thick)', margin: '20px 0', overflow: 'hidden', position: 'relative'}}>
             <div style={{height: '100%', width: `${progress}%`, background: progress < 100 ? 'var(--cookie-primary)' : 'var(--danger)', transition: 'width 0.3s linear'}} />
             <div style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: progress > 50 ? '#fff' : '#000' }}>
               {progress}%
             </div>
           </div>

           {!baking && progress === 0 && <button className="start-btn" style={{width: '100%'}} onClick={startBaking}>Put in Oven!</button>}
           {baking && progress < 100 && <button className="start-btn" onClick={finishBaking} style={{background: 'var(--accent-secondary)', width: '100%'}}>Pull Out Early!</button>}
           {progress === 100 && <button className="start-btn" onClick={finishBaking} style={{background: 'var(--danger)', width: '100%'}}>Take it out! (Burnt?)</button>}
        </div>
      )}
    </div>
  );
};

export default BakeStation;
