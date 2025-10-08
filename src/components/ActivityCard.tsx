import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'; // ✅ Agora import direto da lib

// Tipagem para os dados de uma atividade
export interface Activity { 
  title: string;
  description: string;
  time: number; // em minutos
  difficulty: 'fácil' | 'médio' | 'difícil';
  benefit: string;
}

// Tipagem das Props
interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  // Cor da tag de dificuldade
  const isEasy = activity.difficulty === 'fácil';
  const tagColor = isEasy ? '#00AA00' : '#333333';
  const tagBgColor = isEasy ? '#E6FFE6' : '#EEEEEE';

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{activity.title}</Text>
      <Text style={styles.cardDescription}>{activity.description}</Text>

      {/* Detalhes */}
      <View style={styles.detailsContainer}>
        {/* Tempo */}
        <View style={styles.detailItem}>
          <Feather name="clock" size={16} color="#666666" />
          <Text style={styles.detailText}>{activity.time} minutos</Text>
        </View>

        {/* Dificuldade */}
        <View style={styles.detailItem}>
          <Feather name="bar-chart-2" size={16} color="#666666" />
          <View style={[styles.difficultyTag, { backgroundColor: tagBgColor }]}>
            <Text style={[styles.difficultyText, { color: tagColor }]}>
              {activity.difficulty}
            </Text>
          </View>
        </View>

        {/* Benefício */}
        <View style={styles.detailItem}>
          <Feather name="zap" size={16} color="#666666" />
          <Text style={styles.detailText}>Melhora: {activity.benefit}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: '#666666',
    marginBottom: 15,
    lineHeight: 22,
  },
  detailsContainer: {
    flexDirection: 'column',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 15,
    color: '#666666',
    marginLeft: 5,
    marginRight: 15,
  },
  difficultyTag: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 5,
  },
  difficultyText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
export default ActivityCard;