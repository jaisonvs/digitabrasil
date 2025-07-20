import React, { useEffect, useRef } from 'react';

class SoundManager {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.isEnabled = true;
    this.volume = 0.3;
    this.loadPreferences();
    this.init();
  }

  loadPreferences() {
    try {
      const savedEnabled = localStorage.getItem('typingSoundEnabled');
      const savedVolume = localStorage.getItem('typingSoundVolume');
      
      if (savedEnabled !== null) {
        this.isEnabled = savedEnabled === 'true';
      }
      
      if (savedVolume !== null) {
        this.volume = parseFloat(savedVolume);
      }
    } catch (error) {
      console.log('Erro ao carregar preferências de som');
    }
  }

  init() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.createSounds();
    } catch (error) {
      console.log('Audio não suportado neste navegador');
    }
  }

  createSounds() {
    // Som de tecla normal
    this.sounds.key = this.createKeySound();
    
    // Som de tecla especial (Enter, Backspace, etc.)
    this.sounds.special = this.createSpecialKeySound();
    
    // Som de erro
    this.sounds.error = this.createErrorSound();
    
    // Som de conclusão
    this.sounds.complete = this.createCompleteSound();
  }

  createKeySound() {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
    
    return { oscillator, gainNode };
  }

  createSpecialKeySound() {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.4, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.15);
    
    return { oscillator, gainNode };
  }

  createErrorSound() {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(150, this.audioContext.currentTime + 0.1);
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.5, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2);
    
    return { oscillator, gainNode };
  }

  createCompleteSound() {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    // Sequência de notas para som de conclusão
    const notes = [523, 659, 784, 1047]; // C, E, G, C (oitava superior)
    let currentTime = this.audioContext.currentTime;
    
    notes.forEach((frequency, index) => {
      oscillator.frequency.setValueAtTime(frequency, currentTime + index * 0.1);
    });
    
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, currentTime);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.6, currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.5);
    
    return { oscillator, gainNode };
  }

  playSound(type = 'key') {
    if (!this.isEnabled || !this.audioContext || this.audioContext.state === 'suspended') {
      return;
    }

    try {
      const sound = this.sounds[type];
      if (!sound) return;

      // Criar nova instância do som para permitir sobreposição
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      const currentTime = this.audioContext.currentTime;
      
      switch (type) {
        case 'key':
          oscillator.frequency.setValueAtTime(800 + Math.random() * 100, currentTime);
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0, currentTime);
          gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, currentTime + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.1);
          break;
          
        case 'special':
          oscillator.frequency.setValueAtTime(600, currentTime);
          oscillator.type = 'square';
          gainNode.gain.setValueAtTime(0, currentTime);
          gainNode.gain.linearRampToValueAtTime(this.volume * 0.4, currentTime + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.15);
          break;
          
        case 'error':
          oscillator.frequency.setValueAtTime(200, currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(150, currentTime + 0.1);
          oscillator.type = 'sawtooth';
          gainNode.gain.setValueAtTime(0, currentTime);
          gainNode.gain.linearRampToValueAtTime(this.volume * 0.5, currentTime + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.2);
          break;
          
        case 'complete':
          const notes = [523, 659, 784, 1047];
          notes.forEach((frequency, index) => {
            oscillator.frequency.setValueAtTime(frequency, currentTime + index * 0.1);
          });
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0, currentTime);
          gainNode.gain.linearRampToValueAtTime(this.volume * 0.6, currentTime + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.5);
          break;
      }
      
      oscillator.start(currentTime);
      oscillator.stop(currentTime + 0.5);
      
    } catch (error) {
      console.log('Erro ao reproduzir som:', error);
    }
  }

  toggleSound() {
    this.isEnabled = !this.isEnabled;
    localStorage.setItem('typingSoundEnabled', this.isEnabled);
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    localStorage.setItem('typingSoundVolume', this.volume);
  }

  getVolume() {
    return this.volume;
  }

  isSoundEnabled() {
    return this.isEnabled;
  }
}

// Instância global do gerenciador de som
const soundManager = new SoundManager();

export default soundManager; 