import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { app } from '../../config/connectFirebase';
import styles from '../NewDevice/style';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';

export default function NewDevice() {
    const [devices, setDevices] = useState ([]);
    const db = getFirestore(app);
    const userCollectionRef = collection(db, "Devices" );
    const navigation = useNavigation();

    //useEffect(() => {
      //  const getDevices = async () => {
        //    const data = await getDocs(userCollectionRef);
          //  setDevices(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
            //console.log(devices);
        //};
        //getDevices();
    //},[])

    return (
        <View style ={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Novo Dispositivo</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style ={styles.containerForm}>
                <FlatList/>
                <TouchableOpacity style ={styles.buttonNewDevice} onPress={ () => navigation.navigate("NewDevice") }>
                    <Text style={styles.iconButton}>+</Text>        
                </TouchableOpacity>

            </Animatable.View>

        </View>
    );
}