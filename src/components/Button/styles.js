import { StyleSheet } from "react-native";
import { globalStyle } from "../../styles/globalStyle.js";

export const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: 48,
        backgroundColor: globalStyle.primary,
        borderRadius: globalStyle.borderRadius,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },

    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontFamily: globalStyle.fontBold,
        fontWeight: "bold",
    },
})