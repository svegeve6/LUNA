import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Pumpkin SVG for Halloween theme
const PumpkinIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Pumpkin body */}
    <ellipse cx="50" cy="60" rx="35" ry="30" fill="#FF8C00" stroke="#CC6600" strokeWidth="2"/>
    <ellipse cx="35" cy="60" rx="15" ry="28" fill="#FFA500" stroke="#CC6600" strokeWidth="1"/>
    <ellipse cx="50" cy="60" rx="15" ry="28" fill="#FF8C00" stroke="#CC6600" strokeWidth="1"/>
    <ellipse cx="65" cy="60" rx="15" ry="28" fill="#FFA500" stroke="#CC6600" strokeWidth="1"/>
    {/* Stem */}
    <rect x="47" y="30" width="6" height="10" fill="#228B22" rx="2"/>
    <ellipse cx="50" cy="30" rx="4" ry="3" fill="#2E8B57"/>
    {/* Face */}
    <path d="M 30 55 L 35 50 L 40 55 Z" fill="#000" />
    <path d="M 60 55 L 65 50 L 70 55 Z" fill="#000" />
    <path d="M 35 70 Q 50 80 65 70" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

// Santa SVG for Christmas theme
const SantaIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Hat */}
    <path d="M 25 45 L 50 20 L 75 45 Z" fill="#DC2626"/>
    <ellipse cx="50" cy="20" rx="8" ry="8" fill="#FFF"/>
    <rect x="20" y="43" width="60" height="8" fill="#FFF" rx="2"/>
    {/* Face */}
    <circle cx="50" cy="60" r="20" fill="#FFD7BA"/>
    {/* Eyes */}
    <circle cx="43" cy="57" r="2.5" fill="#000"/>
    <circle cx="57" cy="57" r="2.5" fill="#000"/>
    {/* Nose */}
    <circle cx="50" cy="62" r="3" fill="#FF6B6B"/>
    {/* Mouth */}
    <path d="M 43 68 Q 50 72 57 68" fill="none" stroke="#8B4513" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Beard */}
    <ellipse cx="50" cy="75" rx="18" ry="12" fill="#FFF"/>
    <path d="M 32 70 Q 30 78 35 82" fill="#FFF" stroke="#E5E5E5" strokeWidth="1"/>
    <path d="M 68 70 Q 70 78 65 82" fill="#FFF" stroke="#E5E5E5" strokeWidth="1"/>
  </svg>
);

// Leaf SVG for Fall theme
const LeafIcon = ({ rotation = 0, className = "" }) => (
  <svg viewBox="0 0 50 50" className={`${className}`} style={{ transform: `rotate(${rotation}deg)` }}>
    <path
      d="M 25 5 Q 35 15 35 25 Q 35 35 25 45 Q 25 35 15 25 Q 15 15 25 5 Z"
      fill="#D97706"
      stroke="#92400E"
      strokeWidth="1"
    />
    <path
      d="M 25 5 Q 25 25 25 45"
      stroke="#92400E"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M 25 15 Q 30 20 35 25"
      stroke="#92400E"
      strokeWidth="0.8"
      fill="none"
    />
    <path
      d="M 25 30 Q 30 32 33 35"
      stroke="#92400E"
      strokeWidth="0.8"
      fill="none"
    />
  </svg>
);

// Christmas lights component
const ChristmasLights = () => {
  const colors = ['#DC2626', '#16A34A', '#FCD34D', '#3B82F6', '#A855F7'];

  return (
    <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden pointer-events-none z-10">
      {/* Wire */}
      <svg className="w-full h-full" preserveAspectRatio="none">
        <path
          d="M -10 20 Q 25 15 50 20 T 110 20"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
        />
      </svg>
      {/* Lights */}
      <div className="absolute top-0 left-0 right-0 flex justify-around px-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="relative animate-pulse"
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '2s'
            }}
          >
            <div
              className="w-3 h-4 rounded-full opacity-80"
              style={{
                backgroundColor: colors[i % colors.length],
                boxShadow: `0 0 10px ${colors[i % colors.length]}`
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Falling leaves animation for Fall theme
const FallingLeaves = () => {
  const leaves = Array.from({ length: 8 }).map((_, i) => ({
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${10 + Math.random() * 10}s`,
    rotation: Math.random() * 360
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {leaves.map((leaf, i) => (
        <div
          key={i}
          className="absolute w-8 h-8 animate-fall opacity-40"
          style={{
            left: leaf.left,
            top: '-10%',
            animationDelay: leaf.delay,
            animationDuration: leaf.duration,
          }}
        >
          <LeafIcon rotation={leaf.rotation} className="w-full h-full" />
        </div>
      ))}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 0.6;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
};

// Main ThemeDecorations component
export default function ThemeDecorations() {
  const { currentTheme } = useTheme();

  return (
    <>
      {currentTheme === 'christmas' && <ChristmasLights />}
      {currentTheme === 'fall' && <FallingLeaves />}
    </>
  );
}

// Profile avatar component based on theme
export function ThemeAvatar({ className = "" }) {
  const { currentTheme } = useTheme();

  const getAvatarContent = () => {
    switch (currentTheme) {
      case 'halloween':
        return (
          <div className={`${className} bg-gradient-to-br from-orange-500/20 to-purple-600/20 rounded-full p-3 border-2 border-orange-500/30`}>
            <PumpkinIcon />
          </div>
        );
      case 'christmas':
        return (
          <div className={`${className} bg-gradient-to-br from-red-500/20 to-green-600/20 rounded-full p-3 border-2 border-red-500/30`}>
            <SantaIcon />
          </div>
        );
      case 'fall':
        return (
          <div className={`${className} bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-full p-3 border-2 border-amber-500/30 relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <LeafIcon rotation={-20} className="w-1/2 h-1/2 absolute top-2 left-2 opacity-70" />
              <LeafIcon rotation={45} className="w-1/2 h-1/2 absolute bottom-2 right-2 opacity-70" />
              <LeafIcon rotation={0} className="w-3/5 h-3/5 opacity-90" />
            </div>
          </div>
        );
      default:
        // Lunar theme - default user icon
        return (
          <div className={`${className} bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full p-3 border-2 border-blue-500/30 flex items-center justify-center`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full text-blue-400">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        );
    }
  };

  return getAvatarContent();
}
