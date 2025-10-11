import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const mascots = [
  { id: 'default', emoji: null },
  { id: 'smile', emoji: '😊' },
  { id: 'cat', emoji: '🐱' },
  { id: 'dog', emoji: '🐶' },
  { id: 'robot', emoji: '🤖' },
  { id: 'alien', emoji: '👽' },
  { id: 'unicorn', emoji: '🦄' },
  { id: 'panda', emoji: '🐼' },
  { id: 'fox', emoji: '🦊' },
  { id: 'bear', emoji: '🐻' },
  { id: 'koala', emoji: '🐨' },
  { id: 'tiger', emoji: '🐯' },
];

const getCurrentMascot = () => {
  const mascotId = localStorage.getItem('selectedMascot') || 'default';
  return mascots.find(m => m.id === mascotId) || mascots[0];
};

const SeasonalAvatar = ({ className = "w-12 h-12" }) => {
  const { currentTheme } = useTheme();
  const [mascot, setMascot] = useState(() => getCurrentMascot());

  useEffect(() => {
    const handleMascotChange = () => {
      setMascot(getCurrentMascot());
    };

    window.addEventListener('mascotChange', handleMascotChange);
    return () => window.removeEventListener('mascotChange', handleMascotChange);
  }, []);

  const getAvatarContent = () => {
    // Seasonal avatars override custom mascots
    switch (currentTheme) {
      case 'halloween':
        return (
          <div className={`${className} rounded-full bg-gradient-to-br from-orange-600 to-purple-700 flex items-center justify-center text-white shadow-lg shadow-orange-500/40 transition-all duration-300 hover:scale-110 border-2 border-orange-500/30`}>
            <span className="text-3xl">🎃</span>
          </div>
        );
      case 'christmas':
        return (
          <div className={`${className} rounded-full bg-gradient-to-br from-red-600 to-green-700 flex items-center justify-center text-white shadow-lg shadow-red-500/40 transition-all duration-300 hover:scale-110 border-2 border-red-500/40`}>
            <span className="text-3xl">🎅</span>
          </div>
        );
      case 'fall':
        return (
          <div className={`${className} rounded-full bg-gradient-to-br from-orange-600 to-red-700 flex items-center justify-center text-white shadow-lg shadow-orange-600/40 transition-all duration-300 hover:scale-110 border-2 border-amber-600/40`}>
            <span className="text-3xl">🍁</span>
          </div>
        );
      default:
        // Use custom mascot for default theme
        if (mascot.emoji) {
          return (
            <div className={`${className} rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white transition-all duration-300 hover:scale-110`}>
              <span className="text-3xl">{mascot.emoji}</span>
            </div>
          );
        }
        return (
          <div className={`${className} rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white transition-all duration-300 hover:scale-110`}>
            <User className="w-6 h-6" />
          </div>
        );
    }
  };

  return getAvatarContent();
};

export default SeasonalAvatar;
