import { StyleSheet } from "react-native";
import { globalStyle } from "../../styles/globalStyle";

export const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  calendarIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  selectedText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 8,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  periodOption: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  periodOptionSelected: {
    backgroundColor: '#F0F4FF',
    borderRadius: 12,
  },
  periodText: {
    fontSize: 16,
    color: '#333333',
  },
  periodTextSelected: {
    color: globalStyle.primary,
    fontWeight: '600', 
  },
});