import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
// import dos icones usados para ver a senha digitada "espiadinha" //
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import da função de animação de tela //
import * as Animatable from 'react-native-animatable';
// import das funções utilizadas para banco de dados (Firebase) //
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import da conexão com o firebase //
import { app } from '../../config/connectFirebase';
// import dos estilos dos componentes //
import styles from '../Signin/style';
// import da função de navegação //
import { useNavigation } from '@react-navigation/native';

// definição de todas as variáveis utilizadas na pagina //
export default function Signin() {
    const [password, setPassword ] = useState('');
    const [email, setEmail ] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const [errorLogin, setErrorLogin] = useState('');
    const auth = getAuth(app);
    const navigation = useNavigation();
    const [isLoading, setLoading] = useState(false);

// função utilizada para limpar os dados digitados na tela //   
    const limparTela = () => {
        setPassword('');
        setEmail('');
        setErrorLogin(false);
    } 

// função utilizada para realizar o login do usuário, autenticando diretamente no firebase //
    const loginUser = async () => {
        setLoading(true);
       await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const uid = user.uid; 
            setErrorLogin(false);
            limparTela(); 
            navigation.navigate("Devices", {idUser: uid});
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message; 
            setErrorLogin(true) }); 
            setLoading(false);
        } 

    return (

        <View style ={styles.container}>
        
        {isLoading ? 
        <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF"/>
        </View>
        :
        <View style ={styles.container}>
        <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Bem-Vindo(a)</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style ={styles.containerForm}>

                {/* campo referente ao email do usuário */}
                <Text style={styles.title}>Email</Text>
                <TextInput
                    placeholder="Digite seu email..."
                    style={styles.inputEmail} 
                    value={email}
                    onChangeText={ (text)  => setEmail(text) } />

                {/* campo referente a senha do usuário */}
                <Text style={styles.title}>Senha</Text>
                <View style={styles.inputArea}>
                    <TextInput
                        placeholder="Digite sua senha..."
                        style={styles.inputSenha}
                        value={password}
                        onChangeText={ (text)  => setPassword(text) } 
                        secureTextEntry={hidePass}/>
                    
                    {/* função para mostrar a senha digitada */}
                    <TouchableOpacity style={styles.icon} onPress={ () => setHidePass(!hidePass) }>
                        { hidePass ?
                            <Ionicons name="eye" color="#000000" size ={25} />
                            :
                            <Ionicons name="eye-off" color="#000000" size ={25} />
                        }
                    </TouchableOpacity>
                </View>
                
                {/* Verificação de erro no login */}
                {errorLogin === true
                ?
                    <View style={styles.contentAlert}>
                        <MaterialCommunityIcons
                            name ="alert-circle" />
                        <Text style={styles.warningAlert}>Usuário e/ou senha inválidos</Text>
                    </View> 
                :
                    <View/> }

                {/* Só permite clicar no botão de login, caso os campos estejam preenchidos */}
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

                {/* botão para cadastrar um novo usuário */}
                <TouchableOpacity style={styles.buttonRegister} onPress={ () => {limparTela(); navigation.navigate("NewUser")}}>
                    <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>    
                </TouchableOpacity> 

            </Animatable.View>
            
        </View>
        }
    </View>
            
    );
}