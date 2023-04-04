import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
            Name: Name        
        });
        navigation.navigate("Devices", {idUser: route.params.idUser})
    }
    

    return (
        <View style ={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Novo Dispositivo</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style ={styles.containerForm}>
                <Text style={styles.label}>Nome do Dispositivo</Text> 
                <TextInput 
                    style={styles.inputText}  
                    placeholder="Ex: Máquina de Lavar"
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