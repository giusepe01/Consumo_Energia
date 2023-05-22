import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { app } from '../../config/connectFirebase';
import styles from '../Devices/style';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

export default function Details({route}) {
    const db = getFirestore(app);

    useEffect (
        () => 
        onSnapshot(doc(db, route.params.idUser, route.params.Itemid), (doc) =>{
                console.log(doc.data());
            }),
        []
    );

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