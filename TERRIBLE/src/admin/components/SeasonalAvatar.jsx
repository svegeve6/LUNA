import React from 'react';
import { User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const SeasonalAvatar = ({ className = "w-12 h-12" }) => {
  const { currentTheme } = useTheme();

  const getAvatarContent = () => {
    switch (currentTheme) {
      case 'halloween':
        return (
          <div className={`${className} rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-110`}>
            <span className="text-3xl">🎃</span>
          </div>
        );
      case 'christmas':
        return (
          <div className={`${className} rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white shadow-lg shadow-red-500/30 transition-all duration-300 hover:scale-110`}>
            <span className="text-3xl">🎅</span>
          </div>
        );
      case 'fall':
        return (
          <div className={`${className} rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-lg shadow-amber-500/30 transition-all duration-300 hover:scale-110`}>
            <span className="text-3xl">🍁</span>
          </div>
        );
      default:
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
