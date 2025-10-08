import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View, ActivityIndicator, Text } from 'react-native';
import Welcome from '../screens/Welcome/Welcome'; 
import BottomNav from '../navegation/BottomNav';
import VRScreen from '../screens/VR/VRScreen';
import { AuthProvider, mockAuth } from '../contexts/AuthContext';

export type AppNavigationState = 'welcome' | 'main' | 'vr';

const App = () => {
  const [navigationState, setNavigationState] = useState<AppNavigationState>('welcome');
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = mockAuth.onAuthStateChanged((user) => {
      if (user) setNavigationState('main');
      else setNavigationState('welcome');
      setAuthInitialized(true);
    });
    return unsubscribe;
  }, []);

  const handleLoginSuccess = () => setNavigationState('main');

  if (!authInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Carregando autenticação...</Text>
      </View>
    );
  }

  return (
    <AuthProvider>
      {navigationState === 'welcome' && <Welcome onLoginSuccess={handleLoginSuccess} />}
      {navigationState === 'main' && <BottomNav setNavigationState={setNavigationState} />}
      {navigationState === 'vr' && <VRScreen setNavigationState={setNavigationState} />}

    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#4F46E5', fontSize: 16 },
});

export default App;
