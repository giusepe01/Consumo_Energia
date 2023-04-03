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
    Device:{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5
    },
    deleteDevice:{
        justifyContent: "center",
        paddingLeft: 15
    },
    nameDevice:{
        width: "85%",
        alignContent: "flex-start",
        backgroundColor: "#F5F5F5CF",
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginBottom: 5,
        marginRight: 5,
        color: "#000000",
        fontSize: 18    
    }
    
})

export default styles