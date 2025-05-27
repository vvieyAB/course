import { useState } from 'react';

export interface ThemeToggleProps {
  onChange?: (theme: string) => void;
  defaultTheme?: string;
  availableThemes?: string[];
}

export function ThemeToggle({
  onChange,
  defaultTheme = 'origins',
  availableThemes = ['origins', 'systems', 'crypto', 'bitcoin', 'future']
}: ThemeToggleProps) {
  const [activeTheme, setActiveTheme] = useState(defaultTheme);
  
  const handleThemeChange = (theme: string) => {
    setActiveTheme(theme);
    if (onChange) onChange(theme);
  };
  
  // Different colors for different themes
  const getThemeColor = (theme: string) => {
    switch (theme) {
      case 'origins': return '#EE720B';
      case 'systems': return '#3A7CA5';
      case 'crypto': return '#16A085';
      case 'bitcoin': return '#F7931A';
      case 'future': return '#9B59B6';
      default: return '#EE720B';
    }
  };
  
  return (
    <div className="flex flex-wrap gap-2">
      {availableThemes.map(theme => (
        <button
          key={theme}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            activeTheme === theme ? 'text-white font-medium' : 'text-gray-200 bg-gray-700/30 hover:bg-gray-700/50'
          }`}
          style={{ 
            backgroundColor: activeTheme === theme ? getThemeColor(theme) : undefined 
          }}
          onClick={() => handleThemeChange(theme)}
        >
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </button>
      ))}
    </div>
  );
}