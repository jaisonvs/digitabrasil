import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import TypingExercise from './components/TypingExercise';
import PostureTips from './components/PostureTips';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import SoundControl from './components/SoundControl';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home currentPage={currentPage} onPageChange={setCurrentPage} />;
      case 'exercise':
        return <TypingExercise />;
      case 'posture':
        return <PostureTips />;
      default:
        return <Home currentPage={currentPage} onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      <ThemeToggle />
      <SoundControl />
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
