import React from 'react';
import { useGameState } from '../../context/GameStateContext';

const Evaluation = ({ currentOrder, decoratedCookies, onComplete }) => {
  const { updateGameState, gameState } = useGameState();

  const calculateScore = () => {
    if (!currentOrder || decoratedCookies.length === 0) return 0;

    let score = 100;
    const cookie = decoratedCookies[0];

    // Quality penalty
    if (cookie.quality === 'raw') {
      if (cookie.bakeProgress <= 25) {
        score -= 75;
      } else if (cookie.bakeProgress <= 94) {
        score -= (95 - cookie.bakeProgress);
      } else {
        score -= 50; // fallback
      }
    }
    if (cookie.quality === 'burnt') {
      if (cookie.bakeProgress >= 150) {
        score -= 50;
      } else if (cookie.bakeProgress > 105) {
        score -= (cookie.bakeProgress - 105);
      } else {
        score -= 50; // fallback
      }
    }

    // Topping accuracy: check each required topping
    if (currentOrder.toppings && Array.isArray(currentOrder.toppings)) {
      currentOrder.toppings.forEach(req => {
        const actualCount = cookie.toppings.filter(t => t === req.name).length;
        const diff = Math.abs(actualCount - req.count);
        // Lose 10 points per topping off
        score -= diff * 10;
      });

      // Penalty for extra topping types not in the order
      const orderedNames = currentOrder.toppings.map(t => t.name);
      const extraToppings = cookie.toppings.filter(t => !orderedNames.includes(t));
      score -= extraToppings.length * 5;
    } else {
      // Legacy single-topping format fallback
      if (currentOrder.topping && !cookie.toppings.includes(currentOrder.topping)) {
        score -= 30;
      }
    }

    return Math.max(0, Math.min(100, score));
  };

  const finishDay = () => {
    const score = calculateScore();
    const tips = Math.floor(score / 10);

    const newPoints = gameState.points + score;
    let newLevel = 1;
    for (let n = 2; ; n++) {
      if (newPoints >= Math.pow(n, 1.3) * 100) {
        newLevel = n;
      } else {
        break;
      }
    }

    updateGameState({
      points: newPoints,
      money: gameState.money + tips,
      level: newLevel
    });

    onComplete();
  };

  const hasScore = currentOrder && decoratedCookies.length > 0;
  const score = hasScore ? calculateScore() : 0;

  const getScoreEmoji = (s) => {
    if (s >= 90) return '🌟';
    if (s >= 70) return '😊';
    if (s >= 50) return '😐';
    return '😬';
  };

  const getScoreMessage = (s) => {
    if (s >= 90) return 'Perfect cookie!';
    if (s >= 70) return 'Pretty good!';
    if (s >= 50) return 'Needs improvement...';
    return 'The customer is not happy...';
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2 style={{ color: 'var(--bg-main)', fontSize: '3rem', textShadow: '2px 2px 0px #0f172a' }}>Evaluation</h2>
      {!hasScore ? (
        <p style={{ fontSize: '1.5rem', marginTop: '30px', fontWeight: 'bold' }}>Nothing to evaluate yet!</p>
      ) : (
        <div style={{ background: '#f8fafc', padding: '40px', border: 'var(--border-thick)', borderRadius: '16px', margin: '30px auto', maxWidth: '400px', boxShadow: 'var(--shadow-chunky)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '10px' }}>{getScoreEmoji(score)}</div>
          <h3 style={{ fontSize: '2.5rem', color: 'var(--text-heading)', marginBottom: '5px' }}>Score: {score}%</h3>
          <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '15px', fontWeight: '700' }}>{getScoreMessage(score)}</p>

          <p style={{ fontSize: '1.5rem', margin: '20px 0', fontWeight: '800', color: 'var(--cookie-primary)' }}>
            Tips Earned: ${Math.floor(score / 10)}.00
          </p>

          <button className="start-btn" style={{ background: 'var(--accent-secondary)', width: '100%', marginTop: '20px' }} onClick={finishDay}>Complete Order</button>
        </div>)}
    </div>
  );
};

export default Evaluation;
