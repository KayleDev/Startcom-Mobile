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

    lineSection: {
        borderBottomColor: globalStyle.quaternary,
        borderBottomWidth: StyleSheet.hairlineWidth,
        flex: 1,
        height: 1,
        marginBottom: 20,
    },

    alignButtonText: {
        flexDirection: "row",
        gap: 10,
    },

    saveText: {
        fontSize: 16,
        color: "#FFFFFF",
    },
});