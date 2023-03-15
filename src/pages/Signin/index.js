import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import * as Animatable from 'react-native-animatable'

export default function Signin() {
    const [senha, setSenha ] = useState('');
    const [email, setEmail ] = useState('');
    const [hidePass, setHidePass] = useState(true);

    return (
        <View style ={styles.container}>

            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Bem-Vindo(a)</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style ={styles.containerForm}>
                <Text style={styles.title}>Email</Text>
                <TextInput
                    placeholder="Digite seu email..."
                    style={styles.inputEmail} 
                    value={email}
                    onChangeText={ (email)  => setEmail(email) } />

                <Text style={styles.title}>Senha</Text>

                <View style={styles.inputArea}>
                    <TextInput
                        placeholder="Digite sua senha..."
                        style={styles.inputSenha}
                        value={senha}
                        onChangeText={ (senha)  => setSenha(senha) } 
                        secureTextEntry={hidePass}/>
                    
                    <TouchableOpacity style={styles.icon} onPress={ () => setHidePass(!hidePass) }>
                        { hidePass ?
                            <Ionicons name="eye" color="#FFF" size ={25} />
                            :
                            <Ionicons name="eye-off" color="#FFF" size ={25} />
                        }
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Acessar</Text>    
                </TouchableOpacity> 

                <TouchableOpacity style={styles.buttonRegister}>
                    <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>    
                </TouchableOpacity> 
            </Animatable.View>

        </View>
    );
}

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
        color: '#FFF',
        marginBottom: 12,
        fontSize: 16,
        width: '100%',
        padding: 8
    },
    inputSenha:{
        borderBottomWidth: 1,
        height: 50,
        color: '#FFF',
        marginBottom: 12,
        fontSize: 16,
        width: '100%',
        padding: 8
    },
    button:{
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
    }

})