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
        position: "absolute",
        width: 60,
        height: 60,
        bottom: 30,
        left: 20,
        backgroundColor: "#38A69D",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center" 
    },
    iconButton:{
        color: '#FFFFFF',
        fontSize: 35,
        fontWeight: "bold"
    },
    
})

export default styles