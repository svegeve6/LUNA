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
    } else {
      setDecorations([]);
    }
  }, [currentTheme]);

  const generateGhosts = () => {
    const ghosts = Array.from({ length: 5 }, (_, i) => ({
      id: `ghost-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
    }));
    setDecorations(ghosts);
  };

  const generateLeaves = () => {
    const leaves = Array.from({ length: 15 }, (_, i) => ({
      id: `leaf-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      rotation: Math.random() * 360,
    }));
    setDecorations(leaves);
  };

  if (currentTheme === 'halloween') {
    return (
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {decorations.map((ghost) => (
          <div
            key={ghost.id}
            className="absolute animate-float-ghost opacity-20"
            style={{
              left: `${ghost.left}%`,
              animationDelay: `${ghost.delay}s`,
              animationDuration: `${ghost.duration}s`,
            }}
          >
            <div className="text-6xl">👻</div>
          </div>
        ))}
        <style>{`
          @keyframes float-ghost {
            0% {
              transform: translateY(100vh) translateX(0);
              opacity: 0;
            }
            10% {
              opacity: 0.2;
            }
            90% {
              opacity: 0.2;
            }
            100% {
              transform: translateY(-100px) translateX(${Math.random() * 40 - 20}px);
              opacity: 0;
            }
          }
          .animate-float-ghost {
            animation: float-ghost linear infinite;
          }
        `}</style>
      </div>
    );
  }

  if (currentTheme === 'fall') {
    return (
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {decorations.map((leaf) => (
          <div
            key={leaf.id}
            className="absolute animate-fall-leaf"
            style={{
              left: `${leaf.left}%`,
              animationDelay: `${leaf.delay}s`,
              animationDuration: `${leaf.duration}s`,
            }}
          >
            <div
              className="text-3xl"
              style={{
                transform: `rotate(${leaf.rotation}deg)`,
              }}
            >
              🍂
            </div>
          </div>
        ))}
        <style>{`
          @keyframes fall-leaf {
            0% {
              transform: translateY(-100px) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.8;
            }
            90% {
              opacity: 0.8;
            }
            100% {
              transform: translateY(100vh) rotate(720deg) translateX(${Math.random() * 100 - 50}px);
              opacity: 0;
            }
          }
          .animate-fall-leaf {
            animation: fall-leaf ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  return null;
};

export default SeasonalDecorations;
