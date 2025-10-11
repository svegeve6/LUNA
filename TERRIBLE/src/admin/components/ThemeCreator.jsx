import React, { useState } from 'react';
import { Palette, Save, X, Sparkles } from 'lucide-react';
import { themes } from '../themes/themeConfig';

const ColorPicker = ({ label, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-xs text-gray-400">{label}</label>
    <div className="flex items-center space-x-2">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-12 h-10 rounded cursor-pointer border border-gray-700"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-3 py-2 rounded-lg bg-[#1C2029] border border-gray-800/50 text-gray-300 text-sm font-mono"
        placeholder="#000000"
      />
    </div>
  </div>
);

export default function ThemeCreator({ onClose, onSave }) {
  const [themeName, setThemeName] = useState('');
  const [colors, setColors] = useState({
    pageBg: '#0F1014',
    primaryBg: '#161A22',
    secondaryBg: '#1C2029',
    accent: '#3B82F6',
    accentHover: '#2563EB',
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
    success: '#10B981',
    danger: '#EF4444',
  });

  const handleColorChange = (key, value) => {
    setColors({ ...colors, [key]: value });
  };

  const handleSave = () => {
    if (!themeName.trim()) {
      alert('Please enter a theme name');
      return;
    }

    const newTheme = {
      name: themeName,
      colors: {
        ...colors,
        // Generate additional colors based on main colors
        tertiaryBg: colors.secondaryBg,
        borderPrimary: colors.accent + '20',
        borderSecondary: colors.accent + '10',
        borderAccent: colors.accent + '30',
        textMuted: colors.textSecondary + '80',
        accentBg: colors.accent + '10',
        successBg: colors.success + '10',
        dangerBg: colors.danger + '10',
        warningBg: '#F59E0B10',
        warning: '#F59E0B',
        purple: '#A855F7',
        purpleBg: '#A855F710',
        hoverBg: 'rgba(255, 255, 255, 0.08)',
        hoverBorder: 'rgba(255, 255, 255, 0.2)',
        gradientFrom: colors.accent + '08',
        gradientTo: 'transparent',
      }
    };

    onSave(themeName.toLowerCase().replace(/\s+/g, '_'), newTheme);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#161A22] border border-gray-800/50 rounded-xl shadow-2xl m-4">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#161A22] border-b border-gray-800/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Create Custom Theme</h2>
                <p className="text-sm text-gray-400">Design your own color scheme</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Theme Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Theme Name</label>
            <input
              type="text"
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              placeholder="My Custom Theme"
              className="w-full px-4 py-2 rounded-lg bg-[#1C2029] border border-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
            />
          </div>

          {/* Color Pickers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Background Colors</h3>
              <ColorPicker
                label="Page Background"
                value={colors.pageBg}
                onChange={(val) => handleColorChange('pageBg', val)}
              />
              <ColorPicker
                label="Primary Background"
                value={colors.primaryBg}
                onChange={(val) => handleColorChange('primaryBg', val)}
              />
              <ColorPicker
                label="Secondary Background"
                value={colors.secondaryBg}
                onChange={(val) => handleColorChange('secondaryBg', val)}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Accent Colors</h3>
              <ColorPicker
                label="Accent Color"
                value={colors.accent}
                onChange={(val) => handleColorChange('accent', val)}
              />
              <ColorPicker
                label="Accent Hover"
                value={colors.accentHover}
                onChange={(val) => handleColorChange('accentHover', val)}
              />
              <ColorPicker
                label="Success Color"
                value={colors.success}
                onChange={(val) => handleColorChange('success', val)}
              />
              <ColorPicker
                label="Danger Color"
                value={colors.danger}
                onChange={(val) => handleColorChange('danger', val)}
              />
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Preview</h3>
            <div
              className="p-6 rounded-xl border"
              style={{
                backgroundColor: colors.primaryBg,
                borderColor: colors.accent + '30'
              }}
            >
              <div className="space-y-3">
                <h4 className="font-semibold" style={{ color: colors.textPrimary }}>
                  Sample Card
                </h4>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  This is how your theme will look
                </p>
                <div className="flex space-x-2">
                  <button
                    className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                    style={{ backgroundColor: colors.accent }}
                  >
                    Accent Button
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                    style={{ backgroundColor: colors.success }}
                  >
                    Success
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                    style={{ backgroundColor: colors.danger }}
                  >
                    Danger
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#161A22] border-t border-gray-800/50 p-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Theme</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
