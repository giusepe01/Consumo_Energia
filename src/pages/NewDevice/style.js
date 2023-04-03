import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#38A69D'
    },
    containerHeader:{
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',    
    },
    message:{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF'
    },
    containerForm:{
        backgroundColor: '#FFF',
        flex:1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,  
        paddingStart: '5%',
        paddingEnd: '5%' 
    },
    buttonNewDevice:{
        backgroundColor: '#38A69D',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'  
    },
    buttonNewDeviceDisable:{
        backgroundColor: '#696969',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'  
    },
    iconButton:{
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    inputText:{
        borderBottomWidth: 1,
        height: 50,
        color: '#000000',
        marginBottom: 12,
        fontSize: 16,
        width: '100%',
        padding: 8
        
    },
    label:{
        fontSize: 20,
        marginTop: 28,
        padding: 8
    }
    
})

export default styles