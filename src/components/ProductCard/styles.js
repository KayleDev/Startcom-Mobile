import { StyleSheet } from "react-native";
import { globalStyle } from "../../styles/globalStyle";

export const styles = StyleSheet.create({
    card: {  
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        minWidth: 200,
    },

    group: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },

    title: {  
        fontSize: 14,
        color: '#666666',
        marginBottom: 8,
        fontWeight: '500',
    },

    value: {    
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 6,
    },

    icon: {   
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    extra: {
        fontWeight: '500',
    }
})