import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, alert, BackHandler, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { app } from '../../config/connectFirebase';
import styles from '../Devices/style';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { collection, getFirestore, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { FlatList } from 'react-native-gesture-handler';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Devices({route}) {
    const [devices, setDevices] = useState ([]);
    const db = getFirestore(app);
    const navigation = useNavigation();
    const auth = getAuth(app);

    const backAction = () => {
        Alert.alert("Atenção!", "Tem certeza que deseja sair do aplicativo?", [
          {
            text: "Cancelar",
            onPress: () => null,
            style: "cancel"
          },
          { 
            text: "SIM", 
            onPress: () => BackHandler.exitApp() 
          }
        ]);
        return true;
    };

    const ButtonLogout = () => {
        Alert.alert("Atenção!", "Tem certeza que deseja realizar Logout?", [
          {
            text: "Cancelar",
            onPress: () => null,
            style: "cancel"
          },
          { 
            text: "SIM", 
            onPress: () => logout() 
          }
        ]);
        return true;
    };

    function logout () {
        signOut(auth).then(() => {
            navigation.navigate("SignIn")
      }).catch((error) => {
            alert('Erro ao fazer logout');
      });}

    async function deleteDevice(id){
        const deviceDoc = doc(db, route.params.idUser, id);
        await deleteDoc(deviceDoc);
    } 

    useEffect (
        () => 
            onSnapshot(collection(db, route.params.idUser ), (snapshot) =>
                setDevices(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id }))) 
            ),
        []
    );



    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
      }, []);

    return (
        <View style ={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Dispositivos</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style ={styles.containerForm}>
                <FlatList 
                    showsVerticalScrollIndicator = {false}
                    data={devices} 
                    renderItem={( { item } ) => {
                    return (
                    <View style={styles.Device}> 
                        <Text 
                            style={styles.nameDevice} 
                            onPress={ () => 
                                navigation.navigate("Details", {
                                Itemid: item.id,
                                Name: item.Name,
                                idUser: route.params.idUser
                                })
                            }
                        >
                        {item.Name}
                        </Text>
                        <TouchableOpacity 
                            style={styles.deleteDevice} 
                            onPress={ () => {
                            deleteDevice(item.id) 
                            }}
                        > 
                        <AntDesign 
                            name="delete" 
                            size={25} 
                            color={"#38A69D"}
                        >  
                        </AntDesign>
                        </TouchableOpacity>        
                    </View> 
                    )
                }}
            />
                <TouchableOpacity style ={styles.buttonNewDevice} onPress={ () => navigation.navigate("NewDevice", {idUser: route.params.idUser}) }>
                    <Text style={styles.iconButton}>+</Text>        
                </TouchableOpacity>

                <TouchableOpacity style ={styles.buttonLogout} onPress={ () => { ButtonLogout() } }>
                    <Text style ={styles.iconButtonLogout}>
                        <MaterialCommunityIcons
                            name="location-exit"
                            size={55}
                            color={"#38A69D"}    
                        />
                    </Text>        
                </TouchableOpacity>
            </Animatable.View>

        </View>
    );
}