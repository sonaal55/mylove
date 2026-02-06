import { useState, useEffect } from 'react';
import './ValentineWeek.css';

const days = [
  {
    id: 'rose',
    emoji: '🌹',
    title: 'Rose Day',
    message: 'You are as fresh and beautiful as a rose in my life.',
    color: '#ff6b9d',
    gradient: 'linear-gradient(135deg, #ff6b9d, #c06c84)',
    unlockDate: new Date('2025-02-07') // Feb 7
  },
  {
    id: 'propose',
    emoji: '💍',
    title: 'Propose Day',
    message: 'If loving you is a choice, I choose you every single day.',
    color: '#ffd700',
    gradient: 'linear-gradient(135deg, #ffd700, #ffed4e)',
    unlockDate: new Date('2025-02-08') // Feb 8
  },
  {
    id: 'chocolate',
    emoji: '🍫',
    title: 'Chocolate Day',
    message: 'Life is sweeter because you are in it.',
    color: '#8b4513',
    gradient: 'linear-gradient(135deg, #d2691e, #8b4513)',
    unlockDate: new Date('2025-02-09') // Feb 9
  },
  {
    id: 'teddy',
    emoji: '🧸',
    title: 'Teddy Day',
    message: 'Whenever you need comfort, imagine this teddy is me hugging you.',
    color: '#daa520',
    gradient: 'linear-gradient(135deg, #f4a460, #daa520)',
    unlockDate: new Date('2025-02-10') // Feb 10
  },
  {
    id: 'promise',
    emoji: '🤝',
    title: 'Promise Day',
    message: 'I promise to stand by you in every situation, through every storm.',
    color: '#4169e1',
    gradient: 'linear-gradient(135deg, #6495ed, #4169e1)',
    unlockDate: new Date('2025-02-11') // Feb 11
  },
  {
    id: 'hug',
    emoji: '🤗',
    title: 'Hug Day',
    message: 'Here\'s a warm virtual hug filled with endless love.',
    color: '#ff8c00',
    gradient: 'linear-gradient(135deg, #ffa500, #ff8c00)',
    unlockDate: new Date('2025-02-12') // Feb 12
  },
  {
    id: 'kiss',
    emoji: '😘',
    title: 'Kiss Day',
    message: 'A kiss full of care, respect, and infinite affection for you.',
    color: '#ff1493',
    gradient: 'linear-gradient(135deg, #ff69b4, #ff1493)',
    unlockDate: new Date('2025-02-13') // Feb 13
  },
  {
    id: 'valentine',
    emoji: '❤️',
    title: 'Valentine\'s Day',
    message: 'You are my today and all of my tomorrows. Will you be mine forever?',
    color: '#dc143c',
    gradient: 'linear-gradient(135deg, #ff6b6b, #dc143c)',
    unlockDate: new Date('2025-02-14') // Feb 14
  }
];

function ValentineWeek({ onBack }) {
  const [activeDay, setActiveDay] = useState(null);
  const [emojiRain, setEmojiRain] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Check if a day is unlocked
  const isDayUnlocked = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const unlockDate = new Date(day.unlockDate);
    unlockDate.setHours(0, 0, 0, 0);
    return today >= unlockDate;
  };

  // Get days until unlock
  const getDaysUntilUnlock = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const unlockDate = new Date(day.unlockDate);
    unlockDate.setHours(0, 0, 0, 0);
    const diffTime = unlockDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Parallax effect for sections
      const sections = document.querySelectorAll('.day-section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
        if (scrollPercent > 0 && scrollPercent < 1) {
          section.style.setProperty('--scroll', scrollPercent);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDay = (id, emoji, day) => {
    if (!isDayUnlocked(day)) {
      return; // Don't scroll if locked
    }
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setActiveDay(id);
    triggerEmojiRain(emoji);
  };

  const triggerEmojiRain = (emoji) => {
    const newEmojis = Array.from({ length: 40 }, (_, i) => ({
      id: Date.now() + i,
      emoji,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
      rotation: Math.random() * 360
    }));
    
    setEmojiRain(prev => [...prev, ...newEmojis]);
    setTimeout(() => {
      setEmojiRain(prev => prev.filter(e => !newEmojis.includes(e)));
    }, 5000);
  };

  return (
    <div className="valentine-week">
      <button className="back-btn" onClick={onBack}>← Back</button>
      
      {/* Progress Bar */}
      <div className="scroll-progress">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Emoji Rain */}
      <div className="emoji-rain-container">
        {emojiRain.map(item => (
          <div
            key={item.id}
            className="rain-emoji"
            style={{
              left: `${item.left}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`,
              '--rotation': `${item.rotation}deg`
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <div className="hero-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
          
          <div className="hero-text">
            <h1 className="hero-title">
              {['F', 'o', 'r', ' ', 'T', 'h', 'e', ' ', 'O', 'n', 'e'].map((char, i) => (
                <span
                  key={i}
                  className="letter"
                  style={{ '--delay': `${i * 0.05}s` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>
            <h2 className="hero-subtitle">
              {['W', 'h', 'o', ' ', 'M', 'a', 'k', 'e', 's', ' ', 'M', 'y', ' ', 'W', 'o', 'r', 'l', 'd'].map((char, i) => (
                <span
                  key={i}
                  className="letter"
                  style={{ '--delay': `${(i + 11) * 0.05}s` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h2>
            <h2 className="hero-highlight">
              {['B', 'e', 'a', 'u', 't', 'i', 'f', 'u', 'l'].map((char, i) => (
                <span
                  key={i}
                  className="letter glow-letter"
                  style={{ '--delay': `${(i + 29) * 0.05}s` }}
                >
                  {char}
                </span>
              ))}
            </h2>
          </div>
          
          <div className="hero-emoji-container">
            <div className="rotating-hearts">
              {['❤️', '💕', '💖', '💗', '💓', '💝'].map((emoji, i) => (
                <span
                  key={i}
                  className="rotating-heart"
                  style={{ '--index': i }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
          
          <p className="hero-tagline">Scroll through our Valentine Week journey</p>
          
          <div className="scroll-indicator">
            <div className="scroll-arrow">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav-bar">
        {days.map(day => {
          const isUnlocked = isDayUnlocked(day);
          const daysUntil = getDaysUntilUnlock(day);
          
          return (
            <button
              key={day.id}
              className={`nav-btn ${activeDay === day.id ? 'active' : ''} ${!isUnlocked ? 'locked' : ''}`}
              onClick={() => scrollToDay(day.id, day.emoji, day)}
              style={{ '--btn-color': day.color }}
              disabled={!isUnlocked}
              title={!isUnlocked ? `Unlocks in ${daysUntil} day${daysUntil !== 1 ? 's' : ''}` : ''}
            >
              <span className="nav-emoji">{isUnlocked ? day.emoji : '🔒'}</span>
              <span className="nav-text">{day.title.split(' ')[0]}</span>
              {!isUnlocked && <span className="unlock-badge">{daysUntil}d</span>}
            </button>
          );
        })}
      </nav>

      {/* Day Sections */}
      {days.map((day, index) => {
        const isUnlocked = isDayUnlocked(day);
        const daysUntil = getDaysUntilUnlock(day);
        
        return (
          <section
            key={day.id}
            id={day.id}
            className={`day-section ${!isUnlocked ? 'locked-section' : ''}`}
            style={{ 
              '--section-gradient': day.gradient,
              '--scroll': 0
            }}
          >
            <div className="section-number">{String(index + 1).padStart(2, '0')}</div>
            
            <div className="day-card">
              {!isUnlocked && (
                <div className="lock-overlay">
                  <div className="lock-content">
                    <div className="lock-icon">🔒</div>
                    <h3>Locked</h3>
                    <p>Unlocks in {daysUntil} day{daysUntil !== 1 ? 's' : ''}</p>
                    <p className="unlock-date">
                      {day.unlockDate.toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              )}
              
              <div className={`card-layers ${!isUnlocked ? 'blurred' : ''}`}>
                <div className="layer layer-1"></div>
                <div className="layer layer-2"></div>
                <div className="layer layer-3"></div>
              </div>
              
              <div className={`card-header ${!isUnlocked ? 'blurred' : ''}`}>
                <div className="day-emoji-container">
                  <div className="emoji-circle"></div>
                  <div className="day-emoji-large">{day.emoji}</div>
                </div>
                <h2 className="day-title">{day.title}</h2>
                <div className="title-underline"></div>
              </div>

              <p className={`day-message ${!isUnlocked ? 'blurred' : ''}`}>{day.message}</p>

              <div className={`card-footer ${!isUnlocked ? 'blurred' : ''}`}>
                <div className="footer-pattern">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span
                      key={i}
                      className="pattern-emoji"
                      style={{
                        '--pattern-delay': `${i * 0.1}s`
                      }}
                    >
                      {day.emoji}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-hearts">
            <span>💕</span>
            <span>💖</span>
            <span>💗</span>
          </div>
          <p className="footer-text">Made with all my love</p>
          <div className="footer-signature">Forever Yours ❤️</div>
        </div>
      </footer>
    </div>
  );
}

export default ValentineWeek;
