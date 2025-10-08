import { StyleSheet } from "react-native";
import { globalStyle } from "../../styles/globalStyle.js";

export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: globalStyle.secondary,
    borderRadius: 5,
    paddingHorizontal: 12,
    height: 48,
    width: "100%",
  },
  inputField: {
    flex: 1,
    fontSize: 16,
  },
  eyeButton: {
    marginLeft: 8,
  },
});