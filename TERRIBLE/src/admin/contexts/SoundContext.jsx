import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';

const SoundContext = createContext(null);

export function SoundProvider({ children }) {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const { currentTheme } = useTheme();
  const [audio, setAudio] = useState(null);

  // Sound URLs for each theme
  const themeSounds = {
    halloween: 'https://assets.mixkit.co/active_storage/sfx/2466/2466-preview.mp3', // Spooky ambient
    christmas: 'https://assets.mixkit.co/active_storage/sfx/1994/1994-preview.mp3', // Jingle bells
    fall: 'https://assets.mixkit.co/active_storage/sfx/2394/2394-preview.mp3', // Wind rustling
  };

  useEffect(() => {
    // Clean up previous audio
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    // Play new theme sound if enabled
    if (soundEnabled && themeSounds[currentTheme]) {
      const newAudio = new Audio(themeSounds[currentTheme]);
      newAudio.loop = true;
      newAudio.volume = 0.3;

      newAudio.play().catch(err => {
        console.log('Audio playback failed:', err);
      });

      setAudio(newAudio);
    } else {
      setAudio(null);
    }

    // Cleanup on unmount
    return () => {
      if (audio) {
        audio.pause();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTheme, soundEnabled]);

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem('soundEnabled', JSON.stringify(newState));
  };

  const value = {
    soundEnabled,
    toggleSound,
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}
