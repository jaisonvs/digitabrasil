import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Digitação Correta</h3>
            <p>
              Aprenda a digitar de forma eficiente e saudável. 
              Desenvolva suas habilidades de digitação com nossos exercícios interativos.
            </p>
          </div>
          
          <div className="footer-section">
            <h4>Links Úteis</h4>
            <ul>
              <li><a href="#home">Início</a></li>
              <li><a href="#exercise">Exercícios</a></li>
              <li><a href="#posture">Postura</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Dicas Importantes</h4>
            <ul>
              <li>Mantenha uma boa postura</li>
              <li>Faça pausas regulares</li>
              <li>Pratique diariamente</li>
              <li>Foque na precisão</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Digitação Correta. Desenvolvido para ensinar técnicas de digitação eficientes.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 