import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full glass-panel hover:bg-white/10 transition-all duration-300 transform hover:scale-110 shadow-lg group"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
      ) : (
        <Moon className="w-6 h-6 text-indigo-600 drop-shadow-[0_0_8px_rgba(79,70,229,0.5)]" />
      )}
    </button>
  );
};
