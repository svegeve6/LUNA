import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ChristmasLights = ({ position = 'top' }) => {
  const { currentTheme } = useTheme();

  if (currentTheme !== 'christmas') {
    return null;
  }

  const colors = ['#DC2626', '#16A34A', '#DC2626', '#FCD34D', '#16A34A', '#DC2626'];
  const lightCount = position === 'top' ? 15 : 8;

  return (
    <div className={`absolute ${position === 'top' ? 'top-0 left-0 right-0' : 'left-0 right-0'} pointer-events-none z-40 h-8`}>
      <div className="relative w-full h-full flex items-start justify-around px-4">
        {Array.from({ length: lightCount }).map((_, i) => {
          const color = colors[i % colors.length];
          const delay = i * 0.15;

          return (
            <div key={i} className="flex flex-col items-center" style={{ animationDelay: `${delay}s` }}>
              {/* Wire */}
              <div className="w-px h-2 bg-gray-700/50"></div>
              {/* Light bulb */}
              <div
                className="w-3 h-4 rounded-b-full christmas-light relative"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 10px ${color}, 0 0 20px ${color}40`,
                  animationDelay: `${delay}s`
                }}
              >
                {/* Socket cap */}
                <div className="absolute -top-1 left-0 right-0 h-1 bg-gray-800 rounded-sm"></div>
                {/* Highlight */}
                <div className="absolute top-1 left-1 w-1 h-1 bg-white/60 rounded-full"></div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 1;
            filter: brightness(1);
          }
          50% {
            opacity: 0.5;
            filter: brightness(0.7);
          }
        }
        .christmas-light {
          animation: twinkle 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ChristmasLights;
