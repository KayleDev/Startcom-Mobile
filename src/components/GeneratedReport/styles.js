import { StyleSheet } from "react-native";
import { globalStyle } from "../../styles/globalStyle";

export const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        minWidth: 200,
        gap: 10,
    },

    iconBoxPrincipal: {
        borderRadius: 12,
        borderWidth: 1,
        padding: 12,
    },

    title: {
        fontWeight: '500',
        fontSize: 18
    },

    box: {
        flexDirection: 'row',
        gap: 10,
    },

    prepared: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    textPrepared: {
        color: '#10B981',
        alignItems: 'center',
        backgroundColor: '#10B98120',
        borderWidth: 1,
        borderColor: '#10B981',
        borderRadius: 24,
        paddingVertical: 4,
        paddingHorizontal: 14,
    },

    unprepared: {
        backgroundColor: '#F59E0B20',
        borderWidth: 1,
        borderColor: '#F59E0B',
        borderRadius: 24,
        paddingVertical: 4,
        paddingHorizontal: 16,
    },

    textUnprepared: {
        color: '#F59E0B',
    },

    iconBox: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderColor: '#000',
        borderRadius: 12,
        borderWidth: 1,
    }
})