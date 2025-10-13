import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import Welcome from '../screens/Welcome/Welcome';
import BottomNav from '../navegation/BottomNav';
import VRScreen from '../screens/VR/VRScreen';
import { AuthProvider, AuthContext } from '../contexts/AuthContext';

// Define os estados possíveis de navegação
export type AppNavigationState = 'welcome' | 'main' | 'vr';

const AppContent = () => {
  const { user, loading } = useContext(AuthContext);
  const [navigationState, setNavigationState] = React.useState<AppNavigationState>('welcome');

  // Tela de carregamento enquanto o AuthContext inicializa
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Carregando autenticação...</Text>
      </View>
    );
  }

  // Caso não haja usuário autenticado → vai para tela de boas-vindas/login
  if (!user) {
    return <Welcome onLoginSuccess={() => setNavigationState('main')} />;
  }

  // Se o usuário estiver autenticado → navega entre as telas principais
  if (navigationState === 'main') {
    return <BottomNav setNavigationState={setNavigationState} />;
  }

  if (navigationState === 'vr') {
    return <VRScreen setNavigationState={setNavigationState} />;
  }

  return null;
};

// Envolve toda a aplicação com o AuthProvider
const App = () => (
  <AuthProvider>
    <SafeAreaView style={styles.safeArea}>
      <AppContent />
    </SafeAreaView>
  </AuthProvider>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#4F46E5', fontSize: 16 },
});

export default App;
