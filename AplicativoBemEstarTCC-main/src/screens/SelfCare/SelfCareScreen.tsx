import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'; // ✅ Substituição
import ActivityCard, { Activity } from '../../components/ActivityCard';

// --- Atividades Físicas ---
const physicalActivities: Activity[] = [
  {
    title: 'Caminhada de 15 minutos',
    description: 'Uma caminhada leve ao ar livre para clarear a mente e mover o corpo.',
    time: 15,
    difficulty: 'fácil',
    benefit: 'energia',
  },
  {
    title: 'Alongamento matinal',
    description: 'Alongue o corpo por 10 minutos para despertar os músculos.',
    time: 10,
    difficulty: 'fácil',
    benefit: 'flexibilidade',
  },
  {
    title: 'Treino funcional leve',
    description: 'Uma série rápida de exercícios de peso corporal para ativar a circulação.',
    time: 20,
    difficulty: 'médio',
    benefit: 'vitalidade',
  },
];

// --- Atividades Emocionais ---
const emotionalActivities: Activity[] = [
  {
    title: 'Escrever em um diário',
    description: 'Coloque seus pensamentos e sentimentos no papel sem julgamento.',
    time: 10,
    difficulty: 'fácil',
    benefit: 'calmo',
  },
  {
    title: 'Praticar respiração profunda',
    description: 'Faça 5 minutos de respiração consciente para reduzir a ansiedade.',
    time: 5,
    difficulty: 'fácil',
    benefit: 'tranquilidade',
  },
  {
    title: 'Sessão de gratidão',
    description: 'Liste 3 coisas pelas quais você é grato hoje.',
    time: 5,
    difficulty: 'fácil',
    benefit: 'positividade',
  },
];

// --- Atividades Artísticas ---
const artisticActivities: Activity[] = [
  {
    title: 'Desenhar livremente',
    description: 'Pegue papel e lápis e desenhe o que vier à mente, sem regras.',
    time: 20,
    difficulty: 'fácil',
    benefit: 'criatividade',
  },
  {
    title: 'Ouvir música relaxante',
    description: 'Escolha uma playlist tranquila e permita-se relaxar.',
    time: 15,
    difficulty: 'fácil',
    benefit: 'bem-estar',
  },
  {
    title: 'Pintar ou colorir',
    description: 'Use cores para expressar sentimentos e aliviar a mente.',
    time: 30,
    difficulty: 'médio',
    benefit: 'expressão',
  },
];

const SelfCareScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={styles.heartIconBackground}>
          <Feather name="heart" size={35} color="#FFFFFF" />
        </View>
        
        <Text style={styles.mainTitle}>Atividades de Autocuidado</Text>
        <Text style={styles.mainSubtitle}>
          Reserve um tempo para você. Você merece.
        </Text>
      </View>

      {/* Seção Física */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Feather name="activity" size={24} color="#2ECC71" />
          <Text style={styles.sectionTitle}>Cuidado Físico</Text>
        </View>
        {physicalActivities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
      </View>

      {/* Seção Emocional */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Feather name="smile" size={24} color="#FFB347" />
          <Text style={styles.sectionTitle}>Cuidado Emocional</Text>
        </View>
        {emotionalActivities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
      </View>

      {/* Seção Artística */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Feather name="music" size={24} color="#9B59B6" />
          <Text style={styles.sectionTitle}>Cuidado Artístico</Text>
        </View>
        {artisticActivities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
      </View>

      {/* Espaço inferior */}
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 40,
  },
  heartIconBackground: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: '#FF6370',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#FF6370',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  mainSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333333',
    marginLeft: 10,
  },
});

export default SelfCareScreen;
