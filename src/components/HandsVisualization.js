import React from 'react';
import './HandsVisualization.css';

const HandsVisualization = ({ activeFinger, showHands = true }) => {
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
    let className = 'finger';
    if (activeFinger === finger) {
      className += ' active';
    }
    return className;
  };

  if (!showHands) return null;

  return (
    <div className="hands-visualization">
      <h3>Posição das Mãos</h3>
      
      <div className="hands-container">
        {/* Mão Esquerda */}
        <div className="hand left-hand">
          <div className="hand-label">Mão Esquerda</div>
          <div className="hand-outline">
            {/* Polegar */}
            <div className="thumb left-thumb"></div>
            
            {/* Dedos */}
            <div 
              className={getFingerClass('left-pinky')}
              style={{ '--finger-color': fingerColors['left-pinky'] }}
            >
              <div className="finger-tip"></div>
              <div className="finger-name">Mindinho</div>
            </div>
            
            <div 
              className={getFingerClass('left-ring')}
              style={{ '--finger-color': fingerColors['left-ring'] }}
            >
              <div className="finger-tip"></div>
              <div className="finger-name">Anelar</div>
            </div>
            
            <div 
              className={getFingerClass('left-middle')}
              style={{ '--finger-color': fingerColors['left-middle'] }}
            >
              <div className="finger-tip"></div>
              <div className="finger-name">Médio</div>
            </div>
            
            <div 
              className={getFingerClass('left-index')}
              style={{ '--finger-color': fingerColors['left-index'] }}
            >
              <div className="finger-tip"></div>
              <div className="finger-name">Indicador</div>
            </div>
          </div>
        </div>

        {/* Mão Direita */}
        <div className="hand right-hand">
          <div className="hand-label">Mão Direita</div>
          <div className="hand-outline">
            {/* Polegar */}
            <div className="thumb right-thumb"></div>
            
            {/* Dedos */}
            <div 
              className={getFingerClass('right-index')}
              style={{ '--finger-color': fingerColors['right-index'] }}
            >
              <div className="finger-tip"></div>
              <div className="finger-name">Indicador</div>
            </div>
            
            <div 
              className={getFingerClass('right-middle')}
              style={{ '--finger-color': fingerColors['right-middle'] }}
            >
              <div className="finger-tip"></div>
              <div className="finger-name">Médio</div>
            </div>
            
            <div 
              className={getFingerClass('right-ring')}
              style={{ '--finger-color': fingerColors['right-ring'] }}
            >
              <div className="finger-tip"></div>
              <div className="finger-name">Anelar</div>
            </div>
            
            <div 
              className={getFingerClass('right-pinky')}
              style={{ '--finger-color': fingerColors['right-pinky'] }}
            >
              <div className="finger-tip"></div>
              <div className="finger-name">Mindinho</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hands-instructions">
        <h4>Posição Correta:</h4>
        <ul>
          <li><strong>Indicador esquerdo</strong> na tecla <strong>F</strong></li>
          <li><strong>Indicador direito</strong> na tecla <strong>J</strong></li>
          <li>Outros dedos nas teclas adjacentes</li>
          <li>Polegares sobre a barra de espaço</li>
          <li>Mantenha os pulsos retos e relaxados</li>
        </ul>
      </div>

      <div className="finger-positions">
        <h4>Áreas de Responsabilidade:</h4>
        <div className="position-grid">
          <div className="position-item">
            <span className="position-color" style={{ backgroundColor: fingerColors['left-pinky'] }}></span>
            <span>Mindinho Esquerdo: Q, A, Z</span>
          </div>
          <div className="position-item">
            <span className="position-color" style={{ backgroundColor: fingerColors['left-ring'] }}></span>
            <span>Anelar Esquerdo: W, S, X</span>
          </div>
          <div className="position-item">
            <span className="position-color" style={{ backgroundColor: fingerColors['left-middle'] }}></span>
            <span>Médio Esquerdo: E, D, C</span>
          </div>
          <div className="position-item">
            <span className="position-color" style={{ backgroundColor: fingerColors['left-index'] }}></span>
            <span>Indicador Esquerdo: R, F, V, T, G, B</span>
          </div>
          <div className="position-item">
            <span className="position-color" style={{ backgroundColor: fingerColors['right-index'] }}></span>
            <span>Indicador Direito: Y, H, N, U, J, M</span>
          </div>
          <div className="position-item">
            <span className="position-color" style={{ backgroundColor: fingerColors['right-middle'] }}></span>
            <span>Médio Direito: I, K, ,</span>
          </div>
          <div className="position-item">
            <span className="position-color" style={{ backgroundColor: fingerColors['right-ring'] }}></span>
            <span>Anelar Direito: O, L, .</span>
          </div>
          <div className="position-item">
            <span className="position-color" style={{ backgroundColor: fingerColors['right-pinky'] }}></span>
            <span>Mindinho Direito: P, ;, /</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandsVisualization; 