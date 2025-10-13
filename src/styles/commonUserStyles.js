import { StyleSheet } from 'react-native';
import { globalStyle } from './globalStyle';

export const commonUserStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },

    screenBlock: {
        flex: 1, 
        padding: 24,
    },
    
    screenTitle: {
        fontSize: 36, 
        fontWeight: 'bold',
    },

    screenDescription: {
        marginTop: 10, 
        color: '#666', 
        fontSize: 16,
    }
});