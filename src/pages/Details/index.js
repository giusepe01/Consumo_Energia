import React, { useEffect } from 'react';
import { View, Text, BackHandler } from 'react-native';
// import da função de animação de tela //
import * as Animatable from 'react-native-animatable';
// import da conexão com o banco //
import { app } from '../../config/connectFirebase';
// import dos estilos utilizados em cada componente da tela //
import styles from '../Details/style';
// import das funçõe utilizdas pelo banco de dados (Firebase) //
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
// import da função de navegação entre telas //
import { useNavigation } from '@react-navigation/native';

// definição das variáveis utilizadas na pagina //
export default function Details({route}) {
    const db = getFirestore(app);
    const navigation = useNavigation();

    // função para resgatar os dados de consumo e status do dispositivo (em tempo real) //
    useEffect (
        () => 
        onSnapshot(doc(db, route.params.idUser, route.params.Itemid), (doc) =>{
                console.log(doc.data());
                let JsonDevice = JSON.parse(JSON.stringify(doc.data()));
                console.log('Valor do Consumo', JsonDevice.Consumo);
                console.log('Está ligado?', JsonDevice.Ligado);
            }),
        []
    );

    // define a função do botão voltar tela
    function GoBack() {
        navigation.goBack();
        return true;
      }
    
    // define a chamada do botão voltar  
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

            {/* Mostra na tela os dados de consumo do dispositivo */}
            <Animatable.View animation="fadeInUp" style ={styles.containerForm}>
            </Animatable.View>

        </View>
    );
}