import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import da função de animação de tela //
import * as Animatable from 'react-native-animatable';
// import da função de navegação entre telas //
import { useNavigation } from '@react-navigation/native';
// import dos estilos dos componentes de tela //
import styles from './style';

export default function Welcome() {
    const navigation = useNavigation();

// Definição do icone ao iniciar o app //
    return (
        <View style={styles.container}>
            
            {/* Logo aplicativo ao iniciar o app */}
            <View style={styles.containerLogo}>
                <Animatable.Image
                    animation="flipInY"
                    source={require('../../../assets/logo.png')}
                    style={{ width: '100%' }}
                    resizeMode="contain" />
            </View>

            <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Monitore seus gastos de qualquer lugar</Text>
                <Text style={styles.text}>Faça o Login para começar</Text>

                {/* Define botão de acesso ao app */}
                <TouchableOpacity 
                    style={styles.button}
                    onPress={ () => navigation.navigate("SignIn")} >
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>

            </Animatable.View>

        </View>
    );
}