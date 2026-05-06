import React, { useState } from 'react';
import { useGameState } from '../../context/GameStateContext';
import OrderStation from '../../components/OrderStation/OrderStation';
import BakeStation from '../../components/BakeStation/BakeStation';
import DecorateStation from '../../components/DecorateStation/DecorateStation';
import Evaluation from '../../components/Evaluation/Evaluation';
import AdwarePopup from '../../components/AdwarePopup/AdwarePopup';
import FakeTerminal from '../../components/FakeTerminal/FakeTerminal';
import './GamePage.css';

const GamePage = () => {
  const { playerData, gameState } = useGameState();
  const [currentStation, setCurrentStation] = useState('order'); // order, bake, decorate, eval
  
  // Game logic state
  const [currentOrder, setCurrentOrder] = useState(null); // The ticket
  const [bakedCookies, setBakedCookies] = useState([]); // from bake -> decorate
  const [decoratedCookies, setDecoratedCookies] = useState([]); // from decorate -> eval

  const [showAdware, setShowAdware] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  const handleOrderTaken = (order) => {
    setCurrentOrder(order);
    if (Math.random() > 0.2) {
      setShowAdware(true);
    }
  };

  const handleBakeStart = () => {
    if (Math.random() > 0.2) {
      setShowTerminal(true);
    }
  };

  return (
    <div className="game-layout">
      {/* Top Header */}
      <header className="game-header">
        <div className="player-info">
          <h2>Level {gameState.level}</h2>
          <span className="player-name">Baker: {playerData.name || 'Guest'}</span>
        </div>
        <div className="game-stats">
          <div className="stat-box">
            <span className="label">Points</span>
            <span className="value">{gameState.points}</span>
          </div>
          <div className="stat-box">
            <span className="label">Tips</span>
            <span className="value">${gameState.money}</span>
          </div>
        </div>
      </header>

      {/* Main Station Area */}
      <main className="station-container">
        {showAdware && <AdwarePopup onClose={() => setShowAdware(false)} />}
        {showTerminal && <FakeTerminal onClose={() => setShowTerminal(false)} />}

        {currentStation === 'order' && <OrderStation onOrderTaken={handleOrderTaken} onNext={() => setCurrentStation('bake')} />}
        {currentStation === 'bake' && <BakeStation currentOrder={currentOrder} onBakeStart={handleBakeStart} onBakeComplete={(cookies) => setBakedCookies(cookies)} onNext={() => setCurrentStation('decorate')} />}
        {currentStation === 'decorate' && <DecorateStation bakedCookies={bakedCookies} onDecorateComplete={(cookies) => setDecoratedCookies(cookies)} onNext={() => setCurrentStation('eval')} />}
        {currentStation === 'eval' && <Evaluation currentOrder={currentOrder} decoratedCookies={decoratedCookies} onComplete={() => setCurrentStation('order')} />}
      </main>

      {/* Bottom Navigation */}
      <nav className="station-nav">
        <button 
          className={`nav-btn ${currentStation === 'order' ? 'active' : ''}`}
          onClick={() => setCurrentStation('order')}
        >
          ORDER
        </button>
        <button 
          className={`nav-btn ${currentStation === 'bake' ? 'active' : ''}`}
          onClick={() => setCurrentStation('bake')}
        >
          BAKE
        </button>
        <button 
          className={`nav-btn ${currentStation === 'decorate' ? 'active' : ''}`}
          onClick={() => setCurrentStation('decorate')}
        >
          DECORATE
        </button>
      </nav>
    </div>
  );
};

export default GamePage;
