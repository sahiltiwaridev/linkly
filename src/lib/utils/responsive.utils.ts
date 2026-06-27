import { useWindowDimensions } from 'react-native';

type ResponsiveSpacing = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

type ResponsiveSizes = {
  iconXs: number;
  iconSm: number;
  iconMd: number;
  iconLg: number;
  iconXl: number;
  avatarSm: number;
  avatarMd: number;
  avatarLg: number;
  buttonSm: number;
  buttonMd: number;
  buttonLg: number;
  qrSmall: number;
  qrMedium: number;
  qrLarge: number;
  containerXs: number;
  containerSm: number;
  containerMd: number;
  spacing: ResponsiveSpacing;
};

type ResponsiveResult = {
  width: number;
  height: number;
  scale: (value: number) => number;
  breakpoint: 'xs' | 'sm' | 'md' | 'lg';
  isSmallScreen: boolean;
  isSmallPhone: boolean;
  isTablet: boolean;
  sizes: ResponsiveSizes;
  spacing: ResponsiveSpacing;
  getPadding: () => { horizontal: number; vertical: number; screen: number };
  responsiveFontSize: (baseSize: number) => number;
  responsiveSize: (baseSize: number) => number;
};

export const useResponsive = (): ResponsiveResult => {
  const { width, height } = useWindowDimensions();

  const breakpoints = {
    xs: 0,
    sm: 360,
    md: 480,
    lg: 768,
  };

  const getBreakpoint = () => {
    if (width < breakpoints.sm) return 'xs';
    if (width < breakpoints.md) return 'sm';
    if (width < breakpoints.lg) return 'md';
    return 'lg';
  };

  const isSmallScreen = width < 360;
  const isSmallPhone = width < 480;
  const isTablet = width >= 768;

  const scale = (value: number) => (width / 375) * value;
  const responsiveFontSize = (baseSize: number) => scale(baseSize);
  const responsiveSize = (baseSize: number) => scale(baseSize);

  const spacing: ResponsiveSpacing = {
    xs: responsiveSize(4),
    sm: responsiveSize(8),
    md: responsiveSize(12),
    lg: responsiveSize(16),
    xl: responsiveSize(24),
    xxl: responsiveSize(32),
  };

  const sizes: ResponsiveSizes = {
    iconXs: responsiveSize(16),
    iconSm: responsiveSize(20),
    iconMd: responsiveSize(24),
    iconLg: responsiveSize(32),
    iconXl: responsiveSize(48),
    avatarSm: responsiveSize(56),
    avatarMd: responsiveSize(80),
    avatarLg: responsiveSize(112),
    buttonSm: responsiveSize(40),
    buttonMd: responsiveSize(48),
    buttonLg: responsiveSize(56),
    qrSmall: Math.min(responsiveSize(160), width * 0.7),
    qrMedium: Math.min(responsiveSize(220), width * 0.7),
    qrLarge: Math.min(responsiveSize(260), width * 0.7),
    containerXs: Math.min(responsiveSize(240), width * 0.7),
    containerSm: Math.min(responsiveSize(192), width * 0.7),
    containerMd: Math.min(responsiveSize(144), width * 0.7),
    spacing,
  };

  const getPadding = () => ({
    horizontal: isSmallScreen ? spacing.sm : spacing.md,
    vertical: isSmallScreen ? spacing.sm : spacing.md,
    screen: isSmallScreen ? spacing.sm : spacing.lg,
  });

  return {
    width,
    height,
    scale,
    breakpoint: getBreakpoint(),
    isSmallScreen,
    isSmallPhone,
    isTablet,
    sizes,
    spacing,
    getPadding,
    responsiveFontSize,
    responsiveSize,
  };
};
