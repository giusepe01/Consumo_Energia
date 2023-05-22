import React, { useEffect } from 'react';
import { View, Text, BackHandler } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { app } from '../../config/connectFirebase';
import styles from '../Devices/style';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function Details({route}) {
    const db = getFirestore(app);
    const navigation = useNavigation();

    useEffect (
        () => 
        onSnapshot(doc(db, route.params.idUser, route.params.Itemid), (doc) =>{
                console.log(doc.data());
                let varTeste = JSON.parse(JSON.stringify(doc.data()));
                console.log('Valor do Consumo', varTeste.Consumo);
                console.log('Está ligado?', varTeste.Ligado);
            }),
        []
    );

    function GoBack() {
        navigation.goBack();
        return true;
      }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", GoBack);
    
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", GoBack);
      }, []);

    return (
        <View style ={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Consumo {route.params.Name}</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style ={styles.containerForm}>

            </Animatable.View>

        </View>
    );
}