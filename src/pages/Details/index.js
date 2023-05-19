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

export default function Details({route}) {
    const [deviceInfo, getDeviceInfo] = useState ([]);
    const db = getFirestore(app);
    const navigation = useNavigation();
    const auth = getAuth(app);

    const backAction1 = () => {
       
        navigation.navigate("Devices", {idUser: route.params.idUser})   

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

    useEffect (
        () => 
        onSnapshot(doc(db, route.params.idUser, route.params.Itemid), (doc) =>{
                console.log(doc.data());
                getDeviceInfo(...doc.data());
            }),
        []
    );

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction1);
    
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction1);
      }, []);

    return (
        <View style ={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Consumo {route.params.Name}</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style ={styles.containerForm}>
             {/* conteudo */}
                
             {deviceInfo.Name}
             {deviceInfo.Ligado}
             {deviceInfo.consumo}

              
            </Animatable.View>

        </View>
    );
}