export interface ThemePalette {
  primary?: string;
  secondary?: string;
  accent?: string;
  pageBackground?: string;
  surfaceBackground?: string;
  cardBackground?: string;
  headingColor?: string;
  bodyTextColor?: string;
  mutedTextColor?: string;
  borderColor?: string;
  primaryButtonBackground?: string;
  primaryButtonText?: string;
  secondaryButtonBackground?: string;
  secondaryButtonText?: string;
}

export interface ThemeSettingsContract {
  _type?: 'themeSettings';
  lightMode?: ThemePalette;
  darkMode?: ThemePalette;
}

export interface ResolvedThemePalette {
  primary: string;
  secondary: string;
  accent: string;
  pageBackground: string;
  surfaceBackground: string;
  cardBackground: string;
  headingColor: string;
  bodyTextColor: string;
  mutedTextColor: string;
  borderColor: string;
  primaryButtonBackground: string;
  primaryButtonText: string;
  secondaryButtonBackground: string;
  secondaryButtonText: string;
}

export interface ResolvedThemeSettings {
  light: ResolvedThemePalette;
  dark: ResolvedThemePalette;
}

export const DEFAULT_LIGHT_THEME_PALETTE: ResolvedThemePalette = Object.freeze({
  primary: '#6D2878',
  secondary: '#16B5C5',
  accent: '#9C36AD',
  pageBackground: '#FAFAFC',
  surfaceBackground: '#FFFFFF',
  cardBackground: '#FFFFFF',
  headingColor: '#0F172A',
  bodyTextColor: '#0F172A',
  mutedTextColor: '#64748B',
  borderColor: '#E2E8F0',
  primaryButtonBackground: '#6D2878',
  primaryButtonText: '#FFFFFF',
  secondaryButtonBackground: '#16B5C5',
  secondaryButtonText: '#091522',
});

export const DEFAULT_DARK_THEME_PALETTE: ResolvedThemePalette = Object.freeze({
  primary: '#6D2878',
  secondary: '#16B5C5',
  accent: '#38D4E3',
  pageBackground: '#091522',
  surfaceBackground: '#0F1B2C',
  cardBackground: '#111D30',
  headingColor: '#F8FAFC',
  bodyTextColor: '#F8FAFC',
  mutedTextColor: '#94A3B8',
  borderColor: '#1E2E4A',
  primaryButtonBackground: '#6D2878',
  primaryButtonText: '#FFFFFF',
  secondaryButtonBackground: '#16B5C5',
  secondaryButtonText: '#091522',
});
