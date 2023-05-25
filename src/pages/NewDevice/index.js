import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, BackHandler, Alert } from 'react-native';
// import da função de animação de tela //
import * as Animatable from 'react-native-animatable';
// import da conexão com o banco //
import { app } from '../../config/connectFirebase';
// import dos estilos utilizados para cada componente utilizada na tela //
import styles from '../NewDevice/style';
// import da função de navegação entre telas //
import { useNavigation } from '@react-navigation/native';
// import das função utilizadas para o banco de dados (Firebase) //
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { TextInput } from 'react-native-gesture-handler';

// definição das variáveis utilizdas na pagina //
export default function NewDevice({route}) {
    const [Name, setName] = useState ('');
    const navigation = useNavigation();
    const db = getFirestore(app);

    // função de criar um dispositivo no banco de dados //
    async function addDevice(){
        const device = await addDoc(collection(db, route.params.idUser), {
            Name: Name,
            Consumo: 0,
            Ligado: false

        });
        navigation.navigate("Devices", {idUser: route.params.idUser})
    }

    // confirma a intenção do usuário ao realizar a função de voltar tela //
    const backAction = () => {
        Alert.alert("Atenção!", "Tem certeza que deseja cancelar a criação do dispositivo?", [
          {
            text: "Cancelar",
            onPress: () => null,
            style: "cancel"
          },
          { 
            text: "SIM", 
            onPress: () => navigation.navigate("Devices", {idUser: route.params.idUser})
          }
        ]);
        return true;
    };

    // função do botão de voltar a tela //
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
      }, []);
    

    return (
        <View style ={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Novo Dispositivo</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style ={styles.containerForm}>
                <Text style={styles.label}>Nome do Dispositivo</Text> 
                {/* recebe o nome do dispositivo a ser cadastrado */}
                <TextInput 
                    style={styles.inputText}  
                    placeholder="Ex: Lava louças"
                    onChangeText={setName}
                    value={Name}
                />
                {/* verifica se o campo está preenchido para habilitar o botão de cadastro */}
                { Name === ""
                ?
                    <TouchableOpacity
                        disabled={true}
                        style={styles.buttonNewDeviceDisable}
                        onPress={()=>{addDevice()}}
                    >
                        <Text style={styles.iconButton}>Save</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity
                        style={styles.buttonNewDevice}
                        onPress={()=>{addDevice()}}
                    >
                        <Text style={styles.iconButton}>Save</Text>
                    </TouchableOpacity>
                }

            </Animatable.View>

        </View>
    );
}