import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, BackHandler, Alert } from 'react-native';
// import da função de animação de tela //
import * as Animatable from 'react-native-animatable';
// import da conexão com o banco //
import { app } from '../../config/connectFirebase';
// import dos estilos utilizados para cada componente utilizada na tela //
import styles from '../UpdateDevice/style';
// import da função de navegação entre telas //
import { useNavigation } from '@react-navigation/native';
// import das função utilizadas para o banco de dados (Firebase) //
import { doc, updateDoc, getFirestore } from 'firebase/firestore';
import { TextInput } from 'react-native-gesture-handler';

// definição das variáveis utilizdas na pagina //
export default function NewDevice({route}) {
    const [NewName, setNewName] = useState (route.params.Name);
    const navigation = useNavigation();
    const db = getFirestore(app);
    const user = route.params.idUser
    const ItemId = route.params.Itemid

    // função de update em um dispositivo //
    async function updateDevice(idItem){
        const deviceDoc = doc(db, user, ItemId);
        await updateDoc(deviceDoc, {
            Name: NewName
        });
        navigation.navigate("Devices", {idUser: user})
    }
    
    // confirma a intenção do usuário ao realizar a função de voltar tela //
    const backAction = () => {
        Alert.alert("Atenção!", "Tem certeza que deseja cancelar a atualização do dispositivo?", [
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
                <Text style={styles.message}>Atualizar Dispositivo</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style ={styles.containerForm}>
                <Text style={styles.label}>Nome do Dispositivo</Text> 
                {/* recebe o nome do dispositivo a ser atualizado */}
                <TextInput 
                    style={styles.inputText}
                    placeholder='Ex: Novo nome'  
                    onChangeText={setNewName}
                    value={NewName}
                />
                {/* verifica se o campo está preenchido para habilitar o botão de update */}
                { NewName === ""
                ?
                    <TouchableOpacity
                        disabled={true}
                        style={styles.buttonNewDeviceDisable}
                        onPress={()=>{updateDevice()}}
                    >
                        <Text style={styles.iconButton}>Update</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity
                        style={styles.buttonNewDevice}
                        onPress={()=>{updateDevice()}}
                    >
                        <Text style={styles.iconButton}>Update</Text>
                    </TouchableOpacity>
                }

            </Animatable.View>

        </View>
    );
}