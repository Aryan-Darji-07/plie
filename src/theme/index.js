export const colors = {
  background: '#F7F7F5',
  surface: '#FFFFFF',
  headerBg: '#F7F7F5',
  border: '#E6E6E2',
  chipBorder: '#DFDFDA',
  inputBorder: '#E0E0DC',
  text: '#0F0F0F',
  textSecondary: '#5F5F5F',
  textMuted: '#9A9A96',
  black: '#0A0A0A',
  white: '#FFFFFF',
  heart: '#EA3B3B',
  danger: '#E03131',
  overlay: 'rgba(255,255,255,0.72)',
};

export const fonts = {
  display: 'Poppins-Bold',
  displayMedium: 'Poppins-Medium',
  displaySemi: 'Poppins-SemiBold',
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semibold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

// StyleSheet.absoluteFill leaves an Image at its intrinsic size under Fabric,
// which shows as a gap once the screen is wider than the asset. Setting an
// explicit 100% width/height fills the parent on every screen size.
export const fill = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
};

export const radius = {
  sm: 6,
  md: 10,
  lg: 12,
  xl: 16,
  pill: 999,
};
