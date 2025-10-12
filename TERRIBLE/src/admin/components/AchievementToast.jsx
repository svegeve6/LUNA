import React, { useEffect, useState } from 'react';
import { Trophy, X } from 'lucide-react';

export default function AchievementToast({ achievement, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in
    setTimeout(() => setIsVisible(true), 100);

    // Auto close after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-[200] transition-all duration-300 transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="bg-gradient-to-r from-yellow-500/90 to-orange-500/90 backdrop-blur-sm rounded-xl border border-yellow-400/30 shadow-2xl p-4 min-w-[300px]">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-white/20">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white">Achievement Unlocked!</h3>
              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(onClose, 300);
                }}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-white/90 font-semibold mt-1">{achievement.name}</p>
            <p className="text-white/70 text-sm">{achievement.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
