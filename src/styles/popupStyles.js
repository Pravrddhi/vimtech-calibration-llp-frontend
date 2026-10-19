import { StyleSheet } from 'react-native';
import theme from '../constants/theme';

const popupStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: theme.colors.backdrop,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    overflow: 'hidden',
    borderRadius: 22,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.primaryDark,
    shadowOpacity: 0.22,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  accent: {
    height: 6,
    backgroundColor: theme.colors.accent,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: 24,
  },
  iconCircle: {
    width: 58,
    height: 58,
    marginBottom: 14,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceTint,
  },
  title: {
    color: theme.colors.primaryDark,
    fontFamily: 'LeagueSpartan',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  message: {
    marginTop: 10,
    color: theme.colors.textMuted,
    fontFamily: 'Montserrat',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    minHeight: 50,
    marginTop: 24,
    overflow: 'hidden',
    borderRadius: 12,
  },
  buttonGradient: {
    flex: 1,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  buttonText: {
    color: theme.colors.surface,
    fontFamily: 'Montserrat',
    fontSize: 15,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.86,
  },
});

export default popupStyles;
