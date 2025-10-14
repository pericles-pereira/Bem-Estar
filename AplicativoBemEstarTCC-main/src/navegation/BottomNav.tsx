// BottomNav.tsx
import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Dashboard from '../screens/Home/Dashboard';
import HumorRegistration from '../screens/HumorRegistration/HumorRegistration';
import HabitTrackerScreen from '../screens/HabitTracker/HabitTrackerScreen';
import SelfCareScreen from '../screens/SelfCare/SelfCareScreen';
import MeditationScreen from '../screens/Meditation/MeditationScreen';
import { Home, Smile, TrendingUp, Heart, Brain, MessageCircle } from 'lucide-react-native';
import { AuthContext } from '../contexts/AuthContext';

export type MainScreenState = 'dashboard' | 'mood' | 'habit' | 'care' | 'meditation';

const TabItems = [
  { name: 'Início', state: 'dashboard' as MainScreenState, Icon: Home },
  { name: 'Humor', state: 'mood' as MainScreenState, Icon: Smile },
  { name: 'Hábitos', state: 'habit' as MainScreenState, Icon: TrendingUp },
  { name: 'Cuidados', state: 'care' as MainScreenState, Icon: Heart },
  { name: 'Meditação', state: 'meditation' as MainScreenState, Icon: Brain },
];

interface BottomNavProps {
  setNavigationState: (state: 'welcome' | 'main' | 'vr') => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ setNavigationState }) => {
  const [currentTab, setCurrentTab] = useState<MainScreenState>('dashboard');
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    setNavigationState('welcome');
  };
  
  const handleMoodSave = () => setCurrentTab('dashboard');

  const renderScreen = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard navigateTo={setCurrentTab} handleLogout={handleLogout} />;
      case 'mood':
        return <HumorRegistration onSave={handleMoodSave} />;
      case 'habit':
        return <HabitTrackerScreen />;
      case 'care':
        return <SelfCareScreen />;
      case 'meditation':
        // ✅ Passando setNavigationState para MeditationScreen
        return <MeditationScreen setNavigationState={setNavigationState} />;
      default:
        return <Dashboard navigateTo={setCurrentTab} handleLogout={handleLogout} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentArea}>{renderScreen()}</View>

      <View style={styles.bottomBar}>
        {TabItems.map((item) => {
          const isSelected = currentTab === item.state;
          return (
            <TouchableOpacity
              key={item.state}
              style={styles.tabItem}
              onPress={() => setCurrentTab(item.state)}
            >
              <View style={[styles.iconContainer, isSelected && styles.iconContainerSelected]}>
                <item.Icon size={24} color={isSelected ? '#4F46E5' : '#7F8C8D'} />
              </View>
              <Text style={[styles.tabText, isSelected && styles.tabTextSelected]}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F7' },
  contentArea: { flex: 1, position: 'relative' },
  bottomBar: { flexDirection: 'row', height: 80, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#eee', paddingBottom: 10 },
  tabItem: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 5 },
  iconContainer: { padding: 8, borderRadius: 12 },
  iconContainerSelected: { backgroundColor: '#EDE9FE' },
  tabText: { fontSize: 12, color: '#7F46E5', marginTop: 4 },
  tabTextSelected: { color: '#4F46E5', fontWeight: '600' },
});

export default BottomNav;
