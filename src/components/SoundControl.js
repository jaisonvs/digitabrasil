import React, { useState, useEffect } from 'react';
import soundManager from './SoundManager';
import './SoundControl.css';

const SoundControl = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    // Carregar preferências salvas
    const savedEnabled = localStorage.getItem('typingSoundEnabled');
    const savedVolume = localStorage.getItem('typingSoundVolume');
    
    if (savedEnabled !== null) {
      const enabled = savedEnabled === 'true';
      setIsEnabled(enabled);
      soundManager.isEnabled = enabled;
    }
    
    if (savedVolume !== null) {
      const vol = parseFloat(savedVolume);
      setVolume(vol);
      soundManager.setVolume(vol);
    }
  }, []);

  const toggleSound = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    soundManager.toggleSound();
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    soundManager.setVolume(newVolume);
  };

  const testSound = () => {
    soundManager.playSound('key');
  };

  return (
    <div className="sound-control">
      <button 
        className="sound-toggle"
        onClick={() => setShowControls(!showControls)}
        aria-label="Controles de som"
      >
        {isEnabled ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9v6h4l5 5V4L7 9H3z" fill="currentColor"/>
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" fill="currentColor"/>
            <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9v6h4l5 5V4L7 9H3z" fill="currentColor"/>
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" fill="currentColor"/>
            <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor"/>
            <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )}
      </button>

      {showControls && (
        <div className="sound-controls">
          <div className="control-group">
            <label className="control-label">
              <input
                type="checkbox"
                checked={isEnabled}
                onChange={toggleSound}
                className="sound-checkbox"
              />
              <span className="checkbox-text">Som de digitação</span>
            </label>
          </div>

          <div className="control-group">
            <label className="control-label">
              Volume
              <div className="volume-control">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                  disabled={!isEnabled}
                />
                <span className="volume-value">{Math.round(volume * 100)}%</span>
              </div>
            </label>
          </div>

          <div className="control-group">
            <button 
              className="test-sound-btn"
              onClick={testSound}
              disabled={!isEnabled}
            >
              Testar Som
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoundControl; 