import React from 'react';
// import da função de barra de status //
import { StatusBar } from 'react-native';
// import da função de navegação entre telas //
import { NavigationContainer } from '@react-navigation/native';
// import das rotas que o app irá percorrer //
import Routes from './src/routes';

// inicializando o app e definindo as características da barrra de status //
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#38A69D" barStyle="light-content" /> 
      <Routes/>
    </NavigationContainer>
  );
}