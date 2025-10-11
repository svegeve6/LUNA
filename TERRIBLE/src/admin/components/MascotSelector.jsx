import React, { useState, useEffect } from 'react';
import { User, Smile, Cat, Dog, Ghost, Skull, Sparkles, Heart, Star, Zap } from 'lucide-react';

const mascots = [
  { id: 'default', icon: User, name: 'Default', emoji: null },
  { id: 'smile', icon: Smile, name: 'Smiley', emoji: '😊' },
  { id: 'cat', icon: Cat, name: 'Cat', emoji: '🐱' },
  { id: 'dog', icon: Dog, name: 'Dog', emoji: '🐶' },
  { id: 'robot', icon: Zap, name: 'Robot', emoji: '🤖' },
  { id: 'alien', icon: Sparkles, name: 'Alien', emoji: '👽' },
  { id: 'unicorn', icon: Star, name: 'Unicorn', emoji: '🦄' },
  { id: 'panda', icon: Heart, name: 'Panda', emoji: '🐼' },
  { id: 'fox', icon: Sparkles, name: 'Fox', emoji: '🦊' },
  { id: 'bear', icon: Heart, name: 'Bear', emoji: '🐻' },
  { id: 'koala', icon: Heart, name: 'Koala', emoji: '🐨' },
  { id: 'tiger', icon: Zap, name: 'Tiger', emoji: '🐯' },
];

export default function MascotSelector() {
  const [selectedMascot, setSelectedMascot] = useState(() => {
    return localStorage.getItem('selectedMascot') || 'default';
  });

  const handleSelect = (mascotId) => {
    setSelectedMascot(mascotId);
    localStorage.setItem('selectedMascot', mascotId);
    // Trigger a custom event so other components can react
    window.dispatchEvent(new CustomEvent('mascotChange', { detail: mascotId }));
  };

  return (
    <div className="px-4 py-3.5">
      <div className="flex items-start space-x-3">
        <Smile className="w-5 h-5 mt-1 theme-accent" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-medium theme-text-primary">
                Mascot
              </h3>
              <p className="text-xs theme-text-muted mt-1">
                Choose your profile mascot
              </p>
            </div>
          </div>

          {/* Mascot Grid */}
          <div className="grid grid-cols-4 gap-2">
            {mascots.map((mascot) => {
              const Icon = mascot.icon;
              const isSelected = selectedMascot === mascot.id;

              return (
                <button
                  key={mascot.id}
                  onClick={() => handleSelect(mascot.id)}
                  className={`
                    relative p-3 rounded-lg transition-all duration-200
                    ${isSelected
                      ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-2 ring-blue-500/50 scale-105'
                      : 'theme-secondary-bg hover:theme-hover-bg hover:scale-105'
                    }
                  `}
                  title={mascot.name}
                >
                  <div className="flex flex-col items-center space-y-1">
                    {mascot.emoji ? (
                      <span className="text-2xl">{mascot.emoji}</span>
                    ) : (
                      <Icon className={`w-6 h-6 ${isSelected ? 'theme-accent' : 'theme-text-muted'}`} />
                    )}
                    <span className={`text-xs ${isSelected ? 'theme-accent font-medium' : 'theme-text-muted'}`}>
                      {mascot.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

