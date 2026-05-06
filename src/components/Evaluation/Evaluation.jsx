import React from 'react';
import { useGameState } from '../../context/GameStateContext';

const Evaluation = ({ currentOrder, decoratedCookies, onComplete }) => {
  const { updateGameState, gameState } = useGameState();

  const calculateScore = () => {
    if (!currentOrder || decoratedCookies.length === 0) return 0;
    
    let score = 100;
    const cookie = decoratedCookies[0];
    
    if (cookie.quality === 'raw') score -= 50;
    if (cookie.quality === 'burnt') score -= 50;
    if (!cookie.toppings.includes(currentOrder.topping)) score -= 30;
    
    return Math.max(0, score);
  };

  const finishDay = () => {
    const score = calculateScore();
    const tips = Math.floor(score / 10);
    
    updateGameState({
      points: gameState.points + score,
      money: gameState.money + tips,
      level: gameState.points > 300 ? gameState.level + 1 : gameState.level
    });
    
    onComplete();
  };

  const hasScore = currentOrder && decoratedCookies.length > 0;

  return (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
      <h2 style={{color: 'var(--bg-main)', fontSize: '3rem', textShadow: '2px 2px 0px #0f172a'}}>Evaluation</h2>
      {!hasScore ? (
          <p style={{fontSize: '1.5rem', marginTop: '30px', fontWeight: 'bold'}}>Nothing to evaluate yet!</p>
        ) : (
      <div style={{background: '#f8fafc', padding: '40px', border: 'var(--border-thick)', borderRadius: '16px', margin: '30px auto', maxWidth: '400px', boxShadow: 'var(--shadow-chunky)'}}>
        <h3 style={{fontSize: '2.5rem', color: 'var(--text-heading)', marginBottom: '10px'}}>Score: {calculateScore()}%</h3>
        
        <p style={{fontSize: '1.5rem', margin: '20px 0', fontWeight: '800', color: 'var(--cookie-primary)'}}>
          Tips Earned: ${Math.floor(calculateScore() / 10)}.00
        </p>

        <button className="start-btn" style={{background: 'var(--accent-secondary)', width: '100%', marginTop: '20px'}} onClick={finishDay}>Complete Order</button>
      </div>)}
    </div>
  );
};

export default Evaluation;
