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
    title:{
        fontSize: 20,
        marginTop: 28,
        padding: 8
    },
    inputEmail:{
        borderBottomWidth: 1,
        height: 50,
        color: '#000000',
        marginBottom: 12,
        fontSize: 16,
        width: '100%',
        padding: 8
    },
    inputSenha:{
        borderBottomWidth: 1,
        height: 50,
        color: '#000000',
        marginBottom: 12,
        fontSize: 16,
        width: '100%',
        padding: 8
    },
    buttonDisable:{
        backgroundColor: '#696969',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'  
    },
    buttonEnable:{
        backgroundColor: '#38A69D',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'  
    },
    buttonText:{
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonRegister:{
        marginTop: 14,
        alignSelf: 'center' 
    },
    registerText:{
        color: '#A1A1A1'
    },
    inputArea:{
        flexDirection: 'row',
        width: '85%',
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 50,
        alignItems: 'center'
    },
    icon:{
        width: '15%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'   
    },
    contentAlert:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    },
    warningAlert:{
        paddingLeft: 10,
        color: '#FF0000',
        fontSize: 16,
        
    },
})

export default styles