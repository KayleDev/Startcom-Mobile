import { StyleSheet } from "react-native";
import { globalStyle } from "../../../styles/globalStyle.js"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
  },

  button: {
    width: "100%",
    height: 48,
    backgroundColor: "#007bff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  loginWithContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },

  loginWithButton: {
    backgroundColor: globalStyle.secondary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 5,
    width: "49%",
    height: 48,
    marginBottom: 16,
  },

  loginWithText: {
    fontSize: 14,
    color: "#000",
  },

  linkText: {
    color: "#007bff",
    fontSize: 14,
  },
});
