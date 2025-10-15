import { StyleSheet } from "react-native";
import { globalStyle } from "../../styles/globalStyle";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F3F4F6',
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  initials: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  contactInfo: {
    gap: 12,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#4B5563',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerItem: {
    flex: 1,
    alignItems: "center",
  },
  footerLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  footerValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0891B2',
  },
  footerDate: {
    fontSize: 14,
    color: '#374151',
  },
});
