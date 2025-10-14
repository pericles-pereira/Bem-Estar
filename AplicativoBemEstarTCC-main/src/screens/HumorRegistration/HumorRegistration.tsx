// HumorRegistration.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MoodType, CreateMoodEntryRequest } from '../../types/mood';
import moodService from '../../services/moodService';

// Definição padrão dos estados de humor (fallback se API falhar)
const defaultMoods: MoodType[] = [
  { level: 1, name: 'Triste', icon: 'emoticon-sad-outline', color: '#E74C3C' },
  { level: 2, name: 'Ansioso', icon: 'emoticon-confused-outline', color: '#F39C12' },
  { level: 3, name: 'Neutro', icon: 'emoticon-neutral-outline', color: '#F1C40F' },
  { level: 4, name: 'Feliz', icon: 'emoticon-happy-outline', color: '#2ECC71' },
  { level: 5, name: 'Motivado', icon: 'emoticon-excited-outline', color: '#9B59B6' },
];

// Botão de humor
const MoodButton = ({ mood, isSelected, onSelect }: any) => (
  <TouchableOpacity
    style={[
      styles.moodButton,
      isSelected && { backgroundColor: `${mood.color}20`, borderColor: mood.color },
    ]}
    onPress={onSelect}
    activeOpacity={0.8}
  >
    <MaterialCommunityIcon
      name={mood.icon}
      size={42}
      color={isSelected ? mood.color : '#7F8C8D'}
    />
    <Text style={[styles.moodText, { color: isSelected ? mood.color : '#333' }]}>
      {mood.name}
    </Text>
  </TouchableOpacity>
);

interface HumorRegistrationProps {
  onSave: () => void;
}

const HumorRegistration: React.FC<HumorRegistrationProps> = ({ onSave }) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  // Usar os tipos de humor padrão
  const moods = defaultMoods;

  const handleSave = async () => {
    if (selectedMood === null) {
      Alert.alert('Atenção', 'Por favor, selecione um humor antes de salvar!');
      return;
    }

    const selectedMoodData = moods.find((m: MoodType) => m.level === selectedMood);
    if (!selectedMoodData) {
      Alert.alert('Erro', 'Humor selecionado é inválido');
      return;
    }

    setLoading(true);
    try {
      const moodEntry: CreateMoodEntryRequest = {
        moodType: selectedMoodData.name,
        level: selectedMood,
        shortDescription: note.trim() || undefined,
      };

      await moodService.createMoodEntry(moodEntry);
      
      // Limpar formulário
      setSelectedMood(null);
      setNote('');
      
      Alert.alert(
        'Sucesso!', 
        'Seu registro de humor foi salvo com sucesso.',
        [{ text: 'OK', onPress: onSave }]
      );
    } catch (error: any) {
      console.error('Erro ao salvar humor:', error);
      Alert.alert('Erro', error.message || 'Não foi possível salvar o registro');
    } finally {
      setLoading(false);
    }
  };



  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Como você está se sentindo hoje?</Text>
        <Text style={styles.subtitle}>
          Escolha um humor e escreva um pouco sobre o seu dia ✨
        </Text>
      </View>

      {/* Emojis de humor */}
      <View style={styles.moodGrid}>
        {moods.map((mood: MoodType) => (
          <MoodButton
            key={mood.level}
            mood={mood}
            isSelected={selectedMood === mood.level}
            onSelect={() => setSelectedMood(mood.level)}
          />
        ))}
      </View>

      {/* Resumo */}
      {selectedMood && (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>
            Hoje você se sente:{' '}
            <Text
              style={{
                color: moods.find((m: MoodType) => m.level === selectedMood)?.color,
                fontWeight: 'bold',
              }}
            >
              {moods.find((m: MoodType) => m.level === selectedMood)?.name}
            </Text>
          </Text>
        </View>
      )}

      {/* Campo de anotações */}
      <View style={styles.noteSection}>
        <Text style={styles.noteLabel}>Escreva sobre seu dia (opcional)</Text>
        <TextInput
          style={styles.noteInput}
          placeholder="Anote seus pensamentos ou sentimentos..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={5}
          value={note}
          onChangeText={setNote}
        />
      </View>

      {/* Botão salvar */}
      <TouchableOpacity
        style={[
          styles.saveButton, 
          (selectedMood === null || loading) && styles.saveButtonDisabled
        ]}
        onPress={handleSave}
        disabled={selectedMood === null || loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.saveButtonText}>Salvar Registro</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  contentContainer: { padding: 20, paddingBottom: 50 },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },

  header: {
    marginBottom: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#7F8C8D',
    textAlign: 'center',
  },

  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  moodButton: {
    width: 95,
    height: 95,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  moodText: { fontSize: 13, marginTop: 6, textAlign: 'center', fontWeight: '600' },

  summaryCard: {
    backgroundColor: '#EAF0F7',
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    alignItems: 'center',
  },
  summaryText: { fontSize: 16, color: '#34495E' },

  noteSection: { marginBottom: 30 },
  noteLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2C3E50',
  },
  noteInput: {
    width: '100%',
    minHeight: 120,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    textAlignVertical: 'top',
  },

  saveButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: '#6C63FF',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  saveButtonDisabled: { backgroundColor: '#AAA' },
  saveButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});

export default HumorRegistration;
