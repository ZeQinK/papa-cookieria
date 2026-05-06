import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '../../context/GameStateContext';
import './AdwarePopup.css';

const AdwarePopup = ({ onClose }) => {
  const { playerData } = useGameState();
  const navigate = useNavigate();
  const [position, setPosition] = useState({ top: '20%', left: '20%' });

  useEffect(() => {
    setPosition({
      top: `${10 + Math.random() * 40}%`,
      left: `${10 + Math.random() * 40}%`
    });
  }, []);

  const handleClick = () => {
    navigate('/edu/adware');
  };

  // If user accepted cookies, use their PII for targeted ads. Otherwise, generic.
  const usePII = playerData.agreedToCookies;

  return (
    <div className="adware-overlay">
      <div className="adware-container" style={{ top: position.top, left: position.left }}>
        <div className="adware-header">
          <span>!!! SYSTEM ALERT !!!</span>
          <button className="adware-close" onClick={handleClick}>✕</button>
        </div>
        <div className="adware-body">
          <h3 className="adware-flash">🎉 YOU WON! 🎉</h3>
          {usePII ? (
            <p>Your pet <strong>{playerData.petName}</strong> needs the ultimate <strong>{playerData.favoriteHobby}</strong> package! We know everything about you!</p>
          ) : (
            <p>Congratulations! You've been selected for a FREE mystery prize! Click below to claim your reward NOW!</p>
          )}
          <button className="adware-btn" onClick={handleClick}>CLAIM NOW!</button>
        </div>
      </div>
    </div>
  );
};

export default AdwarePopup;
