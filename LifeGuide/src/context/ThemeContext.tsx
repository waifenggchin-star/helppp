import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserMode = 'default' | 'elder' | 'accessibility';

export interface Theme {
  mode: UserMode;
  colors: {
    background: string;
    text: string;
    subText: string;
    primary: string;
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
      primary: '#D946EF', // 高饱和度
      card: '#FFF7ED',
      border: '#000000',
      flashCardBg: '#FEF3C7',
      flashCardText: '#000000',
    },
    typography: {
      baseSize: 24,
      titleSize: 36,
      stepTitleSize: 28,
      flashCardSize: 40,
      scale: 1.5,
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
    },
    spacing: {
      padding: 20,
      gap: 20,
      borderRadius: 4,
    },
  },
};

interface ThemeContextType {
  theme: Theme;
  mode: UserMode;
  setMode: (mode: UserMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<UserMode>('default');

  const value = {
    theme: themes[mode],
    mode,
    setMode,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
