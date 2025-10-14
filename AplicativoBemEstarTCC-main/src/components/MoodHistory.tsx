import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import moodService from '../services/moodService';
import { MoodEntry, MoodType } from '../types/mood';

interface MoodHistoryProps {
  onEdit?: (entry: MoodEntry) => void;
  limit?: number;
}

const MoodHistory: React.FC<MoodHistoryProps> = ({ onEdit, limit = 20 }) => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mapeamento dos tipos de humor
  const moodMap: Record<string, { icon: string; color: string }> = {
    'Triste': { icon: 'emoticon-sad-outline', color: '#E74C3C' },
    'Ansioso': { icon: 'emoticon-confused-outline', color: '#F39C12' },
    'Neutro': { icon: 'emoticon-neutral-outline', color: '#F1C40F' },
    'Feliz': { icon: 'emoticon-happy-outline', color: '#2ECC71' },
    'Motivado': { icon: 'emoticon-excited-outline', color: '#9B59B6' },
  };

  const loadEntries = async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const moodEntries = await moodService.getMoodEntries({ limit });
      setEntries(moodEntries);
    } catch (error: any) {
      console.error('Erro ao carregar histórico:', error);
      Alert.alert('Erro', 'Não foi possível carregar o histórico de humor');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, [limit]);

  const handleDelete = (entry: MoodEntry) => {
    Alert.alert(
      'Excluir Registro',
      'Tem certeza que deseja excluir este registro de humor?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => confirmDelete(entry)
        }
      ]
    );
  };

  const confirmDelete = async (entry: MoodEntry) => {
    try {
      await moodService.deleteMoodEntry(entry.id);
      setEntries(prev => prev.filter(e => e.id !== entry.id));
      Alert.alert('Sucesso', 'Registro excluído com sucesso');
    } catch (error: any) {
      console.error('Erro ao excluir:', error);
      Alert.alert('Erro', 'Não foi possível excluir o registro');
    }
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return 'Data inválida';
    }
  };

  const formatTime = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return '--:--';
    }
  };

  const renderMoodEntry = ({ item: entry }: { item: MoodEntry }) => {
    const moodInfo = moodMap[entry.moodType] || { icon: 'help', color: '#999' };

    return (
      <View style={styles.entryCard}>
        <View style={styles.entryHeader}>
          <View style={styles.moodInfo}>
            <View style={[styles.moodIcon, { backgroundColor: `${moodInfo.color}20` }]}>
              <MaterialCommunityIcon 
                name={moodInfo.icon} 
                size={24} 
                color={moodInfo.color} 
              />
            </View>
            <View style={styles.moodDetails}>
              <Text style={styles.moodName}>{entry.moodType}</Text>
              <Text style={styles.moodLevel}>Nível {entry.level}/5</Text>
            </View>
          </View>
          
          <View style={styles.entryActions}>
            {onEdit && (
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => onEdit(entry)}
              >
                <Icon name="edit-2" size={18} color="#6C63FF" />
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleDelete(entry)}
            >
              <Icon name="trash-2" size={18} color="#E74C3C" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.entryMeta}>
          <Text style={styles.entryDate}>
            {formatDate(entry.registrationDate)} às {formatTime(entry.registrationDate)}
          </Text>
        </View>

        {entry.shortDescription && (
          <View style={styles.entryDescription}>
            <Text style={styles.descriptionText}>{entry.shortDescription}</Text>
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loadingText}>Carregando histórico...</Text>
      </View>
    );
  }

  if (entries.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcon name="emoticon-outline" size={64} color="#DDD" />
        <Text style={styles.emptyTitle}>Nenhum registro encontrado</Text>
        <Text style={styles.emptySubtitle}>
          Comece registrando seu humor para ver o histórico aqui
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Histórico de Humor</Text>
        <Text style={styles.subtitle}>{entries.length} registros</Text>
      </View>

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={renderMoodEntry}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadEntries(true)}
            colors={['#6C63FF']}
            tintColor="#6C63FF"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#FAFAFA',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 20,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  subtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 5,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  entryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  moodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  moodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  moodDetails: {
    flex: 1,
  },
  moodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  moodLevel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 2,
  },
  entryActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
  entryMeta: {
    marginBottom: 8,
  },
  entryDate: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  entryDescription: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default MoodHistory;