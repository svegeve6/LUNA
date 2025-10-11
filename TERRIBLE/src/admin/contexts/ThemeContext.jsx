import React, { createContext, useContext, useState, useEffect } from 'react';
import { themes, applyTheme, initializeTheme } from '../themes/themeConfig';
import { useAdminSocket } from './AdminSocket';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('lunar');

  // Safely get socket context - it might not be available during initial render
  let settings, updateSettings, socket;
  try {
    const socketContext = useAdminSocket();
    settings = socketContext.settings;
    updateSettings = socketContext.updateSettings;
    socket = socketContext.socket;
  } catch (e) {
    // AdminSocket context not available yet
  }

  useEffect(() => {
    // Initialize theme from server settings or localStorage fallback
    if (settings?.theme) {
      applyTheme(settings.theme);
      setCurrentTheme(settings.theme);
    } else {
      const savedTheme = initializeTheme();
      setCurrentTheme(savedTheme);
    }
  }, [settings?.theme]);

  // Listen for theme updates from other clients
  useEffect(() => {
    if (!socket) return;

    const handleSettingsUpdate = (newSettings) => {
      if (newSettings.theme && newSettings.theme !== currentTheme) {
        applyTheme(newSettings.theme);
        setCurrentTheme(newSettings.theme);
      }
    };

    socket.on('settings_updated', handleSettingsUpdate);

    return () => {
      socket.off('settings_updated', handleSettingsUpdate);
    };
  }, [socket, currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      applyTheme(themeName);
      setCurrentTheme(themeName);

      // Update theme on server so all clients sync
      if (updateSettings) {
        updateSettings({ theme: themeName });
      }
    }
  };

  const value = {
    currentTheme,
    changeTheme,
    themes: Object.keys(themes).map(key => ({
      id: key,
      name: themes[key].name
    }))
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
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