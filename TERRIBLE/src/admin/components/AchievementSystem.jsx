import React, { useState, useEffect } from 'react';
import { Trophy, X, Lock, Star, Zap, Target, Award, CheckCircle, Moon, Sun, Palette } from 'lucide-react';

const achievements = [
  {
    id: 'first_login',
    name: 'Welcome Aboard',
    description: 'Login for the first time',
    icon: Star,
    color: 'blue',
  },
  {
    id: 'ban_100',
    name: 'Ban Hammer',
    description: 'Ban 100 IPs',
    icon: Trophy,
    color: 'red',
    requirement: 100,
  },
  {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Active between 12am-4am',
    icon: Moon,
    color: 'purple',
  },
  {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Active between 5am-7am',
    icon: Sun,
    color: 'yellow',
  },
  {
    id: 'session_100',
    name: 'Session Master',
    description: 'Handle 100 sessions',
    icon: Target,
    color: 'green',
    requirement: 100,
  },
  {
    id: 'theme_collector',
    name: 'Theme Collector',
    description: 'Try all 4 themes',
    icon: Palette,
    color: 'pink',
    requirement: 4,
  },
  {
    id: 'quick_response',
    name: 'Lightning Fast',
    description: 'Clear a session in under 10 seconds',
    icon: Zap,
    color: 'yellow',
  },
  {
    id: 'perfect_week',
    name: 'Perfect Attendance',
    description: 'Login 7 days in a row',
    icon: Award,
    color: 'purple',
    requirement: 7,
  },
];

const AchievementBadge = ({ achievement, unlocked, progress = 0 }) => {
  const Icon = achievement.icon;
  const colors = {
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400',
    red: 'from-red-500/20 to-red-600/20 border-red-500/30 text-red-400',
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400',
    yellow: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-400',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30 text-green-400',
    pink: 'from-pink-500/20 to-pink-600/20 border-pink-500/30 text-pink-400',
  };

  return (
    <div
      className={`
        relative p-4 rounded-xl border transition-all duration-300
        ${unlocked
          ? `bg-gradient-to-br ${colors[achievement.color]} hover:scale-105 cursor-pointer`
          : 'bg-gray-900/50 border-gray-800/50 hover:border-gray-700 opacity-60'
        }
      `}
    >
      {unlocked && (
        <div className="absolute -top-2 -right-2">
          <CheckCircle className="w-6 h-6 text-green-400 bg-[#161A22] rounded-full" />
        </div>
      )}

      <div className="flex flex-col items-center text-center space-y-2">
        <div
          className={`
            p-3 rounded-full transition-all duration-300
            ${unlocked ? `bg-gradient-to-br ${colors[achievement.color]}` : 'bg-gray-800/50'}
          `}
        >
          {unlocked ? (
            <Icon className={`w-8 h-8 ${achievement.color === 'yellow' ? 'text-yellow-400' : achievement.color === 'blue' ? 'text-blue-400' : achievement.color === 'red' ? 'text-red-400' : achievement.color === 'green' ? 'text-green-400' : achievement.color === 'purple' ? 'text-purple-400' : 'text-pink-400'}`} />
          ) : (
            <Lock className="w-8 h-8 text-gray-600" />
          )}
        </div>

        <div>
          <h3 className={`font-semibold text-sm ${unlocked ? 'text-white' : 'text-gray-500'}`}>
            {achievement.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>

          {achievement.requirement && !unlocked && progress > 0 && (
            <div className="mt-2">
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${Math.min((progress / achievement.requirement) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {progress} / {achievement.requirement}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function AchievementSystem({ onClose }) {
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : [];
  });

  const [achievementProgress, setAchievementProgress] = useState(() => {
    const saved = localStorage.getItem('achievementProgress');
    return saved ? JSON.parse(saved) : {};
  });

  const unlockedCount = unlockedAchievements.length;
  const totalCount = achievements.length;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#161A22] border border-gray-800/50 rounded-xl shadow-2xl m-4">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#161A22] border-b border-gray-800/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
                <Trophy className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Achievements</h2>
                <p className="text-sm text-gray-400">
                  {unlockedCount} of {totalCount} unlocked
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500"
                style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Achievement Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <AchievementBadge
                key={achievement.id}
                achievement={achievement}
                unlocked={unlockedAchievements.includes(achievement.id)}
                progress={achievementProgress[achievement.id] || 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to unlock achievements
export const unlockAchievement = (achievementId) => {
  const saved = localStorage.getItem('achievements');
  const unlocked = saved ? JSON.parse(saved) : [];

  if (!unlocked.includes(achievementId)) {
    unlocked.push(achievementId);
    localStorage.setItem('achievements', JSON.stringify(unlocked));
    return true; // Achievement was newly unlocked
  }
  return false;
};

// Helper function to update achievement progress
export const updateAchievementProgress = (achievementId, progress) => {
  const saved = localStorage.getItem('achievementProgress');
  const progressData = saved ? JSON.parse(saved) : {};

  progressData[achievementId] = progress;
  localStorage.setItem('achievementProgress', JSON.stringify(progressData));
};
