import React, { useState, useEffect, useRef, useMemo } from 'react';
import './TypingExercise.css';
import HandCSS from './HandCSS';
import VirtualKeyboard from './VirtualKeyboard';
import soundManager from './SoundManager';

const TypingExercise = () => {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [errors, setErrors] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [showResults, setShowResults] = useState(false);
  const [currentKey, setCurrentKey] = useState('');
  const [activeFinger, setActiveFinger] = useState('');
  const inputRef = useRef(null);

  const sampleTexts = useMemo(() => [
    "A digitação é uma habilidade essencial no mundo moderno. Com a prática constante, você pode melhorar significativamente sua velocidade e precisão. Lembre-se de manter uma postura adequada e usar todos os dedos das mãos.",
    "O teclado é uma ferramenta poderosa que conecta nossos pensamentos ao mundo digital. Cada tecla pressionada é um passo em direção à comunicação eficiente. Pratique diariamente para desenvolver a memória muscular.",
    "A velocidade de digitação é medida em palavras por minuto. Para calcular sua velocidade, divida o número de palavras pelo tempo gasto em minutos. A precisão é tão importante quanto a velocidade.",
    "Os dedos indicadores devem ficar nas teclas F e J, que possuem pequenas saliências para orientação. Esta é a posição base para uma digitação eficiente e sem olhar para o teclado."
  ], []);

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    setText(sampleTexts[currentTextIndex]);
  }, [currentTextIndex, sampleTexts]);

  const startTyping = () => {
    setStartTime(Date.now());
    setIsTyping(true);
    setUserInput('');
    setErrors(0);
    setShowResults(false);
    setWpm(0);
    setAccuracy(100);
    setCurrentKey('');
    setActiveFinger('');
    inputRef.current.focus();
    soundManager.playSound('special');
  };

  const getFingerForKey = (key) => {
    const keyMap = {
      // Primeira linha - números e símbolos
      '`': 'left-pinky', '1': 'left-pinky', '2': 'left-ring', '3': 'left-middle', '4': 'left-index', '5': 'left-index',
      '6': 'right-index', '7': 'right-index', '8': 'right-middle', '9': 'right-ring', '0': 'right-pinky', '-': 'right-pinky', '=': 'right-pinky',
      
      // Segunda linha - letras superiores
      'q': 'left-pinky', 'w': 'left-ring', 'e': 'left-middle', 'r': 'left-index', 't': 'left-index',
      'y': 'right-index', 'u': 'right-index', 'i': 'right-middle', 'o': 'right-ring', 'p': 'right-pinky',
      
      // Terceira linha - letras do meio
      'a': 'left-pinky', 's': 'left-ring', 'd': 'left-middle', 'f': 'left-index', 'g': 'left-index',
      'h': 'right-index', 'j': 'right-index', 'k': 'right-middle', 'l': 'right-ring', ';': 'right-pinky', "'": 'right-pinky',
      
      // Quarta linha - letras inferiores
      'z': 'left-pinky', 'x': 'left-ring', 'c': 'left-middle', 'v': 'left-index', 'b': 'left-index',
      'n': 'right-index', 'm': 'right-index', ',': 'right-middle', '.': 'right-ring', '/': 'right-pinky',
      
      // Caracteres especiais brasileiros
      '´': 'right-pinky', '~': 'right-pinky', '^': 'right-pinky', 'ç': 'right-pinky', 'Ç': 'right-pinky',
      
      // Teclas especiais
      ' ': 'thumbs', 'Backspace': 'right-pinky', 'Enter': 'right-pinky', 'Tab': 'left-pinky',
      'Shift': 'left-pinky', 'CapsLock': 'left-pinky', 'Ctrl': 'left-pinky', 'Alt': 'left-pinky',
      'Escape': 'left-pinky'
    };
    return keyMap[key.toLowerCase()] || null;
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const previousLength = userInput.length;
    setUserInput(value);

    if (!isTyping && value.length > 0) {
      startTyping();
    }

    // Reproduzir som baseado no tipo de entrada
    if (value.length > previousLength) {
      // Verificar se é um erro
      const currentIndex = previousLength;
      if (currentIndex < text.length && value[currentIndex] !== text[currentIndex]) {
        soundManager.playSound('error');
      } else {
        soundManager.playSound('key');
      }
    } else if (value.length < previousLength) {
      // Backspace ou delete
      soundManager.playSound('special');
    }

    // Mostrar dedo para a próxima letra do texto
    if (value.length < text.length) {
      const nextChar = text[value.length];
      setCurrentKey(nextChar);
      
      // Mostrar posição do dedo para a próxima letra
      const finger = getFingerForKey(nextChar);
      if (finger) {
        setActiveFinger(finger);
      }
    } else {
      setCurrentKey('');
      setActiveFinger('');
    }

    // Contar erros
    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== text[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);

    // Verificar se terminou
    if (value.length === text.length) {
      const endTime = Date.now();
      setEndTime(endTime);
      setIsTyping(false);
      calculateResults(endTime);
      setShowResults(true);
      setCurrentKey('');
      setActiveFinger('');
      soundManager.playSound('complete');
    }
  };

  const handleKeyDown = (e) => {
    if (showResults) return;
    
    // Reproduzir som para teclas especiais
    const specialKeys = ['Enter', 'Backspace', 'Tab', 'Shift', 'Control', 'Alt', 'Meta'];
    if (specialKeys.includes(e.key)) {
      soundManager.playSound('special');
    }
    
    // Mostrar posição do dedo para a próxima letra do texto
    if (userInput.length < text.length) {
      const nextChar = text[userInput.length];
      setCurrentKey(nextChar);
      
      const finger = getFingerForKey(nextChar);
      if (finger) {
        setActiveFinger(finger);
        // O dedo permanecerá ativo até o usuário digitar a letra correta
      }
    }
  };

  const handleKeyUp = (e) => {
    // Não é necessário fazer nada aqui
  };

  const calculateResults = (endTime) => {
    const timeElapsed = (endTime - startTime) / 1000 / 60; // em minutos
    const wordsTyped = text.split(' ').length;
    const wpmResult = Math.round(wordsTyped / timeElapsed);
    const accuracyResult = Math.round(((text.length - errors) / text.length) * 100);
    
    setWpm(wpmResult);
    setAccuracy(accuracyResult);
  };

  const resetExercise = () => {
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setIsTyping(false);
    setErrors(0);
    setWpm(0);
    setAccuracy(100);
    setShowResults(false);
    setCurrentKey('');
    setActiveFinger('');
  };

  const nextText = () => {
    const nextIndex = (currentTextIndex + 1) % sampleTexts.length;
    setCurrentTextIndex(nextIndex);
    resetExercise();
  };

  const renderText = () => {
    return text.split('').map((char, index) => {
      let className = 'char';
      
      if (index < userInput.length) {
        if (userInput[index] === char) {
          className += ' correct';
        } else {
          className += ' incorrect';
        }
      } else if (index === userInput.length) {
        className += ' current';
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  function getActiveFinger(side, finger) {
    if (!finger) return '';
    
    const fingerMap = {
      'left-pinky': side === 'left' ? 'pinky' : '',
      'left-ring': side === 'left' ? 'ring' : '',
      'left-middle': side === 'left' ? 'middle' : '',
      'left-index': side === 'left' ? 'index' : '',
      'right-pinky': side === 'right' ? 'pinky' : '',
      'right-ring': side === 'right' ? 'ring' : '',
      'right-middle': side === 'right' ? 'middle' : '',
      'right-index': side === 'right' ? 'index' : '',
      'thumbs': side === 'left' ? 'thumb' : ''
    };
    
    return fingerMap[finger] || '';
  }

  const getInputClassName = () => {
    let className = 'typing-input';
    
    if (userInput.length > 0) {
      let hasErrors = false;
      for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] !== text[i]) {
          hasErrors = true;
          break;
        }
      }
      
      if (hasErrors) {
        className += ' incorrect';
      } else {
        className += ' correct';
      }
    }
    
    return className;
  };

    return (
    <div className="typing-exercise">
      <h1 className="exercise-title">Exercício de Digitação</h1>
      
      <div className="main-layout">
        <div className="exercise-content">
          <div className="stats-bar">
              <div className="stat">
                <div className="stat-icon">⚡</div>
                <span className="stat-label">Velocidade</span>
                <span className="stat-value">
                  {isTyping ? (
                    <span className="typing-indicator">...</span>
                  ) : (
                    `${wpm} WPM`
                  )}
                </span>
                {wpm > 0 && (
                  <div className="stat-trend">
                    {wpm >= 60 ? '🚀' : wpm >= 40 ? '👍' : wpm >= 20 ? '📈' : '🔄'}
                  </div>
                )}
              </div>
              
              <div className="stat">
                <div className="stat-icon">🎯</div>
                <span className="stat-label">Precisão</span>
                <span className="stat-value">{accuracy}%</span>
                {accuracy > 0 && (
                  <div className="stat-trend">
                    {accuracy >= 95 ? '🏆' : accuracy >= 90 ? '👍' : accuracy >= 80 ? '📈' : '⚠️'}
                  </div>
                )}
              </div>
              
              <div className="stat">
                <div className="stat-icon">❌</div>
                <span className="stat-label">Erros</span>
                <span className="stat-value">{errors}</span>
                {errors > 0 && (
                  <div className="stat-trend">
                    {errors <= 2 ? '🟢' : errors <= 5 ? '🟡' : '🔴'}
                  </div>
                )}
              </div>
              
              <div className="stat">
                <div className="stat-icon">⏱️</div>
                <span className="stat-label">Tempo</span>
                <span className="stat-value">
                  {isTyping ? (
                    <span className="typing-indicator">...</span>
                  ) : (
                    `${startTime ? Math.round((endTime - startTime) / 1000) : 0}s`
                  )}
                </span>
                {startTime && !isTyping && (
                  <div className="stat-trend">
                    {Math.round((endTime - startTime) / 1000) <= 60 ? '⚡' : '⏳'}
                  </div>
                )}
              </div>
              
              <div className="stat">
                <div className="stat-icon">📊</div>
                <span className="stat-label">CPM</span>
                <span className="stat-value">
                  {isTyping ? (
                    <span className="typing-indicator">...</span>
                  ) : (
                    `${startTime ? Math.round((userInput.length / ((endTime - startTime) / 1000)) * 60) : 0}`
                  )}
                </span>
              </div>
            </div>

            <div className="progress-indicator">
              <div className="progress-header">
                <div className="progress-stats">
                  <div className="stat-item">
                    <span className="stat-icon">📝</span>
                    <span className="stat-value">{userInput.length}</span>
                    <span className="stat-label">Digitados</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">📊</span>
                    <span className="stat-value">{text.length}</span>
                    <span className="stat-label">Total</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">📈</span>
                    <span className="stat-value">{Math.round((userInput.length / text.length) * 100)}%</span>
                    <span className="stat-label">Progresso</span>
                  </div>
                </div>
              </div>
              
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(userInput.length / text.length) * 100}%` }}
                  ></div>
                  <div className="progress-glow"></div>
                </div>
                <div className="progress-labels">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div className="progress-details">
                <div className="detail-item">
                  <span className="detail-icon">⚡</span>
                  <span className="detail-text">
                    {isTyping ? 'Digitando...' : 'Pronto para começar'}
                  </span>
                </div>
                {errors > 0 && (
                  <div className="detail-item error">
                    <span className="detail-icon">⚠️</span>
                    <span className="detail-text">{errors} erro{errors !== 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="controls">
              {!isTyping && !showResults && (
                <button onClick={startTyping} className="start-button">
                  Começar Exercício
                </button>
              )}
              
              {showResults && (
                <div className="results">
                  <div className="results-header">
                    <h2>🎉 Resultados do Exercício</h2>
                    <div className="completion-badge">
                      <span className="badge-icon">🏆</span>
                      <span className="badge-text">Concluído!</span>
                    </div>
                  </div>
                  
                  <div className="results-grid">
                    <div className="result-item">
                      <div className="result-icon">⚡</div>
                      <span className="result-label">Velocidade</span>
                      <span className="result-value">{wpm} WPM</span>
                      <div className="result-rating">
                        {wpm >= 60 ? '🚀 Excelente' : wpm >= 40 ? '👍 Bom' : wpm >= 20 ? '📈 Regular' : '🔄 Continue praticando'}
                      </div>
                    </div>
                    
                    <div className="result-item">
                      <div className="result-icon">🎯</div>
                      <span className="result-label">Precisão</span>
                      <span className="result-value">{accuracy}%</span>
                      <div className="result-rating">
                        {accuracy >= 95 ? '🏆 Perfeito' : accuracy >= 90 ? '👍 Muito bom' : accuracy >= 80 ? '📈 Bom' : '⚠️ Precisa melhorar'}
                      </div>
                    </div>
                    
                    <div className="result-item">
                      <div className="result-icon">❌</div>
                      <span className="result-label">Erros</span>
                      <span className="result-value">{errors}</span>
                      <div className="result-rating">
                        {errors === 0 ? '🎉 Perfeito!' : errors <= 2 ? '🟢 Poucos erros' : errors <= 5 ? '🟡 Alguns erros' : '🔴 Muitos erros'}
                      </div>
                    </div>
                    
                    <div className="result-item">
                      <div className="result-icon">⏱️</div>
                      <span className="result-label">Tempo</span>
                      <span className="result-value">{Math.round((endTime - startTime) / 1000)}s</span>
                      <div className="result-rating">
                        {Math.round((endTime - startTime) / 1000) <= 60 ? '⚡ Rápido' : '⏳ Tempo normal'}
                      </div>
                    </div>
                    
                    <div className="result-item">
                      <div className="result-icon">📊</div>
                      <span className="result-label">CPM</span>
                      <span className="result-value">
                        {Math.round((userInput.length / ((endTime - startTime) / 1000)) * 60)}
                      </span>
                      <div className="result-rating">
                        Caracteres por minuto
                      </div>
                    </div>
                    
                    <div className="result-item">
                      <div className="result-icon">📈</div>
                      <span className="result-label">Score</span>
                      <span className="result-value">
                        {Math.round((wpm * accuracy / 100) + (100 - errors * 2))}
                      </span>
                      <div className="result-rating">
                        Pontuação geral
                      </div>
                    </div>
                  </div>
                  
                  <div className="result-feedback">
                    {wpm >= 60 && accuracy >= 95 && (
                      <p className="excellent">Excelente! Você está no nível avançado!</p>
                    )}
                    {wpm >= 40 && accuracy >= 90 && (
                      <p className="good">Muito bom! Continue praticando!</p>
                    )}
                    {wpm >= 20 && accuracy >= 80 && (
                      <p className="average">Bom começo! Pratique mais para melhorar.</p>
                    )}
                    {(wpm < 20 || accuracy < 80) && (
                      <p className="needs-improvement">Continue praticando! A consistência é a chave.</p>
                    )}
                  </div>
                </div>
              )}
              
              <div className="action-buttons">
                <button onClick={resetExercise} className="reset-button">
                  Reiniciar
                </button>
                <button onClick={nextText} className="next-button">
                  Próximo Texto
                </button>
              </div>
            </div>

            <div className="tips">
              <h3>Dicas para melhorar:</h3>
              <ul>
                <li>Mantenha os olhos no texto, não no teclado</li>
                <li>Use todos os dedos das mãos</li>
                <li>Mantenha uma postura adequada</li>
                <li>Pratique regularmente</li>
                <li>Foque na precisão antes da velocidade</li>
              </ul>
            </div>
          </div>

          <div className="keyboard-sidebar">
            <div className="text-display">
              <p className="text-content">
                {renderText()}
              </p>
            </div>

            <div className="typing-area">
              <div className="input-section">
                <textarea
                  ref={inputRef}
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onKeyUp={handleKeyUp}
                  placeholder="✨ Digite o texto acima para começar o exercício..."
                  disabled={showResults}
                  className={getInputClassName()}
                  spellCheck="false"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                />
              </div>
            </div>

            <div className="keyboard-visual-section">
              <VirtualKeyboard currentKey={currentKey} />
              
              <div className="hands-row">
                <HandCSS side="left" activeFinger={getActiveFinger('left', activeFinger)} />
                <HandCSS side="right" activeFinger={getActiveFinger('right', activeFinger)} />
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default TypingExercise; 