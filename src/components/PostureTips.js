import React from 'react';
import './PostureTips.css';

const PostureTips = () => {
  return (
    <div className="posture-tips">
      <div className="tips-container">
        <h1>Dicas de Postura e Ergonomia</h1>
        
        <div className="intro-section">
          <p>
            Uma boa postura é fundamental para uma digitação eficiente e saudável. 
            Siga estas dicas para evitar lesões e melhorar seu desempenho.
          </p>
        </div>

        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-icon">🪑</div>
            <h3>Posição da Cadeira</h3>
            <ul>
              <li>Ajuste a altura da cadeira para que seus pés fiquem apoiados no chão</li>
              <li>Mantenha as coxas paralelas ao chão</li>
              <li>Use uma cadeira com apoio lombar</li>
              <li>Sente-se com as costas retas e apoiadas</li>
            </ul>
          </div>

          <div className="tip-card">
            <div className="tip-icon"></div>
            <h3>Posição do Teclado</h3>
            <ul>
              <li>Mantenha o teclado na altura dos cotovelos</li>
              <li>Posicione o teclado a 10-15cm da borda da mesa</li>
              <li>Mantenha os pulsos retos e relaxados</li>
              <li>Evite apoiar os pulsos na mesa ou no teclado</li>
            </ul>
          </div>

          <div className="tip-card">
            <div className="tip-icon">🖥️</div>
            <h3>Posição do Monitor</h3>
            <ul>
              <li>O topo da tela deve estar na altura dos olhos</li>
              <li>Mantenha uma distância de 50-70cm da tela</li>
              <li>Evite reflexos na tela</li>
              <li>Ajuste o brilho para conforto visual</li>
            </ul>
          </div>

          <div className="tip-card">
            <div className="tip-icon">🤲</div>
            <h3>Posição das Mãos</h3>
            <ul>
              <li>Mantenha os dedos curvados naturalmente</li>
              <li>Posicione os dedos indicadores nas teclas F e J</li>
              <li>Mantenha os pulsos neutros (nem dobrados para cima nem para baixo)</li>
              <li>Relaxe os ombros e braços</li>
            </ul>
          </div>

          <div className="tip-card">
            <div className="tip-icon">👀</div>
            <h3>Proteção Visual</h3>
            <ul>
              <li>Faça pausas regulares (a cada 20 minutos)</li>
              <li>Olhe para objetos distantes para relaxar os olhos</li>
              <li>Pisque regularmente para manter os olhos úmidos</li>
              <li>Use iluminação adequada no ambiente</li>
            </ul>
          </div>

          <div className="tip-card">
            <div className="tip-icon">⏰</div>
            <h3>Pausas e Exercícios</h3>
            <ul>
              <li>Faça pausas de 5 minutos a cada hora</li>
              <li>Alongue os dedos, pulsos e braços</li>
              <li>Levante-se e caminhe um pouco</li>
              <li>Faça exercícios de relaxamento para os olhos</li>
            </ul>
          </div>
        </div>

        <div className="ergonomics-section">
          <h2>Exercícios de Ergonomia</h2>
          <div className="exercises-grid">
            <div className="exercise-item">
              <h4>Alongamento dos Dedos</h4>
              <p>
                Abra e feche as mãos várias vezes. Depois, estenda cada dedo 
                individualmente e mantenha por 5 segundos.
              </p>
            </div>
            
            <div className="exercise-item">
              <h4>Rotacionar os Punhos</h4>
              <p>
                Gire os punhos no sentido horário e anti-horário, 
                10 vezes em cada direção.
              </p>
            </div>
            
            <div className="exercise-item">
              <h4>Alongamento dos Braços</h4>
              <p>
                Estenda os braços para frente, entrelace os dedos e 
                vire as palmas para fora, alongando os braços.
              </p>
            </div>
            
            <div className="exercise-item">
              <h4>Relaxamento dos Ombros</h4>
              <p>
                Levante os ombros até as orelhas, mantenha por 5 segundos 
                e solte. Repita 5 vezes.
              </p>
            </div>
          </div>
        </div>

        <div className="warning-section">
          <h2>⚠️ Sinais de Alerta</h2>
          <div className="warning-content">
            <p>
              Se você sentir algum destes sintomas, pode ser um sinal de 
              problemas ergonômicos:
            </p>
            <ul>
              <li>Dor ou formigamento nas mãos, pulsos ou braços</li>
              <li>Fadiga visual ou dores de cabeça</li>
              <li>Dores nas costas ou pescoço</li>
              <li>Rigidez muscular após longos períodos de digitação</li>
            </ul>
            <p className="warning-note">
              <strong>Importante:</strong> Se os sintomas persistirem, 
              consulte um profissional de saúde.
            </p>
          </div>
        </div>

        <div className="cta-section">
          <h2>Pronto para praticar?</h2>
          <p>
            Agora que você conhece as dicas de postura, vá para a seção de 
            exercícios e pratique sua digitação com consciência ergonômica!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostureTips; 