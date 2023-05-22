import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, alert, BackHandler, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { app } from '../../config/connectFirebase';
import styles from '../NewDevice/style';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { TextInput } from 'react-native-gesture-handler';


export default function NewDevice({route}) {
    const [Name, setName] = useState ('');
    const navigation = useNavigation();
    const db = getFirestore(app);

    async function addDevice(){
        const device = await addDoc(collection(db, route.params.idUser), {
            Name: Name,
            Consumo: 0,
            Ligado: false

        });
        navigation.navigate("Devices", {idUser: route.params.idUser})
    }

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
                <TextInput 
                    style={styles.inputText}  
                    placeholder="Ex: Lava louças"
                    onChangeText={setName}
                    value={Name}
                />
                
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