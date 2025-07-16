import React from 'react';
import './VirtualKeyboard.css';

// Layout do teclado brasileiro ABNT2
const keyRows = [
  // Primeira linha - Teclas de função
  ['ESC', '', 'F1', 'F2', 'F3', 'F4', '', 'F5', 'F6', 'F7', 'F8', '', 'F9', 'F10', 'F11', 'F12'],
  
  // Segunda linha - Números e símbolos
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  
  // Terceira linha - Primeira linha de letras
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '´', '[', ']', '\\'],
  
  // Quarta linha - Segunda linha de letras
  ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç', '~', '^', 'Enter'],
  
  // Quinta linha - Terceira linha de letras
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', ';', '/', 'Shift'],
  
  // Sexta linha - Teclas de controle
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Win', 'Menu', 'Ctrl']
];

// Mapeamento de dedos para cada tecla (posição home)
const fingerMapping = {
  // Mão esquerda
  'A': 'left-pinky', 'S': 'left-ring', 'D': 'left-middle', 'F': 'left-index',
  'Q': 'left-pinky', 'W': 'left-ring', 'E': 'left-middle', 'R': 'left-index',
  'Z': 'left-pinky', 'X': 'left-ring', 'C': 'left-middle', 'V': 'left-index',
  
  // Mão direita
  'J': 'right-index', 'K': 'right-middle', 'L': 'right-ring', 'Ç': 'right-pinky',
  'U': 'right-index', 'I': 'right-middle', 'O': 'right-ring', 'P': 'right-pinky',
  'M': 'right-index', ',': 'right-middle', '.': 'right-ring', ';': 'right-pinky',
  
  // Números e símbolos - mão esquerda
  '1': 'left-pinky', '2': 'left-ring', '3': 'left-middle', '4': 'left-index', '5': 'left-index',
  '`': 'left-pinky', 'Tab': 'left-pinky', 'Caps': 'left-pinky', 'Shift': 'left-pinky',
  'Ctrl': 'left-pinky', 'Alt': 'left-pinky', 'Win': 'left-pinky',
  
  // Números e símbolos - mão direita
  '6': 'right-index', '7': 'right-index', '8': 'right-middle', '9': 'right-ring', '0': 'right-pinky',
  '-': 'right-pinky', '=': 'right-pinky', '[': 'right-pinky', ']': 'right-pinky', '\\': 'right-pinky',
  '´': 'right-pinky', '~': 'right-pinky', '^': 'right-pinky', 'Enter': 'right-pinky',
  'Menu': 'right-pinky',
  
  // Letras adicionais - mão esquerda
  'G': 'left-index', 'B': 'left-index',
  
  // Letras adicionais - mão direita
  'H': 'right-index', 'N': 'right-index',
  
  // Pontuação - mão direita
  '/': 'right-pinky',
  
  // Teclas especiais
  'Space': 'thumbs', 'Backspace': 'right-pinky', 'ESC': 'left-pinky'
};

function normalizeKey(key) {
  if (!key) return '';
  
  // Teclas especiais
  if (key === 'Backspace') return 'Backspace';
  if (key === ' ') return 'Space';
  if (key === 'Enter') return 'Enter';
  if (key === 'Tab') return 'Tab';
  if (key === 'CapsLock') return 'Caps';
  if (key === 'Shift' || key === 'ShiftLeft' || key === 'ShiftRight') return 'Shift';
  if (key === 'Control' || key === 'ControlLeft' || key === 'ControlRight') return 'Ctrl';
  if (key === 'Alt' || key === 'AltLeft' || key === 'AltRight') return 'Alt';
  if (key === 'Meta' || key === 'MetaLeft' || key === 'MetaRight') return 'Win';
  if (key === 'ContextMenu') return 'Menu';
  if (key === 'Escape') return 'ESC';
  
  // Teclas de função
  if (key.startsWith('F') && key.length <= 3) return key;
  
  // Caracteres especiais brasileiros
  if (key === '´' || key === '`') return '´';
  if (key === '~') return '~';
  if (key === '^') return '^';
  if (key === 'ç' || key === 'Ç') return 'Ç';
  
  // Caracteres de pontuação
  if (key === ',') return ',';
  if (key === '.') return '.';
  if (key === ';') return ';';
  if (key === '/') return '/';
  if (key === '[') return '[';
  if (key === ']') return ']';
  if (key === '\\') return '\\';
  if (key === '-') return '-';
  if (key === '=') return '=';
  
  // Números
  if (/^[0-9]$/.test(key)) return key;
  
  // Letras - converter para maiúscula
  if (key.length === 1 && /^[a-zA-Z]$/.test(key)) {
    return key.toUpperCase();
  }
  
  return key;
}

const VirtualKeyboard = ({ currentKey }) => {
  const normKey = normalizeKey(currentKey);
  
  return (
    <div className="virtual-keyboard">
      <h3>Teclado Virtual</h3>
      <div className="keyboard-container">
        {keyRows.map((row, i) => (
          <div className="keyboard-row" key={i}>
            {row.map((key, j) => {
              if (!key) {
                return <div key={`spacer-${i}-${j}`} className="keyboard-spacer"></div>;
              }
              
              const fingerClass = fingerMapping[key] ? `${fingerMapping[key]}-position` : '';
              const isHomeKey = ['A', 'S', 'D', 'F', 'J', 'K', 'L', 'Ç'].includes(key);
              const isNext = normKey === key;
              
              return (
                <div
                  key={key + j}
                  className={
                    'keyboard-key' +
                    (key === 'Backspace' ? ' backspace' : '') +
                    (key === 'Tab' ? ' tab' : '') +
                    (key === 'Caps' ? ' caps' : '') +
                    (key === 'Shift' ? ' shift' : '') +
                    (key === 'Enter' ? ' enter' : '') +
                    (key === 'Space' ? ' space' : '') +
                    (key === 'Ctrl' ? ' ctrl' : '') +
                    (key === 'Alt' ? ' alt' : '') +
                    (key === 'Win' ? ' win' : '') +
                    (key === 'Menu' ? ' menu' : '') +
                    (key.startsWith('F') ? ' function' : '') +
                    (key === 'ESC' ? ' escape' : '') +
                    (isHomeKey ? ' home-key' : '') +
                    (fingerClass ? ` ${fingerClass}` : '') +
                    (isNext ? ' active-key' : '')
                  }
                  data-key={key}
                  style={
                    key === 'Space' ? { width: '400px' } : 
                    key === 'Backspace' ? { width: '80px' } :
                    key === 'Tab' ? { width: '60px' } :
                    key === 'Caps' ? { width: '70px' } :
                    key === 'Enter' ? { width: '80px' } :
                    key === 'Shift' ? { width: '90px' } :
                    key === 'Ctrl' ? { width: '60px' } :
                    key === 'Alt' ? { width: '50px' } :
                    key === 'Win' ? { width: '50px' } :
                    key === 'Menu' ? { width: '50px' } :
                    key === 'ESC' ? { width: '50px' } :
                    key.startsWith('F') ? { width: '40px' } : {}
                  }
                >
                  <div className="key-letter">{key}</div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualKeyboard; 