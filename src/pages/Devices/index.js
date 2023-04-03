import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { app } from '../../config/connectFirebase';
import styles from '../Devices/style';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, getFirestore, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

export default function Devices() {
    const [devices, setDevices] = useState ([]);
    const db = getFirestore(app);
    const navigation = useNavigation();

    async function deleteDevice(id){
        const deviceDoc = doc(db, "Devices", id);
        await deleteDoc(deviceDoc);
    } 

    useEffect (
        () => 
            onSnapshot(collection(db, "Devices" ), (snapshot) =>
                setDevices(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id }))) 
            ),
        []
    );

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
                                id: item.id,
                                Name: item.Name,
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
                <TouchableOpacity style ={styles.buttonNewDevice} onPress={ () => navigation.navigate("NewDevice") }>
                    <Text style={styles.iconButton}>+</Text>        
                </TouchableOpacity>
            </Animatable.View>

        </View>
    );
}