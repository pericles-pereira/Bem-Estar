import React, { useContext, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import BottomNav from '../navegation/BottomNav';
import VRScreen from '../screens/VR/VRScreen';
import { AuthProvider, AuthContext } from '../contexts/AuthContext';
import Welcome from '../screens/Welcome/Welcome';
import { configureGoogleSignIn } from '../config/googleConfig';

// Define os estados possíveis de navegação
export type AppNavigationState = 'welcome' | 'main' | 'vr';

const AppContent = () => {
  const { user, loading } = useContext(AuthContext);
  const [navigationState, setNavigationState] = React.useState<AppNavigationState>('welcome');

  // Configurar Google SignIn na inicialização
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  // Automaticamente ir para 'main' se o usuário está autenticado
  useEffect(() => {
    if (user && !loading && navigationState === 'welcome') {
      setNavigationState('main');
    }
  }, [user, loading, navigationState]);

  // Tela de carregamento enquanto o AuthContext inicializa
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Carregando...</Text>
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

  // Se chegou aqui, há um usuário mas navigationState não é 'main' nem 'vr'
  // Renderizar BottomNav como fallback
  return <BottomNav setNavigationState={setNavigationState} />;
};

// Envolve toda a aplicação com os Providers
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
