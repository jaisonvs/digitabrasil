import React from 'react';
import './RealisticHands.css';

const RealisticHands = ({ activeFinger, currentKey, showHands = true }) => {
  const fingerColors = {
    'left-pinky': '#FF6B6B',
    'left-ring': '#4ECDC4',
    'left-middle': '#45B7D1',
    'left-index': '#96CEB4',
    'right-index': '#FFEAA7',
    'right-middle': '#DDA0DD',
    'right-ring': '#98D8C8',
    'right-pinky': '#F7DC6F',
    'thumbs': '#BB8FCE'
  };

  const getFingerClass = (finger) => {
    let className = 'realistic-finger';
    if (activeFinger === finger) {
      className += ' active';
    }
    return className;
  };

  const getHandPosition = () => {
    // Posição base das mãos sobre o teclado - ajustada para melhor precisão
    return {
      leftHand: {
        x: '20%',
        y: '75%',
        rotation: '-12deg'
      },
      rightHand: {
        x: '70%',
        y: '75%',
        rotation: '12deg'
      }
    };
  };

  if (!showHands) return null;

  const handPosition = getHandPosition();

  return (
    <div className="realistic-hands-overlay">
      {/* Mão Esquerda */}
      <div 
        className="realistic-hand left-hand"
        style={{
          left: handPosition.leftHand.x,
          top: handPosition.leftHand.y,
          transform: `rotate(${handPosition.leftHand.rotation})`
        }}
      >
        {/* Palma da mão */}
        <div className="palm left-palm"></div>
        
        {/* Polegar */}
        <div className="thumb left-thumb"></div>
        
        {/* Dedos */}
        <div 
          className={getFingerClass('left-pinky')}
          style={{ '--finger-color': fingerColors['left-pinky'] }}
        >
          <div className="finger-base"></div>
          <div className="finger-middle"></div>
          <div className="finger-tip"></div>
          <div className="finger-nail"></div>
        </div>
        
        <div 
          className={getFingerClass('left-ring')}
          style={{ '--finger-color': fingerColors['left-ring'] }}
        >
          <div className="finger-base"></div>
          <div className="finger-middle"></div>
          <div className="finger-tip"></div>
          <div className="finger-nail"></div>
        </div>
        
        <div 
          className={getFingerClass('left-middle')}
          style={{ '--finger-color': fingerColors['left-middle'] }}
        >
          <div className="finger-base"></div>
          <div className="finger-middle"></div>
          <div className="finger-tip"></div>
          <div className="finger-nail"></div>
        </div>
        
        <div 
          className={getFingerClass('left-index')}
          style={{ '--finger-color': fingerColors['left-index'] }}
        >
          <div className="finger-base"></div>
          <div className="finger-middle"></div>
          <div className="finger-tip"></div>
          <div className="finger-nail"></div>
        </div>
      </div>

      {/* Mão Direita */}
      <div 
        className="realistic-hand right-hand"
        style={{
          left: handPosition.rightHand.x,
          top: handPosition.rightHand.y,
          transform: `rotate(${handPosition.rightHand.rotation})`
        }}
      >
        {/* Palma da mão */}
        <div className="palm right-palm"></div>
        
        {/* Polegar */}
        <div className="thumb right-thumb"></div>
        
        {/* Dedos */}
        <div 
          className={getFingerClass('right-index')}
          style={{ '--finger-color': fingerColors['right-index'] }}
        >
          <div className="finger-base"></div>
          <div className="finger-middle"></div>
          <div className="finger-tip"></div>
          <div className="finger-nail"></div>
        </div>
        
        <div 
          className={getFingerClass('right-middle')}
          style={{ '--finger-color': fingerColors['right-middle'] }}
        >
          <div className="finger-base"></div>
          <div className="finger-middle"></div>
          <div className="finger-tip"></div>
          <div className="finger-nail"></div>
        </div>
        
        <div 
          className={getFingerClass('right-ring')}
          style={{ '--finger-color': fingerColors['right-ring'] }}
        >
          <div className="finger-base"></div>
          <div className="finger-middle"></div>
          <div className="finger-tip"></div>
          <div className="finger-nail"></div>
        </div>
        
        <div 
          className={getFingerClass('right-pinky')}
          style={{ '--finger-color': fingerColors['right-pinky'] }}
        >
          <div className="finger-base"></div>
          <div className="finger-middle"></div>
          <div className="finger-tip"></div>
          <div className="finger-nail"></div>
        </div>
      </div>

      {/* Sombra das mãos */}
      <div className="hands-shadow"></div>

      {/* Indicador de tecla atual */}
      {currentKey && (
        <div className="current-key-indicator">
          <div className="key-highlight">{currentKey}</div>
          <div className="key-arrow">↑</div>
        </div>
      )}
    </div>
  );
};

export default RealisticHands; 