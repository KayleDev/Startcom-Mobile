import { StyleSheet } from "react-native";
import { globalStyle } from "../../styles/globalStyle.js";

export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: globalStyle.secondary,
    borderRadius: globalStyle.borderRadius,
    paddingHorizontal: 12,
    height: 48,
    width: "100%",
  },
  labelText: {
    marginBottom: 4,
    fontFamily: globalStyle.fontRegular,
    color: globalStyle.quaternary,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
  },
  eyeButton: {
    marginLeft: 8,
    opacity: 0.6
  },
});