import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../config/connectFirebase';
import styles from '../Signin/style';
import { useNavigation } from '@react-navigation/native';

export default function Init() {
    const navigation = useNavigation();
    const connectedCallback = () => {
        console.log('ABRIU A TELA');
        } 

    return (
        <View style ={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Dispositivos</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style ={styles.containerForm}>

            </Animatable.View>

        </View>
    );
}