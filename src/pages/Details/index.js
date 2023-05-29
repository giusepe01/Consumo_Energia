import React, { useEffect, useState } from 'react';
import { View, Text, BackHandler, Switch } from 'react-native';
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
    const [Ligado, setLigado] = useState ('');
    const [Consumo, setConsumo] = useState ('');

    // função para resgatar os dados de consumo e status do dispositivo (em tempo real) //
    useEffect (
        () => 
        onSnapshot(doc(db, route.params.idUser, route.params.Itemid), (doc) =>{
                let JsonDevice = JSON.parse(JSON.stringify(doc.data()));
                setLigado(JsonDevice.Ligado)
                setConsumo(JsonDevice.Consumo)
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

                {/* Tratamento para identificar se o dispositivo está ligado ou não */}
                <View style={styles.switch}>
                    <Text style={styles.statusDevice}>{Ligado ? "Dispositivo ligado" : "Dispositivo desligado"}</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#38A69D'}}
                        thumbColor={Ligado ? '#f5dd4b' : '#f4f3f4'}
                        onValueChange={null}
                        value={Ligado}
                        style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                    />
                </View>

                {/* Mostrar os valores de gasto do dispositivo */}
                <View style={styles.switch}>
                    <Text style={styles.statusDevice}>{"Gasto mensal: R$ "}{Consumo.toFixed(2)}</Text>
                </View>

                <View style={styles.switch}>
                    <Text style={styles.statusDevice}>{"Média de gasto semanal:"+ "\n"}{"R$"} {((Consumo / 30) * 7).toFixed(2)}</Text>
                </View>

                <View style={styles.switch}>
                    <Text style={styles.statusDevice}>{"Média de gasto diário:"+ "\n"}{"R$"} {(Consumo / 30).toFixed(2)}</Text>
                </View>

                <View style={styles.switch}>
                    <Text style={styles.statusDevice}>{"Projeção de gasto anual:"+ "\n"}{"R$"} {((Consumo / 30) * 365).toFixed(2)}</Text>
                </View>
                
            </Animatable.View>
        </View>
    );
}