import { StyleSheet } from "react-native";
import { globalStyle } from "../../../styles/globalStyle";

export const styles = StyleSheet.create({
    container: {
        padding: 24,
        gap: 20,
    },

    title: {
        fontSize: 48,
        fontWeight: '500',
    },

    description: {
        color: globalStyle.primary,
        fontSize: 16,
    },

    actions: {
        marginVertical: 50,
    }
})