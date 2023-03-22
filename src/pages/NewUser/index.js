import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity  } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../config/connectFirebase';
import styles from '../NewUser/style';

export default function NewUser() {
    const [password, setPassword ] = useState('');
    const [rePassword, setRePassword ] = useState('');
    const [email, setEmail ] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const [hideRePass, setHideRePass] = useState(true);
    const [errorNewUser, setErrorNewUser] = useState('');
    const auth = getAuth(app);

    const createUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user; })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message; 
            setErrorNewUser(true) }); } 

    return (
        <View style ={styles.container}>

            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Crie sua Conta(a)</Text>
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

                <View style={styles.inputArea}>
                    <TextInput
                        placeholder="Digite sua senha novamente..."
                        style={styles.inputSenha}
                        value={rePassword}
                        onChangeText={ (text)  => setRePassword(text) } 
                        secureTextEntry={hideRePass}/>
                    
                    <TouchableOpacity style={styles.icon} onPress={ () => setHideRePass(!hideRePass) }>
                        { hideRePass ?
                            <Ionicons name="eye" color="#FFF" size ={25} />
                            :
                            <Ionicons name="eye-off" color="#FFF" size ={25} />
                        }
                    </TouchableOpacity>

                </View>

                { password !== rePassword 
                    ?
                        <View style={styles.contentAlert}>
                            <MaterialCommunityIcons
                                name ="alert-circle" />
                            <Text style={styles.warningAlert}>As senhas são diferentes</Text>
                        </View> 
                    : 
                        <View/> }                
                
                { errorNewUser === true
                ?
                    <View style={styles.contentAlert}>
                        <MaterialCommunityIcons
                            name ="alert-circle" />
                        <Text style={styles.warningAlert}>Função Indisponível no Momento</Text>
                    </View> 
                :
                    <View/> }

                { email === "" || password === "" || rePassword === ""
                ? 
                    <TouchableOpacity disabled={true} style={styles.buttonDisable} onPress={createUser}>
                        <Text style={styles.buttonText}>Criar Conta</Text>    
                    </TouchableOpacity>
                :
                    <TouchableOpacity style={styles.buttonEnable} onPress={createUser}>
                        <Text style={styles.buttonText}>Criar Conta</Text>    
                    </TouchableOpacity>
                }

            </Animatable.View>

        </View>
    );
}