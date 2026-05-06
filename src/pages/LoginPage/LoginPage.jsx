import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '../../context/GameStateContext';
import './LoginPage.css';

const LoginPage = () => {
  const { updatePlayerData } = useGameState();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    petName: '',
    favoriteHobby: '',
  });

  const [showCookieDialog, setShowCookieDialog] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.petName && formData.favoriteHobby) {
      setShowCookieDialog(true);
    }
  };

  const handleAcceptCookies = (accepted) => {
    updatePlayerData({
      ...formData,
      agreedToCookies: accepted
    });
    navigate('/game');
  };

  return (
    <div className="login-container">
      <div className="cartoon-panel login-panel">
        <h1 className="title-text">Cyber Cookieria</h1>
        <p className="subtitle-text">Baking the world's most connected cookies!</p>
        
        {!showCookieDialog ? (
          <form className="login-form" onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label>Baker Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Your name" />
            </div>
            
            <div className="form-group">
              <label>First Pet's Name (For Security!)</label>
              <input type="text" name="petName" value={formData.petName} onChange={handleInputChange} required placeholder="e.g. Fluffy" />
            </div>
            
            <div className="form-group">
              <label>Your Favorite Hobby</label>
              <input type="text" name="favoriteHobby" value={formData.favoriteHobby} onChange={handleInputChange} required placeholder="e.g. Gaming" />
            </div>
            
            <button type="submit" className="start-btn">Start Baking!</button>
          </form>
        ) : (
          <div className="cookie-dialog">
            <h2>Hang On!</h2>
            <p>To improve your baking experience, we use tracking cookies.</p>
            <p className="small-text">
              By clicking "Accept", you agree to let us store your preferences, like your love for <strong>{formData.favoriteHobby}</strong> and your pet <strong>{formData.petName}</strong>, to serve you better!
            </p>
            <div className="cookie-actions">
              <button 
                onClick={() => handleAcceptCookies(true)} 
                className="accept-btn"
              >
                ACCEPT COOKIES!
              </button>
              <button 
                onClick={() => handleAcceptCookies(false)} 
                className="decline-btn"
              >
                No thanks, I don't like good experiences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
