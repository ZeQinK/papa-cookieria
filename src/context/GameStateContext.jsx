import React, { createContext, useState, useContext } from 'react';

const GameStateContext = createContext();

export const GameStateProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState({
    name: '',
    petName: '',
    favoriteHobby: '',
    agreedToCookies: false,
  });

  const [gameState, setGameState] = useState({
    level: 1,
    points: 0,
    money: 0,
    day: 1,
  });

  const [hasSeenAdwareEdu, setHasSeenAdwareEdu] = useState(false);
  const [hasSeenFilelessEdu, setHasSeenFilelessEdu] = useState(false);

  const updatePlayerData = (data) => {
    setPlayerData(prev => ({ ...prev, ...data }));
  };

  const updateGameState = (data) => {
    setGameState(prev => ({ ...prev, ...data }));
  };

  return (
    <GameStateContext.Provider value={{
      playerData, updatePlayerData,
      gameState, updateGameState,
      hasSeenAdwareEdu, setHasSeenAdwareEdu,
      hasSeenFilelessEdu, setHasSeenFilelessEdu
    }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => useContext(GameStateContext);
