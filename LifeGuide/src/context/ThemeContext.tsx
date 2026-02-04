import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserMode = 'default' | 'elder' | 'accessibility';

export interface Theme {
  mode: UserMode;
  colors: {
    background: string;
    text: string;
    subText: string;
    primary: string;
    secondary: string;
    card: string;
    border: string;
    flashCardBg: string;
    flashCardText: string;
  };
  typography: {
    baseSize: number;
    titleSize: number;
    stepTitleSize: number;
    flashCardSize: number;
    scale: number;
    h1: { fontSize: number; lineHeight: number };
    h2: { fontSize: number; lineHeight: number };
    h3: { fontSize: number; lineHeight: number };
    body: { fontSize: number; lineHeight: number };
    caption: { fontSize: number; lineHeight: number };
  };
  spacing: {
    padding: number;
    gap: number;
    borderRadius: number;
  };
}

const themes: Record<UserMode, Theme> = {
  default: {
    mode: 'default',
    colors: {
      background: '#F9FAFB',
      text: '#1F2937',
      subText: '#6B7280',
      primary: '#3B82F6',
      secondary: '#10B981',
      card: '#FFFFFF',
      border: '#E5E7EB',
      flashCardBg: '#FFFBEB',
      flashCardText: '#92400E',
    },
    typography: {
      baseSize: 16,
      titleSize: 24,
      stepTitleSize: 18,
      flashCardSize: 28,
      scale: 1,
      h1: { fontSize: 32, lineHeight: 40 },
      h2: { fontSize: 24, lineHeight: 32 },
      h3: { fontSize: 20, lineHeight: 28 },
      body: { fontSize: 16, lineHeight: 24 },
      caption: { fontSize: 14, lineHeight: 20 },
    },
    spacing: {
      padding: 16,
      gap: 16,
      borderRadius: 12,
    },
  },
  elder: {
    mode: 'elder',
    colors: {
      background: '#FFFFFF',
      text: '#000000',
      subText: '#333333',
      primary: '#D946EF', // High saturation
      secondary: '#16A34A',
      card: '#FFF7ED',
      border: '#000000',
      flashCardBg: '#FEF3C7',
      flashCardText: '#000000',
    },
    typography: {
      baseSize: 28,
      titleSize: 40,
      stepTitleSize: 32,
      flashCardSize: 44,
      scale: 1.5,
      // FORCE 28px MINIMUM for body
      h1: { fontSize: 48, lineHeight: 56 },
      h2: { fontSize: 40, lineHeight: 48 },
      h3: { fontSize: 32, lineHeight: 40 },
      body: { fontSize: 28, lineHeight: 40 }, // Strong enforcement
      caption: { fontSize: 24, lineHeight: 32 },
    },
    spacing: {
      padding: 24,
      gap: 24,
      borderRadius: 8,
    },
  },
  accessibility: {
    mode: 'accessibility',
    colors: {
      background: '#18181B',
      text: '#F4F4F5',
      subText: '#A1A1AA',
      primary: '#2DD4BF',
      secondary: '#34D399',
      card: '#27272A',
      border: '#3F3F46',
      flashCardBg: '#3F3F46',
      flashCardText: '#FFFFFF',
    },
    typography: {
      baseSize: 20,
      titleSize: 28,
      stepTitleSize: 22,
      flashCardSize: 32,
      scale: 1.25,
      h1: { fontSize: 36, lineHeight: 44 },
      h2: { fontSize: 28, lineHeight: 36 },
      h3: { fontSize: 24, lineHeight: 32 },
      body: { fontSize: 20, lineHeight: 30 },
      caption: { fontSize: 16, lineHeight: 24 },
    },
    spacing: {
      padding: 20,
      gap: 20,
      borderRadius: 16,
    },
  },
};

interface ThemeContextType {
  theme: Theme;
  mode: UserMode;
  setMode: (mode: UserMode) => void;
  colors: Theme['colors'];
  typography: Theme['typography'];
  spacing: Theme['spacing'];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<UserMode>('default');

  const theme = themes[mode];

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      mode, 
      setMode,
      colors: theme.colors,
      typography: theme.typography,
      spacing: theme.spacing
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
