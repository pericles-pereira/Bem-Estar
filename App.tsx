import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ViroARScene,
  ViroARSceneNavigator,
  Viro360Image,
} from '@viro-community/react-viro';

// Cena principal que vai conter nossa imagem 360
const HelloWorldSceneAR = () => {
  return (
    <ViroARScene>
      <Viro360Image
        source={require('./assets/charolettenbrunn_park.jpg')} // Carrega a imagem local da pasta assets
        rotation={[0, -90, 0]} // Ajusta a rotação inicial para olhar para frente
      />
    </ViroARScene>
  );
};

// Componente principal do App*/
const App = () => {
  return (
    <View style={styles.container}>
      
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: HelloWorldSceneAR, // Define nossa cena como a cena inicial
        }}
        style={styles.viroView}
      />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viroView: {
    flex: 1,
  },
});

export default App;