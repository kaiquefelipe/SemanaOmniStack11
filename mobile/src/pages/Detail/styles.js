import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    incident: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 8,
        marginBottom: 16,
        marginTop: 48
    },

    incidentProperty: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#41414d',
        marginTop: 24,
    },

    incidentValue: {
        fontSize: 15,
        marginTop: 8,
        color: '#737380'
    },

    contactBox: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 8,
        marginBottom: 16,
    },

    heroTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#13131a',
        lineHeight: 30
    },

    heroDescription: {
        fontSize: 15,
        color: '#737380',
        marginTop: 16
    },
    
    actions: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    action: {
        backgroundColor: '#E02041',
        borderRadius: 8,
        width: '48%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    actionText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
});