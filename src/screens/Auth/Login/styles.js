import { StyleSheet } from "react-native";
import { globalStyle } from "../../../styles/globalStyle.js";

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
    color: globalStyle.quaternary,
    marginBottom: 24,
    fontFamily: globalStyle.fontBold,
  },

  loginWithContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 8,
    marginBottom: 16,
  },

  loginWithButton: {
    backgroundColor: globalStyle.secondary,
    justifyContent: "center",
    borderRadius: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 48,
  },

  loginWithText: {
    fontSize: 14,
    color: "#000",
    fontFamily: globalStyle.fontRegular,
  },

  loginWithImage: {
    width: 24,
    height: 24,
  },

  keepConnectedContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    alignSelf: "flex-start",
  },

  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },

  keepConnectedText: {
    marginLeft: 8,
    fontFamily: globalStyle.fontRegular,
  },

  linkText: {
    color: globalStyle.tertiary,
    fontSize: 14,
    fontFamily: globalStyle.fontRegular,
  },
});
