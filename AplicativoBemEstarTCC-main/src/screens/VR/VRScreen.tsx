  // VRScreen.tsx
  import React from 'react';
  import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
  import { ViroARScene, ViroARSceneNavigator, Viro360Image } from '@viro-community/react-viro';

  // Cena principal
  const HelloWorldSceneAR = () => {
    return (
      <ViroARScene>
        <Viro360Image
          source={require('../../../assets/charolettenbrunn_park.jpg')}
          rotation={[0, -90, 0]}
        />
      </ViroARScene>
    );
  };

  // Props para controle de navegação
  interface VRScreenProps {
    setNavigationState: (state: 'welcome' | 'main' | 'vr') => void;
  }

  // Componente VR
  const VRScreen: React.FC<VRScreenProps> = ({ setNavigationState }) => {
    const handleExitVR = () => {
      setNavigationState('main'); // volta para o app principal
    };

    return (
      <View style={styles.container}>
        <ViroARSceneNavigator
          autofocus={true}
          initialScene={{ scene: HelloWorldSceneAR }}
          style={styles.viroView}
        />

        {/* Botão de sair */}
        <TouchableOpacity style={styles.exitButton} onPress={handleExitVR}>
          <Text style={styles.exitButtonText}>Sair do VR</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: { flex: 1 },
    viroView: { flex: 1 },
    exitButton: {
      position: 'absolute',
      top: 40,
      right: 20,
      backgroundColor: '#FF7043',
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 6,
    },
    exitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  });

  export default VRScreen;