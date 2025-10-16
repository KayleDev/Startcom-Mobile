import { StyleSheet } from "react-native";
import { globalStyle } from "../../styles/globalStyle";

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
    },

    codeContainer: {
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'center',
    },

    input: {
        width: 50,
        height: 60,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#a1a1a1',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
    },

    inputFilled: {
        borderColor: globalStyle.primary,
        backgroundColor: '#f5f5f5',
    }
})

export default styles