import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'; // ✅ Substituição aqui
import HabitItem, { Habit } from '../../components/HabitItem';

// Dados de exemplo
const initialHabits: Habit[] = [
  { id: 1, text: 'Beber 2L de água', completed: false },
  { id: 2, text: 'Meditar por 10 min', completed: false },
  { id: 3, text: 'Ler por 15 min', completed: false },
  { id: 4, text: 'Fazer exercício físico', completed: false },
];

const HabitTrackerScreen: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);

  const handleToggleHabit = (habitId: number, isCompleted: boolean) => {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === habitId ? { ...habit, completed: isCompleted } : habit
      )
    );
  };

  const progress = useMemo(() => {
    const completed = habits.filter(h => h.completed).length;
    return habits.length === 0 ? 0 : Math.round((completed / habits.length) * 100);
  }, [habits]);

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  };
  const formattedDate = today
    .toLocaleDateString('pt-BR', options)
    .replace('feira', '')
    .replace(/\b\w/g, c => c.toUpperCase());

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rastreador de Hábitos</Text>
        <Text style={styles.headerSubtitle}>
          Construa uma rotina positiva, um dia de cada vez 🌱
        </Text>
      </View>

      {/* Card do Dia */}
      <View style={styles.dayCard}>
        <View style={styles.dayInfo}>
          <Feather name="calendar" size={20} color="#6C63FF" />
          <Text style={styles.dayText}>{formattedDate}</Text>
        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.progressLabel}>Progresso de hoje</Text>
          <Text style={styles.progressValue}>{progress}%</Text>
        </View>

        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
      </View>

      {/* Lista de Hábitos */}
      <View style={styles.habitsSection}>
        <Text style={styles.sectionTitle}>Seus hábitos</Text>
        {habits.map(habit => (
          <HabitItem key={habit.id} habit={habit} onToggle={handleToggleHabit} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#6C63FF',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E5E5E5',
  },
  dayCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  dayInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 8,
  },
  dayText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#666666',
  },
  progressValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6C63FF',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#EEEEEE',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6C63FF',
  },
  habitsSection: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
});

export default HabitTrackerScreen;
