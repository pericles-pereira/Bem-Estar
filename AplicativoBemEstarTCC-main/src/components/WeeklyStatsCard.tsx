import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import moodService from '../services/moodService';
import { MoodStats } from '../types/mood';

interface WeeklyStatsCardProps {
  onViewHistory?: () => void;
}

const WeeklyStatsCard: React.FC<WeeklyStatsCardProps> = ({ onViewHistory }) => {
  const [stats, setStats] = useState<MoodStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const weeklyStats = await moodService.getWeeklyStats();
      setStats(weeklyStats);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      // Em caso de erro, definir um estado vazio padrão
      setStats({
        totalEntries: 0,
        averageMood: 0,
        moodDistribution: {},
        lastEntry: null,
        trend: 'stable'
      });
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return { icon: 'trending-up', color: '#2ECC71', text: 'Melhorando' };
      case 'declining':
        return { icon: 'trending-down', color: '#E74C3C', text: 'Declinando' };
      default:
        return { icon: 'trending-neutral', color: '#F39C12', text: 'Estável' };
    }
  };

  const getMostFrequentMood = (): { name: string; count: number; percentage: number } => {
    if (!stats?.moodDistribution) {
      return { name: 'Nenhum', count: 0, percentage: 0 };
    }

    const entries = Object.entries(stats.moodDistribution);
    if (entries.length === 0) {
      return { name: 'Nenhum', count: 0, percentage: 0 };
    }

    const [name, count] = entries.reduce((max, current) => 
      current[1] > max[1] ? current : max
    );

    const percentage = stats.totalEntries > 0 ? (count / stats.totalEntries) * 100 : 0;
    return { name, count, percentage };
  };

  const StatItem: React.FC<{
    icon: string;
    label: string;
    value: string | number;
    color: string;
    subtitle?: string;
  }> = ({ icon, label, value, color, subtitle }) => (
    <View style={styles.statItem}>
      <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
        <MaterialCommunityIcon name={icon} size={24} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Seu Resumo Semanal</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6C63FF" />
          <Text style={styles.loadingText}>Carregando estatísticas...</Text>
        </View>
      </View>
    );
  }

  if (!stats || stats.totalEntries === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Seu Resumo Semanal</Text>
        </View>
        
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcon name="chart-line" size={48} color="#DDD" />
          <Text style={styles.emptyTitle}>Nenhum registro esta semana</Text>
          <Text style={styles.emptySubtitle}>
            Comece registrando seu humor para ver suas estatísticas aqui!
          </Text>
        </View>
      </View>
    );
  }

  const trendInfo = getTrendIcon(stats.trend);
  const mostFrequentMood = getMostFrequentMood();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Seu Resumo Semanal</Text>
        {onViewHistory && (
          <TouchableOpacity onPress={onViewHistory} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Ver histórico</Text>
            <MaterialCommunityIcon name="arrow-right" size={16} color="#6C63FF" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.statsGrid}>
        <StatItem
          icon="emoticon-happy-outline"
          label="Registros"
          value={stats.totalEntries}
          color="#FF69B4"
          subtitle="esta semana"
        />
        
        <StatItem
          icon="chart-line"
          label="Média"
          value={stats?.averageMood?.toFixed(1)}
          color="#00BFFF"
          subtitle="de 5.0"
        />
        
        <StatItem
          icon="star-outline"
          label="Mais frequente"
          value={mostFrequentMood.name}
          color="#8A2BE2"
          subtitle={`${mostFrequentMood.percentage.toFixed(0)}%`}
        />
        
        <StatItem
          icon={trendInfo.icon}
          label="Tendência"
          value={trendInfo.text}
          color={trendInfo.color}
          subtitle="7 dias"
        />
      </View>

      {stats.lastEntry && (
        <View style={styles.lastEntryContainer}>
          <Text style={styles.lastEntryTitle}>Último registro:</Text>
          <Text style={styles.lastEntryText}>
            {stats.lastEntry.moodType} • {new Date(stats.lastEntry.registrationDate).toLocaleDateString('pt-BR')}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 600,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButtonText: {
    fontSize: 14,
    color: '#6C63FF',
    marginRight: 4,
  },
  loadingContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 15,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 20,
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
  },
  statSubtitle: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
    marginTop: 2,
  },
  lastEntryContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#6C63FF',
  },
  lastEntryTitle: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
  },
  lastEntryText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});

export default WeeklyStatsCard;