import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Dashboard from '../screens/Home/Dashboard';
import HumorRegistration from '../screens/HumorRegistration/HumorRegistration';
import { MainScreenState } from '../navegation/BottomNav';
import Icon from 'react-native-vector-icons/Feather';

const MainContent: React.FC = () => {
  // Estado da tela ativa
  const [activeScreen, setActiveScreen] = useState<MainScreenState>('dashboard');

  // Função de navegação compatível
  const handleNavigate = (screen: MainScreenState) => {
    setActiveScreen(screen);
  };

  const handleLogout = () => {
    console.log('Usuário saiu');
  };

  // Renderiza a tela conforme a ativa
  const renderContent = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <Dashboard navigateTo={handleNavigate} handleLogout={handleLogout} />;
      case 'mood':
        return <HumorRegistration onSave={() => handleNavigate('dashboard')} />;
      case 'habit':
        return (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Página de Hábitos</Text>
          </View>
        );
      case 'care':
        return (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Página de Autocuidado</Text>
          </View>
        );
      case 'meditation':
        return (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Página de Meditação</Text>
          </View>
        );
      default:
        return <Dashboard navigateTo={handleNavigate} handleLogout={handleLogout} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentArea}>
        {renderContent()}

        {/* Chat flutuante */}
        <TouchableOpacity style={styles.floatingChat}>
          <Icon name="message-circle" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentArea: { flex: 1, backgroundColor: '#F0F0F5', position: 'relative' },
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  placeholderText: { fontSize: 30, color: '#888' },
  floatingChat: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    zIndex: 10,
  },
});

export default MainContent;
