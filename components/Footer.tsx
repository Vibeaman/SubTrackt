import React from 'react';
import { Twitter, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-8 border-t border-gray-200 dark:border-gray-800 text-center glass-panel backdrop-blur-md">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          Made by <span className="text-blue-600 dark:text-blue-400 font-bold">Vibeaman</span>
        </p>
        
        <div className="flex gap-6">
          <a
            href="https://twitter.com/web3vibeaman"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors duration-300"
          >
            <Twitter className="w-5 h-5" />
            <span className="text-sm">web3vibeaman</span>
          </a>
          <a
            href="https://t.me/Vibeaman"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors duration-300"
          >
            <Send className="w-5 h-5" />
            <span className="text-sm">@Vibeaman</span>
          </a>
        </div>
        
        <p className="text-xs text-gray-400 mt-2">
          &copy; {new Date().getFullYear()} SubTrak. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
