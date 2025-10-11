import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ChristmasLights = ({ position = 'top' }) => {
  const { currentTheme } = useTheme();

  if (currentTheme !== 'christmas') {
    return null;
  }

  const colors = ['#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff', '#00ffff'];
  const lightCount = position === 'top' ? 20 : 10;

  return (
    <div className={`absolute ${position === 'top' ? 'top-0 left-0 right-0' : 'left-0 right-0'} pointer-events-none z-40`}>
      <svg className="w-full h-12" viewBox="0 0 1000 50" preserveAspectRatio="none">
        {/* Wire/Cable */}
        <path
          d="M 0,10 Q 50,15 100,10 T 200,10 T 300,10 T 400,10 T 500,10 T 600,10 T 700,10 T 800,10 T 900,10 T 1000,10"
          stroke="#2a2a2a"
          strokeWidth="2"
          fill="none"
        />

        {/* Lights */}
        {Array.from({ length: lightCount }).map((_, i) => {
          const x = (i / (lightCount - 1)) * 1000;
          const color = colors[i % colors.length];
          const delay = i * 0.2;

          return (
            <g key={i}>
              {/* Wire to light */}
              <line
                x1={x}
                y1="10"
                x2={x}
                y2="25"
                stroke="#2a2a2a"
                strokeWidth="1"
              />
              {/* Light bulb */}
              <circle
                cx={x}
                cy="32"
                r="8"
                fill={color}
                className="christmas-light"
                style={{
                  filter: `drop-shadow(0 0 8px ${color})`,
                  animationDelay: `${delay}s`
                }}
              />
              {/* Light reflection */}
              <circle
                cx={x - 2}
                cy="30"
                r="2"
                fill="rgba(255, 255, 255, 0.6)"
                className="christmas-light"
                style={{ animationDelay: `${delay}s` }}
              />
            </g>
          );
        })}
      </svg>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .christmas-light {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ChristmasLights;
