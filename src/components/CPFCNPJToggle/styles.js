import { StyleSheet } from 'react-native';
import { globalStyle } from '../../styles/globalStyle';

export const toggleStyles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    height: 48,
    marginBottom: 8,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftButton: {
    borderTopLeftRadius: globalStyle.borderRadius,
    borderBottomLeftRadius: globalStyle.borderRadius,
  },
  rightButton: {
    borderTopRightRadius: globalStyle.borderRadius,
    borderBottomRightRadius: globalStyle.borderRadius,
  },
  activeButton: {
    backgroundColor: globalStyle.primary,
  },
  toggleText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  activeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});