import { StyleSheet } from "react-native";
import { globalStyle } from "../../styles/globalStyle.js";

export const styles = StyleSheet.create({
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: globalStyle.secondary,
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 48,
    },

    dateText: {
        fontSize: 16,
        color: "#777",
    },
});