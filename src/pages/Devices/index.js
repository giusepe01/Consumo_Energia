import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, alert, BackHandler, Alert } from 'react-native';
// import da função de animação de tela //
import * as Animatable from 'react-native-animatable';
// import da conexão com o banco //
import { app } from '../../config/connectFirebase';
// import dos estilos de cada componente utilizado na tela //
import styles from '../Devices/style';
// import da função de navegação entre telas //
import { useNavigation } from '@react-navigation/native';
// import das função utilizadas pelo banco de dados (Firebase) //
import { collection, getFirestore, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
// import da função de lista //
import { FlatList } from 'react-native-gesture-handler';
// import de icones //
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

// definição de todas as variáveis utilizadas na pagina //
export default function Devices({route}) {
    const [devices, setDevices] = useState ([]);
    const db = getFirestore(app);
    const navigation = useNavigation();
    const auth = getAuth(app);

    // confirma a intenção do usuário ao realizar a função de voltar tela //
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

    // confirma a intenção do usuário ao realizar a função de logout //
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

    // função de logout do usuário //
    function logout () {
        signOut(auth).then(() => {
            navigation.navigate("SignIn")
      }).catch((error) => {
            alert('Erro ao fazer logout');
      });}

    // função de deletar um dispositivo //
    async function deleteDevice(id){
        const deviceDoc = doc(db, route.params.idUser, id);
        await deleteDoc(deviceDoc);
    } 

    // função para ler todos os dispositivos do usuário logado (em tempo real) //
    useEffect (
        () => 
            onSnapshot(collection(db, route.params.idUser ), (snapshot) =>
                setDevices(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id }))) 
            ),
        []
    );

    // define a função do botão de voltar tela //
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
                {/* percorre todos os dispositivos encontrado no banco, e para cada ocorrencia, cria um botão na tela */}
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
                        {/* botão para deletar o dispositivo do banco */}
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
                {/* botão para criar um novo dispositivo no banco */}
                <TouchableOpacity style ={styles.buttonNewDevice} onPress={ () => navigation.navigate("NewDevice", {idUser: route.params.idUser}) }>
                    <Text style={styles.iconButton}>+</Text>        
                </TouchableOpacity>

                {/* botão de logout do app */}
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