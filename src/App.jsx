import { useState } from 'react';
import ScratchCard from './ScratchCard';
import ValentineWeek from './ValentineWeek';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('menu');

  if (currentView === 'scratch') {
    return <ScratchCard onBack={() => setCurrentView('menu')} />;
  }

  if (currentView === 'week') {
    return <ValentineWeek onBack={() => setCurrentView('menu')} />;
  }

  return (
    <div className="menu-container">
      {/* Animated Gradient Orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
      
      {/* Particle System */}
      <div className="particles">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="particle-dot"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="menu-content">
        <div className="logo-container">
          <div className="logo-heart">
            <div className="heart-half left"></div>
            <div className="heart-half right"></div>
          </div>
          <div className="logo-rings">
            <div className="ring ring-1"></div>
            <div className="ring ring-2"></div>
            <div className="ring ring-3"></div>
          </div>
        </div>

        <h1 className="menu-title">
          <span className="word" style={{ '--delay': '0s' }}>Valentine's</span>
          <span className="word" style={{ '--delay': '0.1s' }}>Special</span>
        </h1>
        <p className="menu-subtitle">
          <span className="glitch" data-text="Choose your romantic experience">
            Choose your romantic experience
          </span>
        </p>

        <div className="menu-cards">
          <div className="menu-card card-scratch" onClick={() => setCurrentView('scratch')}>
            <div className="card-bg"></div>
            <div className="card-content">
              <div className="menu-card-icon">
                <div className="icon-3d">🎴</div>
              </div>
              <h2>Scratch Card</h2>
              <p>Scratch to reveal a special surprise message</p>
              <div className="card-shine"></div>
            </div>
            <div className="card-border"></div>
          </div>

          <div className="menu-card card-week" onClick={() => setCurrentView('week')}>
            <div className="card-bg"></div>
            <div className="card-content">
              <div className="menu-card-icon">
                <div className="icon-3d">📅</div>
              </div>
              <h2>Valentine Week</h2>
              <p>Journey through 8 days of love and memories</p>
              <div className="card-shine"></div>
            </div>
            <div className="card-border"></div>
          </div>
        </div>

        <div className="menu-footer">
          <div className="footer-line"></div>
          <p>
            <span className="footer-icon">✨</span>
            Made with ❤️ for someone special
            <span className="footer-icon">✨</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
