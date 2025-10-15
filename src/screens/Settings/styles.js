import { StyleSheet } from "react-native";
import { globalStyle } from "../../styles/globalStyle";

export const styles = StyleSheet.create({
    settingContainer: {
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

    notificationContainer: {
        gap: 2.5,
        marginTop: 10,
        marginBottom: 40,
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

    inputBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 8,
    },

    alignButtonText: {
        flexDirection: "row",
        gap: 10,
    },

    saveText: {
        fontSize: 16,
        color: "#FFFFFF",
    },
})