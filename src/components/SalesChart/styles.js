import { StyleSheet } from "react-native";
import { globalStyle } from "../../styles/globalStyle";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 30,
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chart: {
    borderRadius: 16,
    marginBottom: 0,
    marginTop: 10,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
  },
  legendBox: {
    width: 16,
    height: 16,
    borderRadius: 3,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
    color: "#555",
  },
});