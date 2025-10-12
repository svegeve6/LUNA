import React, { createContext, useContext, useState, useEffect } from 'react';
import { themes, applyTheme, initializeTheme, getAllThemes } from '../themes/themeConfig';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('lunar');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [availableThemes, setAvailableThemes] = useState(() => getAllThemes());

  useEffect(() => {
    // Initialize theme on mount
    const savedTheme = initializeTheme();
    setCurrentTheme(savedTheme);

    // Listen for custom theme changes
    const handleStorageChange = () => {
      setAvailableThemes(getAllThemes());
    };

    window.addEventListener('customThemeAdded', handleStorageChange);
    return () => window.removeEventListener('customThemeAdded', handleStorageChange);
  }, []);

  const changeTheme = (themeName) => {
    if (availableThemes[themeName] && themeName !== currentTheme) {
      setIsTransitioning(true);

      // Wait for fade out
      setTimeout(() => {
        applyTheme(themeName);
        setCurrentTheme(themeName);

        // Fade back in
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 300);
    }
  };

  const value = {
    currentTheme,
    changeTheme,
    isTransitioning,
    themes: Object.keys(availableThemes).map(key => ({
      id: key,
      name: availableThemes[key].name
    }))
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}