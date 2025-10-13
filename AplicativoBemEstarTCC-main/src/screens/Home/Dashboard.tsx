import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import { MainScreenState } from '../../navegation/BottomNav';

interface DashboardProps {
  navigateTo: (screen: MainScreenState) => void;
  handleLogout: () => void;
}

interface QuickActionCardProps {
  title: string;
  subtitle: string;
  iconName: string;
  iconColor: string;
  backgroundColor: string;
  onPress: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ title, subtitle, iconName, iconColor, backgroundColor, onPress }) => (
  <TouchableOpacity style={styles.cardWrapper} onPress={onPress}>
    <View style={styles.card}>
      <View style={[styles.iconCircle, { backgroundColor }]}>
        <MaterialCommunityIcon name={iconName} size={32} color={iconColor} />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
);

const Dashboard: React.FC<DashboardProps> = ({ navigateTo, handleLogout }) => {
  const userName = 'Mateus';
  const hour = new Date().getHours();
  let greeting = 'Boa noite';
  if (hour < 12) greeting = 'Bom dia';
  else if (hour < 18) greeting = 'Boa tarde';

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cabeçalho com cor sólida */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.greetingText}>{greeting}, {userName}!</Text>
            <Text style={styles.subHeaderText}>Como você está se sentindo hoje?</Text>

            <TouchableOpacity style={styles.moodButton} onPress={() => navigateTo('mood')}>
              <Text style={styles.moodButtonText}>Registrar humor de hoje</Text>
              <Icon name="arrow-right" size={20} color="#4B0082" style={styles.moodButtonIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Ações Rápidas */}
        <View style={styles.actionsGrid}>
          <QuickActionCard
            title="Registrar Humor"
            subtitle="Como você está se sentindo agora?"
            iconName="emoticon-happy-outline"
            iconColor="#FF69B4"
            backgroundColor="#FEE8F3"
            onPress={() => navigateTo('mood')}
          />
          <QuickActionCard
            title="Marcar Hábito"
            subtitle="Atualize seus hábitos diários"
            iconName="trending-up"
            iconColor="#00BFFF"
            backgroundColor="#E0FFFF"
            onPress={() => navigateTo('habit')}
          />
          <QuickActionCard
            title="Autocuidado"
            subtitle="Explore atividades de bem-estar"
            iconName="heart-outline"
            iconColor="#8A2BE2"
            backgroundColor="#E6E0FF"
            onPress={() => navigateTo('care')}
          />
          <QuickActionCard
            title="Imersão VR"
            subtitle="Meditação imersiva"
            iconName="virtual-reality"
            iconColor="#3CB371"
            backgroundColor="#E3FCEE"
            onPress={() => navigateTo('meditation')}
          />
        </View>

        {/* Estatísticas */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Seu Resumo Semanal</Text>
          <View style={styles.statsBox}>
            <Text style={styles.statsText}>Estatísticas de humor e hábitos aparecerão aqui.</Text>
            <Text style={styles.statsHint}>Registre mais dados para ver o seu progresso!</Text>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F0F5' },
  scrollContent: { paddingBottom: 20, alignItems: 'center' },
  header: {
    backgroundColor: '#4B0082', 
    width: '100%',
    padding: 30,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerContent: { width: '100%', maxWidth: 600, alignItems: 'flex-start' },
  greetingText: { fontSize: 26, fontWeight: 'bold', color: 'white', marginBottom: 5 },
  subHeaderText: { fontSize: 16, color: '#E0FFFF', marginBottom: 25 },
  moodButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 8,
  },
  moodButtonText: { fontSize: 16, fontWeight: 'bold', color: '#4B0082' },
  moodButtonIcon: { marginLeft: 10 },

  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingHorizontal: 10, maxWidth: 640 },
  cardWrapper: { width: '45%', margin: 8, maxWidth: 300 },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    height: 160,
    justifyContent: 'space-between',
  },
  iconCircle: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginTop: 5 },
  cardSubtitle: { fontSize: 12, color: '#777', marginTop: 4 },

  statsContainer: { width: '90%', maxWidth: 600, marginTop: 20, paddingHorizontal: 10 },
  statsTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  statsBox: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#9932CC',
  },
  statsText: { fontSize: 16, color: '#555', marginBottom: 8 },
  statsHint: { fontSize: 14, color: '#AAA', fontStyle: 'italic' },

  logoutButton: { marginTop: 40, padding: 10, alignItems: 'center', alignSelf: 'center' },
  logoutText: { color: '#B33A3A', fontSize: 16, textDecorationLine: 'underline' },
});

export default Dashboard;