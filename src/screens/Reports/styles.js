import { StyleSheet } from "react-native";
import { globalStyle } from "../../styles/globalStyle";

export const styles = StyleSheet.create({
    variantButton: {
        marginVertical: 0,
    },

    reportContainer: {
        gap: 20,
        marginVertical: 20,
    },

    reportChartContainer: {
        gap: 20,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: "#FFFFFF",
        padding: 16,
        paddingVertical: 24, 
        borderColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 20,
    },

    generatedReportContainer: {
        gap: 20,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: "#FFFFFF",
        padding: 20,
        paddingVertical: 24, 
        borderColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 16,
    }
})