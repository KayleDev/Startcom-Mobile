import { StyleSheet } from "react-native";
import { globalStyle } from "../../styles/globalStyle";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },  
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  orderId: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  viewButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#EFF6FF",
  },
  cardBody: {
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  value: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "600",
  },
  valuePrice: {
    fontSize: 16,
    color: globalStyle.primary,
    fontWeight: "700",
  },
  cardFooter: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    alignItems: "flex-start",
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  statusConcluida: {
    backgroundColor: "#D1FAE5",
  },
  statusPendente: {
    backgroundColor: "#FEF3C7",
  },
  statusCancelada: {
    backgroundColor: "#FEE2E2",
  },
  statusDefault: {
    backgroundColor: "#F3F4F6",
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },
});
