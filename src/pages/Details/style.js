// import da função de estilos //
import { StyleSheet } from 'react-native';

// define todos os estilos dos componentes que serão utilizados na tela //
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
        color: '#FFF',
        textAlign: 'center'
    },
    containerForm:{
        backgroundColor: '#FFF',
        flex:1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,  
        paddingStart: '5%',
        paddingEnd: '5%' 
    },
    switch:{
        width: "97%",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    statusDevice:{
        width: "78%",
        alignContent: "center",
        padding: 8,
        paddingHorizontal: 5,
        borderRadius: 35,
        marginBottom: 1,
        marginRight: 5,
        marginLeft: 25,
        marginTop: 8,
        marginStart: 1,
        color: "#000000",
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
    
})

export default styles