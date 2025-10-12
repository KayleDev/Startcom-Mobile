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

  logoImage: {
    width: 128,
    height: 128,
  },

  title: {
    fontSize: 26,
    color: globalStyle.quaternary,
    fontFamily: globalStyle.fontBold,
  },

  subtitle: {
    fontSize: 18,
    color: globalStyle.quaternary,
    marginBottom: 40,
    fontFamily: globalStyle.fontRegular,
  },

  inputBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  },

  linkText: {
    marginTop: 20,
    color: globalStyle.tertiary,
    fontSize: 14,
    fontFamily: globalStyle.fontRegular,
  },
});
