import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity  } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../config/connectFirebase';
import styles from '../Signin/style';

export default function Signin() {
    const [password, setPassword ] = useState('');
    const [email, setEmail ] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const [errorLogin, setErrorLogin] = useState('');
    const auth = getAuth(app);

    const createUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user; })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message; }); } 

    const loginUser = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user; 
            setErrorLogin(false) })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorLogin(true) }); } 

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
                    onChangeText={ (text)  => setEmail(text) } />

                <Text style={styles.title}>Senha</Text>
                <View style={styles.inputArea}>
                    <TextInput
                        placeholder="Digite sua senha..."
                        style={styles.inputSenha}
                        value={password}
                        onChangeText={ (text)  => setPassword(text) } 
                        secureTextEntry={hidePass}/>
                    
                    <TouchableOpacity style={styles.icon} onPress={ () => setHidePass(!hidePass) }>
                        { hidePass ?
                            <Ionicons name="eye" color="#FFF" size ={25} />
                            :
                            <Ionicons name="eye-off" color="#FFF" size ={25} />
                        }
                    </TouchableOpacity>
                </View>
                
                {errorLogin === true
                ?
                    <View style={styles.contentAlert}>
                        <MaterialCommunityIcons
                            name ="alert-circle" />
                        <Text style={styles.warningAlert}>Usuário e/ou senha inválidos</Text>
                    </View> 
                :
                    <View/> }

                { email === "" || password === ""
                ? 
                    <TouchableOpacity disabled={true} style={styles.buttonDisable} onPress={loginUser}>
                        <Text style={styles.buttonText}>Acessar</Text>    
                    </TouchableOpacity>
                :
                    <TouchableOpacity style={styles.buttonEnable} onPress={loginUser}>
                        <Text style={styles.buttonText}>Acessar</Text>    
                    </TouchableOpacity>
                }

                <TouchableOpacity style={styles.buttonRegister}>
                    <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>    
                </TouchableOpacity> 

            </Animatable.View>

        </View>
    );
}