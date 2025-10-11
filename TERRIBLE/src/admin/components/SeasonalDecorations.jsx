import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const SeasonalDecorations = () => {
  const { currentTheme } = useTheme();
  const [decorations, setDecorations] = useState([]);

  useEffect(() => {
    // Generate decorations based on theme
    if (currentTheme === 'halloween') {
      generateGhosts();
    } else if (currentTheme === 'fall') {
      generateLeaves();
    } else if (currentTheme === 'christmas') {
      generateSnowflakes();
    } else {
      setDecorations([]);
    }
  }, [currentTheme]);

  const generateGhosts = () => {
    const ghosts = Array.from({ length: 6 }, (_, i) => ({
      id: `ghost-${i}`,
      left: 10 + Math.random() * 80,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 5,
      drift: Math.random() * 60 - 30,
    }));
    setDecorations(ghosts);
  };

  const generateLeaves = () => {
    const leaves = Array.from({ length: 20 }, (_, i) => ({
      id: `leaf-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 5,
      rotation: Math.random() * 360,
      drift: Math.random() * 100 - 50,
      leafType: ['🍂', '🍁'][Math.floor(Math.random() * 2)],
    }));
    setDecorations(leaves);
  };

  const generateSnowflakes = () => {
    const snowflakes = Array.from({ length: 30 }, (_, i) => ({
      id: `snow-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 7,
      drift: Math.random() * 60 - 30,
      size: 0.5 + Math.random() * 1.5,
      opacity: 0.3 + Math.random() * 0.7,
    }));
    setDecorations(snowflakes);
  };

  if (currentTheme === 'halloween') {
    return (
      <div className="fixed inset-0 pointer-events-none z-50" style={{ overflow: 'hidden' }}>
        {decorations.map((ghost) => (
          <div
            key={ghost.id}
            className="absolute"
            style={{
              left: `${ghost.left}%`,
              bottom: '-100px',
              animation: `float-ghost-${ghost.id} ${ghost.duration}s linear infinite`,
              animationDelay: `${ghost.delay}s`,
            }}
          >
            <div className="text-5xl opacity-30" style={{ filter: 'blur(0.5px)' }}>👻</div>
            <style>{`
              @keyframes float-ghost-${ghost.id} {
                0% {
                  transform: translateY(0) translateX(0);
                  opacity: 0;
                }
                5% {
                  opacity: 0.3;
                }
                95% {
                  opacity: 0.3;
                }
                100% {
                  transform: translateY(calc(-100vh - 200px)) translateX(${ghost.drift}px);
                  opacity: 0;
                }
              }
            `}</style>
          </div>
        ))}
      </div>
    );
  }

  if (currentTheme === 'fall') {
    return (
      <div className="fixed inset-0 pointer-events-none z-50" style={{ overflow: 'hidden' }}>
        {decorations.map((leaf) => (
          <div
            key={leaf.id}
            className="absolute"
            style={{
              left: `${leaf.left}%`,
              top: '-100px',
              animation: `fall-leaf-${leaf.id} ${leaf.duration}s ease-in-out infinite`,
              animationDelay: `${leaf.delay}s`,
            }}
          >
            <div className="text-2xl opacity-70">{leaf.leafType}</div>
            <style>{`
              @keyframes fall-leaf-${leaf.id} {
                0% {
                  transform: translateY(0) rotate(${leaf.rotation}deg) translateX(0);
                  opacity: 0;
                }
                5% {
                  opacity: 0.7;
                }
                95% {
                  opacity: 0.7;
                }
                100% {
                  transform: translateY(calc(100vh + 200px)) rotate(${leaf.rotation + 720}deg) translateX(${leaf.drift}px);
                  opacity: 0;
                }
              }
            `}</style>
          </div>
        ))}
      </div>
    );
  }

  if (currentTheme === 'christmas') {
    return (
      <div className="fixed inset-0 pointer-events-none z-50" style={{ overflow: 'hidden' }}>
        {decorations.map((snow) => (
          <div
            key={snow.id}
            className="absolute"
            style={{
              left: `${snow.left}%`,
              top: '-50px',
              animation: `fall-snow-${snow.id} ${snow.duration}s linear infinite`,
              animationDelay: `${snow.delay}s`,
              opacity: snow.opacity,
            }}
          >
            <div
              className="text-white"
              style={{
                fontSize: `${snow.size}rem`,
                filter: 'blur(0.5px)',
              }}
            >
              ❄
            </div>
            <style>{`
              @keyframes fall-snow-${snow.id} {
                0% {
                  transform: translateY(0) translateX(0) rotate(0deg);
                  opacity: 0;
                }
                5% {
                  opacity: ${snow.opacity};
                }
                95% {
                  opacity: ${snow.opacity};
                }
                100% {
                  transform: translateY(calc(100vh + 100px)) translateX(${snow.drift}px) rotate(360deg);
                  opacity: 0;
                }
              }
            `}</style>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default SeasonalDecorations;
