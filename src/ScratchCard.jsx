import { useState, useRef, useEffect } from 'react';
import './ScratchCard.css';

// Import photos
import photo1 from './assets/photos/photo1.jpg.jpeg';
import photo2 from './assets/photos/photo2.jpg.jpeg';
import photo3 from './assets/photos/photo3.jpg.jpeg';
import photo4 from './assets/photos/photo4.jpg.jpeg';

// Import audio as URL
import backgroundMusic from './assets/audio/song.mpeg?url';

function ScratchCard({ onBack }) {
  const canvasRef = useRef(null);
  const noButtonRef = useRef(null);
  const audioRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [revealPercentage, setRevealPercentage] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [revealStage, setRevealStage] = useState(0);
  const [particles, setParticles] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [yesClicked, setYesClicked] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  // Photos array
  const photos = [photo1, photo2, photo3, photo4];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#ff0080');
    gradient.addColorStop(0.25, '#ff8c00');
    gradient.addColorStop(0.5, '#40e0d0');
    gradient.addColorStop(0.75, '#ff1493');
    gradient.addColorStop(1, '#9400d3');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    for (let i = 0; i < 100; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const size = Math.random() * 2;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.8})`;
      ctx.fillRect(x, y, size, size);
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#ff00ff';
    ctx.shadowBlur = 20;
    ctx.fillText('✨ Scratch to Unlock Magic ✨', rect.width / 2, rect.height / 2 - 10);
    ctx.font = '18px Arial';
    ctx.fillText('Something special awaits...', rect.width / 2, rect.height / 2 + 20);
  }, []);

  const getPosition = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const scratch = (e) => {
    if (!isScratching) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPosition(e);

    const newParticles = Array.from({ length: 5 }, () => ({
      id: Date.now() + Math.random(),
      x: pos.x,
      y: pos.y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      color: ['#ff0080', '#ff8c00', '#40e0d0', '#ff1493'][Math.floor(Math.random() * 4)]
    }));
    setParticles(prev => [...prev, ...newParticles].slice(-50));

    const newSparkles = Array.from({ length: 3 }, () => ({
      id: Date.now() + Math.random(),
      x: pos.x,
      y: pos.y
    }));
    setSparkles(prev => [...prev, ...newSparkles].slice(-30));

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 35, 0, Math.PI * 2);
    ctx.fill();

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    const percentage = (transparent / (pixels.length / 4)) * 100;
    setRevealPercentage(percentage);

    if (percentage > 30 && revealStage < 1) setRevealStage(1);
    if (percentage > 60 && revealStage < 2) setRevealStage(2);
    if (percentage > 85 && revealStage < 3) {
      setRevealStage(3);
      setShowConfetti(true);
      setTimeout(() => setShowButtons(true), 1000);
      
      // Play background music starting from 54 seconds
      if (audioRef.current && !musicPlaying) {
        audioRef.current.currentTime = 55; // Start at 54 seconds
        audioRef.current.play().catch(err => {
          console.log('Audio play failed:', err);
        });
        setMusicPlaying(true);
      }
    }
  };

  const startScratching = (e) => {
    setIsScratching(true);
    scratch(e);
  };

  const stopScratching = () => {
    setIsScratching(false);
  };

  const handleMouseMove = (e) => {
    if (!showButtons || yesClicked || !noButtonRef.current) return;

    const noButton = noButtonRef.current;
    const buttonRect = noButton.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate distance between mouse and button center
    const distanceX = buttonCenterX - mouseX;
    const distanceY = buttonCenterY - mouseY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // If mouse is within 200px of the button, move it away
    const threshold = 200;
    if (distance < threshold) {
      // Calculate direction away from mouse
      const angle = Math.atan2(distanceY, distanceX);
      
      // Smooth easing - the closer the mouse, the faster it moves
      const intensity = (threshold - distance) / threshold;
      const moveDistance = intensity * 100;
      
      // Move button away from mouse with smooth interpolation
      const targetX = noButtonPosition.x + Math.cos(angle) * moveDistance;
      const targetY = noButtonPosition.y + Math.sin(angle) * moveDistance;

      // Calculate viewport boundaries
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const buttonWidth = buttonRect.width;
      const buttonHeight = buttonRect.height;
      
      // Get the button's container position
      const container = noButton.parentElement;
      const containerRect = container.getBoundingClientRect();
      
      // Calculate max movement to keep button in viewport
      const maxLeft = -containerRect.left + 20; // 20px padding from edge
      const maxRight = viewportWidth - containerRect.left - buttonWidth - 20;
      const maxTop = -containerRect.top + 20;
      const maxBottom = viewportHeight - containerRect.top - buttonHeight - 20;

      // Clamp the position to stay within viewport
      const boundedX = Math.max(maxLeft, Math.min(maxRight, targetX));
      const boundedY = Math.max(maxTop, Math.min(maxBottom, targetY));

      setNoButtonPosition({ x: boundedX, y: boundedY });
    }
  };

  useEffect(() => {
    if (showButtons && !yesClicked) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [showButtons, yesClicked, noButtonPosition]);

  const handleYesClick = () => {
    setYesClicked(true);
    setShowConfetti(true);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
        setMusicPlaying(false);
      } else {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err));
        setMusicPlaying(true);
      }
    }
  };

  return (
    <div className="scratch-app">
      <button className="back-btn" onClick={onBack}>← Back</button>
      
      {/* Music Control Button */}
      {revealStage >= 3 && (
        <button className="music-btn" onClick={toggleMusic}>
          {musicPlaying ? '🔊' : '🔇'}
        </button>
      )}
      
      {/* Audio element */}
      <audio 
        ref={audioRef} 
        loop
        preload="auto"
      >
        <source src={backgroundMusic} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      {/* Scrolling Background Photos - shown when revealed */}
      {revealStage >= 3 && (
        <div className="scrolling-background">
          <div className="photo-scroll">
            {[...photos, ...photos].map((photo, index) => (
              <div key={index} className="scroll-photo">
                <img src={photo} alt={`Background ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {showConfetti && <Confetti />}
      <FloatingHearts />
      
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.x,
            top: particle.y,
            '--vx': particle.vx,
            '--vy': particle.vy,
            backgroundColor: particle.color
          }}
        />
      ))}

      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            left: sparkle.x,
            top: sparkle.y
          }}
        >✨</div>
      ))}
      
      <div className="container">
        <h1 className={`title ${revealStage >= 2 ? 'rainbow' : ''}`}>
          💌 Valentine's Surprise 💌
        </h1>
        
        <div className={`card stage-${revealStage}`}>
          <div className="message">
            <div className="photo-grid">
              {photos.map((photo, index) => (
                <div key={index} className="photo-item">
                  <img 
                    src={photo} 
                    alt={`Memory ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            
            <div className="message-overlay">
              <div className="hearts-container">
                <div className="heart-icon pulse">💖</div>
                <div className="heart-icon pulse delay-1">💕</div>
                <div className="heart-icon pulse delay-2">💗</div>
              </div>
              
              <div className="message-content">
                <p className="message-text glow">
                  You are the best thing that ever happened to me.
                </p>
                <p className="question shimmer">
                  Will you be my Valentine Shaanu?
                </p>
                
                {revealStage >= 3 && (
                  <div className="reveal-message">
                    <p className="special-text">💝 Yes, I mean YOU! 💝</p>
                    <p className="sub-text">You make every day magical ✨</p>
                  </div>
                )}
              </div>
              
              <div className="hearts-container">
                <div className="heart-icon pulse delay-2">💓</div>
                <div className="heart-icon pulse delay-1">💖</div>
                <div className="heart-icon pulse">💕</div>
              </div>
            </div>
          </div>
          
          <canvas
            ref={canvasRef}
            className="scratch-canvas"
            onMouseDown={startScratching}
            onMouseUp={stopScratching}
            onMouseMove={scratch}
            onMouseLeave={stopScratching}
            onTouchStart={startScratching}
            onTouchEnd={stopScratching}
            onTouchMove={scratch}
          />
        </div>

        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${revealPercentage}%` }}
          />
        </div>

        {revealPercentage > 10 && (
          <div className={`progress-indicator stage-${revealStage}`}>
            {revealStage === 0 && '🔮 Keep going...'}
            {revealStage === 1 && '✨ You\'re getting closer!'}
            {revealStage === 2 && '🌟 Almost there!'}
            {revealStage === 3 && !showButtons && '🎉 REVEALED! You\'re Amazing! 🎉'}
          </div>
        )}

        {showButtons && !yesClicked && (
          <div className="answer-buttons">
            <button className="yes-btn" onClick={handleYesClick}>
              Yes! 💖
            </button>
            <button 
              ref={noButtonRef}
              className="no-btn" 
              style={{
                transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              }}
            >
              No 💔
            </button>
          </div>
        )}

        {yesClicked && (
          <div className="final-message">
            <h2 className="celebration-text">🎉 Yay! You said YES! 🎉</h2>
            <p className="love-message">You just made me the happiest person alive! ❤️</p>
            <div className="hearts-explosion">
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i} className="explosion-heart" style={{ '--i': i }}>
                  💖
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Confetti() {
  const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞'];
  const confettiPieces = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 3,
    emoji: hearts[Math.floor(Math.random() * hearts.length)],
    rotation: Math.random() * 360
  }));

  return (
    <div className="confetti-container">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            '--rotation': `${piece.rotation}deg`
          }}
        >
          {piece.emoji}
        </div>
      ))}
    </div>
  );
}

function FloatingHearts() {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 4,
    size: 20 + Math.random() * 30
  }));

  return (
    <div className="floating-hearts">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            fontSize: `${heart.size}px`
          }}
        >
          💕
        </div>
      ))}
    </div>
  );
}

export default ScratchCard;
