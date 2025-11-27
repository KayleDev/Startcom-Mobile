import { StyleSheet } from "react-native";
import { globalStyle } from "../../styles/globalStyle";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginTop: 6,
  },

  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftSection: {
    flex: 1,
  },

  title: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    fontWeight: '500',
  },

  amount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 6,
  },

  info: {
    fontSize: 14,
    fontWeight: '500',
  },

  good: {
    color: '#10B981',
  },
  bad: {
    color: '#EF4444',
  },
  neutral: {
    color: '#6B7280',
  },

  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: globalStyle.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    color: globalStyle.primary,
  },
});
