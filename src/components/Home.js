import React from 'react';
import './Home.css';
const Home = ({currentPage, onPageChange}) => {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Aprenda a Digitar Corretamente</h1>
            <p className="hero-subtitle">
              Desenvolva velocidade, precisão e ergonomia na digitação
            </p>
            
            <button  className={`cta-btn ${currentPage === 'exercise' ? 'active' : ''}`}
            onClick={() => onPageChange('exercise')}>
              <span className="cta-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 16.92V21h4.08l12.06-12.06-4.08-4.08L2 16.92zM21.7 6.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#fff"/>
                </svg>
              </span>
              Comece Agora
            </button>
          </div>
          {/* SUGESTÃO: Adicione uma ilustração SVG ou imagem aqui para maior impacto visual */}
          {/* <div className="hero-illustration">
            <img src="/images/typing-illustration.svg" alt="Ilustração de digitação" />
          </div> */}
        </div>
      </div>

      <div className="content-container">
        <section className="info-section">
          <h2>Por que aprender a digitar corretamente?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              {/* Substitua por SVG profissional */}
              <div className="benefit-icon">⚡</div>
              <h3>Velocidade</h3>
              <p>Aumente significativamente sua velocidade de digitação com a técnica correta.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>Precisão</h3>
              <p>Reduza erros e melhore a qualidade do seu trabalho.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💪</div>
              <h3>Saúde</h3>
              <p>Previna lesões por esforço repetitivo com a postura adequada.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🚀</div>
              <h3>Produtividade</h3>
              <p>Seja mais eficiente em suas tarefas diárias.</p>
            </div>
          </div>
        </section>

        <section className="basics-section">
          <h2>Fundamentos da Digitação</h2>
          <div className="basics-content">
            <div className="basics-text">
              <h3>Posição das Mãos</h3>
              <p>
                As mãos devem estar posicionadas na linha base do teclado, com os dedos 
                indicadores nas teclas <b>F</b> e <b>J</b> (que possuem pequenas saliências para orientação).
              </p>
              
              <h3>Dedos de Referência</h3>
              <p>
                Cada dedo é responsável por uma área específica do teclado. Mantenha os 
                dedos sempre nas suas posições de "casa" e mova apenas o dedo necessário 
                para cada tecla.
              </p>
              
              <h3>Olhos no Texto</h3>
              <p>
                Mantenha os olhos no texto que está digitando, não no teclado. Com a 
                prática, você desenvolverá a memória muscular necessária.
              </p>
            </div>
            <div className="keyboard-image">
              <div className="keyboard-visual">
                <div className="keyboard-row">
                  <span className="key">Q</span>
                  <span className="key">W</span>
                  <span className="key">E</span>
                  <span className="key">R</span>
                  <span className="key">T</span>
                  <span className="key">Y</span>
                  <span className="key">U</span>
                  <span className="key">I</span>
                  <span className="key">O</span>
                  <span className="key">P</span>
                </div>
                <div className="keyboard-row">
                  <span className="key">A</span>
                  <span className="key home-key">S</span>
                  <span className="key home-key">D</span>
                  <span className="key">F</span>
                  <span className="key">G</span>
                  <span className="key">H</span>
                  <span className="key home-key">J</span>
                  <span className="key home-key">K</span>
                  <span className="key">L</span>
                </div>
                <div className="keyboard-row">
                  <span className="key">Z</span>
                  <span className="key">X</span>
                  <span className="key">C</span>
                  <span className="key">V</span>
                  <span className="key">B</span>
                  <span className="key">N</span>
                  <span className="key">M</span>
                </div>
              </div>
              <p className="keyboard-legend">
                <span className="legend-item">
                  <span className="legend-color home-key"></span> Dedos de referência (F, J)
                </span>
              </p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Pronto para começar?</h2>
          <p>Clique em "Exercícios" no menu acima para praticar sua digitação!</p>
          <button className="cta-btn" onClick={() => window.location.href = '/exercicios'}>
            <span className="cta-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 16.92V21h4.08l12.06-12.06-4.08-4.08L2 16.92zM21.7 6.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#fff"/>
              </svg>
            </span>
            Ir para Exercícios
          </button>
        </section>
      </div>
    </div>
  );
};

export default Home; 