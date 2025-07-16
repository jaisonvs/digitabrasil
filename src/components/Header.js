import React from 'react';
import './Header.css';

const Header = ({ currentPage, onPageChange }) => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Digitação Correta</h1>
        <nav className="nav">
          <button 
            className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => onPageChange('home')}
          >
            Início
          </button>
          <button 
            className={`nav-button ${currentPage === 'exercise' ? 'active' : ''}`}
            onClick={() => onPageChange('exercise')}
          >
            Exercícios
          </button>
          <button 
            className={`nav-button ${currentPage === 'posture' ? 'active' : ''}`}
            onClick={() => onPageChange('posture')}
          >
            Postura
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header; 