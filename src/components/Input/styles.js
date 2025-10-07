import { StyleSheet } from "react-native";
import { globalStyle } from "../../styles/globalStyle.js"

export const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 48,
    backgroundColor: globalStyle.secondary,
    borderRadius: 5,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
  },
})