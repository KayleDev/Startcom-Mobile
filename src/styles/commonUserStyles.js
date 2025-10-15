import { StyleSheet } from 'react-native';
import { globalStyle } from './globalStyle';

export const commonUserStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },

    screenBlock: {
        flex: 1, 
        padding: 18,
    },
    
    screenTitle: {
        fontSize: 36, 
        fontWeight: 'bold',
    },

    screenDescription: {
        marginTop: 10, 
        color: '#666', 
        fontSize: 16,
    },
    sectionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 8,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },

    alignButtonText: {
        flexDirection: "row",
        gap: 10,
    },

    saveText: {
        fontSize: 16,
        color: "#FFFFFF",
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
});