import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
// import dos icones //
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import da função de animação da tela //
import * as Animatable from 'react-native-animatable';
// import das funções utilizadas no banco de dados (Firebase) //
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// import da conexeção com o banco //
import { app } from '../../config/connectFirebase';
// import dos estilos utilizados nos componentes //
import styles from '../NewUser/style';
// import na função de navegação entre telas
import { useNavigation } from '@react-navigation/native';

// definição de todas as variáveis utilizadas na tela //
export default function NewUser() {
    const [password, setPassword ] = useState('');
    const [rePassword, setRePassword ] = useState('');
    const [email, setEmail ] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const [hideRePass, setHideRePass] = useState(true);
    const [errorNewUser, setErrorNewUser] = useState('');
    const auth = getAuth(app);
    const navigation = useNavigation();

    // função de limpar os dados digitados em tela //
    const limparTela = () => {
        setPassword('');
        setEmail('');
        setRePassword('');
    }

    // função de criar um novo usuário no banco de dados // 
    const createUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user; 
            Alert.alert('Conta criada com sucesso')
            limparTela();
            navigation.navigate("SignIn")})
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message; 
            setErrorNewUser(true)
            alert(errorMessage) }); } 

    return (
        <View style ={styles.container}>

            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Crie sua Conta</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style ={styles.containerForm}>

                {/* recebe o email digitado na tela */}
                <Text style={styles.title}>Email</Text>
                <TextInput
                    placeholder="Digite seu email..."
                    style={styles.inputEmail} 
                    value={email}
                    onChangeText={ (text)  => setEmail(text) } />

                {/* recebe a senha digitada na tela */}
                <Text style={styles.title}>Senha</Text>
                <View style={styles.inputArea}>
                    <TextInput
                        placeholder="Digite sua senha..."
                        style={styles.inputSenha}
                        value={password}
                        onChangeText={ (text)  => setPassword(text) } 
                        secureTextEntry={hidePass}/>
                    
                    {/* função de mostrar a senha digitada "espiadinha" */}
                    <TouchableOpacity style={styles.icon} onPress={ () => setHidePass(!hidePass) }>
                        { hidePass ?
                            <Ionicons name="eye" color="#000000" size ={25} />
                            :
                            <Ionicons name="eye-off" color="#000000" size ={25} />
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.inputArea}>
                    {/* recebe a segunda senha digitada em tela */}
                    <TextInput
                        placeholder="Digite sua senha novamente..."
                        style={styles.inputSenha}
                        value={rePassword}
                        onChangeText={ (text)  => setRePassword(text) } 
                        secureTextEntry={hideRePass}/>
                    
                    {/* função de mostrar a senha digitada "espiadinha" */}
                    <TouchableOpacity style={styles.icon} onPress={ () => setHideRePass(!hideRePass) }>
                        { hideRePass ?
                            <Ionicons name="eye" color="#000000" size ={25} />
                            :
                            <Ionicons name="eye-off" color="#000000" size ={25} />
                        }
                    </TouchableOpacity>

                </View>

                {/* função para verificar se as duas senhas digitadas são iguais */}
                { password !== rePassword 
                    ?
                        <View style={styles.contentAlert}>
                            <MaterialCommunityIcons
                                name ="alert-circle" />
                            <Text style={styles.warningAlert}>As senhas são diferentes</Text>
                        </View> 
                    : 
                        <View/> }                
                
                {/* valida se houve problema ao criar um novo usuário */}
                { errorNewUser === true
                ?
                    <View style={styles.contentAlert}>
                        <MaterialCommunityIcons
                            name ="alert-circle" />
                        <Text style={styles.warningAlert}>Função Indisponível no Momento</Text>
                    </View> 
                :
                    <View/> }

                {/* função para só habilitar o botão de cadastrar, se todos os campos estiverem preenchidos */}
                { email === "" || password === "" || rePassword === "" || (password !== rePassword) 
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