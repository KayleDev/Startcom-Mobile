import { StyleSheet } from "react-native";
import { globalStyle } from "../../styles/globalStyle";

export const styles = StyleSheet.create({
    salesContainer: {
        gap: 10,
        marginVertical: 5,
    },

    filterContainer: {
        gap: 2.5,
        marginVertical: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#fff',
    },

    inputVariant: {
        backgroundColor: "#FFFFFF", 
        borderWidth: 1, 
        borderColor: '#ccc',
        borderRadius: 10,
    },

    filters: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    resultCount: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
        marginBottom: 12,
        fontWeight: '500',
    },
})