import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Settings, Activity, User, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import SeasonalAvatar from './SeasonalAvatar';

const MacOSLayout = ({ children, activeView, onViewChange }) => {
  const [pruneJuiceLevel, setPruneJuiceLevel] = useState(0);
  const { userRole } = useAuth();
  const { currentTheme } = useTheme();

  useEffect(() => {
    // Generate deterministic prune juice level based on IP and date
    const generateDailyPruneJuice = async () => {
      try {
        // Get user's IP address
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const userIP = data.ip;

        // Get current date (YYYY-MM-DD format)
        const today = new Date().toISOString().split('T')[0];

        // Create a seed from IP + date
        const seed = userIP + today;

        // Simple hash function to convert seed to number
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
          const char = seed.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash; // Convert to 32bit integer
        }

        // Convert hash to percentage (0-100)
        const percentage = Math.abs(hash % 101);
        setPruneJuiceLevel(percentage);
      } catch (error) {
        // Fallback to random if IP fetch fails
        console.error('Failed to fetch IP, using fallback:', error);
        setPruneJuiceLevel(Math.floor(Math.random() * 101));
      }
    };

    generateDailyPruneJuice();
  }, []);

  // Show different navigation based on user role
  const navItems = userRole === 'admin' ? [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'callers', icon: Phone, label: 'Callers' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ] : [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  ];

  return (
    <div className="min-h-screen theme-page-bg theme-text-primary flex">
      {/* Sidebar */}
      <div className="w-72 theme-primary-bg border-r theme-border flex flex-col relative">
        {/* User Profile Section */}
        <div className="p-6 border-b border-gray-800/50">
          <div className="flex items-center space-x-3">
            <SeasonalAvatar className="w-12 h-12" />
            <div className="flex-1">
              <div className="font-medium text-white">Luna Panel</div>
              <div className={`text-xs px-2 py-0.5 rounded inline-block mt-1 ${
                userRole === 'admin'
                  ? 'text-blue-400 bg-blue-500/20'
                  : 'text-purple-400 bg-purple-500/20'
              }`}>
                {userRole === 'admin' ? 'ADMIN' : 'CALLER'}
              </div>
              <div className="text-xs text-gray-500 mt-1">All-in-One Dashboard</div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 py-4 relative">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 transition-all duration-200 relative
                ${activeView === item.id
                  ? 'bg-blue-500/10 text-blue-400 border-r-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Prune Juice Meter */}
        <div className="p-6 border-t border-gray-800/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">Prune Juice Meter</span>
            <Activity className={`w-4 h-4 ${currentTheme === 'christmas' ? 'text-red-400' : 'text-purple-400'}`} />
          </div>
          <div className="h-2 bg-[#1C2029] rounded-full overflow-hidden">
            {currentTheme === 'christmas' ? (
              <div
                className="h-full rounded-full candy-cane-stripes"
                style={{ width: `${pruneJuiceLevel}%` }}
              />
            ) : currentTheme === 'fall' ? (
              <div
                className="h-full rounded-full"
                style={{
                  width: `${pruneJuiceLevel}%`,
                  background: 'linear-gradient(90deg, #d97706, #ea580c, #dc2626)'
                }}
              />
            ) : currentTheme === 'halloween' ? (
              <div
                className="h-full rounded-full"
                style={{
                  width: `${pruneJuiceLevel}%`,
                  background: 'linear-gradient(90deg, #ff8c00, #9333ea)'
                }}
              />
            ) : (
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                style={{ width: `${pruneJuiceLevel}%` }}
              />
            )}
          </div>
          <div className="text-xs text-gray-600 mt-1 text-right">{pruneJuiceLevel}%</div>
        </div>

        <style>{`
          .candy-cane-stripes {
            background: repeating-linear-gradient(
              45deg,
              #ffffff,
              #ffffff 5px,
              #dc2626 5px,
              #dc2626 10px
            );
            background-size: 14.14px 14.14px;
            animation: candy-cane-animation 0.6s linear infinite;
          }

          @keyframes candy-cane-animation {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 14.14px 0;
            }
          }
        `}</style>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#0F1117] overflow-auto">
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MacOSLayout;