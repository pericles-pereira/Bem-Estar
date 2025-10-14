import api from './api';
import {
  MoodEntry,
  CreateMoodEntryRequest,
  UpdateMoodEntryRequest,
  MoodStats,
  MoodQueryOptions,
  MoodType,
  MoodApiResponse,
  MoodStatsResponse
} from '../types/mood';

class MoodService {
  private readonly BASE_URL = '/mood';

  /**
   * Busca todos os tipos de humor disponíveis
   */
  async getMoodTypes(): Promise<MoodType[]> {
    try {
      const response = await api.get('/mood-types');
      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar tipos de humor:', error);
      throw new Error(error.response?.data?.error || 'Erro ao buscar tipos de humor');
    }
  }

  /**
   * Busca registros de humor do usuário
   */
  async getMoodEntries(options?: MoodQueryOptions): Promise<MoodEntry[]> {
    try {
      const params = new URLSearchParams();
      
      if (options?.startDate) params.append('startDate', options.startDate);
      if (options?.endDate) params.append('endDate', options.endDate);
      if (options?.limit) params.append('limit', options.limit.toString());

      const response = await api.get<MoodApiResponse>(`${this.BASE_URL}?${params}`);
      return response.data.moodEntries || [];
    } catch (error: any) {
      console.error('Erro ao buscar registros de humor:', error);
      throw new Error(error.response?.data?.error || 'Erro ao buscar registros');
    }
  }

  /**
   * Cria um novo registro de humor
   */
  async createMoodEntry(moodData: CreateMoodEntryRequest): Promise<MoodEntry> {
    try {
      const response = await api.post<MoodApiResponse>(this.BASE_URL, moodData);
      
      if (!response.data.moodEntry) {
        throw new Error('Resposta inválida do servidor');
      }

      return response.data.moodEntry;
    } catch (error: any) {
      console.error('Erro ao criar registro de humor:', error);
      
      if (error.response?.data?.details) {
        throw new Error(error.response.data.details.join(', '));
      }
      
      throw new Error(error.response?.data?.error || 'Erro ao criar registro');
    }
  }

  /**
   * Atualiza um registro de humor existente
   */
  async updateMoodEntry(id: string, updates: UpdateMoodEntryRequest): Promise<MoodEntry> {
    try {
      const response = await api.put<MoodApiResponse>(`${this.BASE_URL}/${id}`, updates);
      
      if (!response.data.moodEntry) {
        throw new Error('Resposta inválida do servidor');
      }

      return response.data.moodEntry;
    } catch (error: any) {
      console.error('Erro ao atualizar registro de humor:', error);
      
      if (error.response?.data?.details) {
        throw new Error(error.response.data.details.join(', '));
      }
      
      throw new Error(error.response?.data?.error || 'Erro ao atualizar registro');
    }
  }

  /**
   * Deleta um registro de humor
   */
  async deleteMoodEntry(id: string): Promise<void> {
    try {
      await api.delete<MoodApiResponse>(`${this.BASE_URL}/${id}`);
    } catch (error: any) {
      console.error('Erro ao deletar registro de humor:', error);
      throw new Error(error.response?.data?.error || 'Erro ao deletar registro');
    }
  }

  /**
   * Busca estatísticas de humor do usuário
   */
  async getMoodStats(options?: MoodQueryOptions): Promise<MoodStats> {
    try {
      const params = new URLSearchParams();
      
      if (options?.startDate) params.append('startDate', options.startDate);
      if (options?.endDate) params.append('endDate', options.endDate);

      const response = await api.get(`${this.BASE_URL}/stats?${params}`);
      const stats = response.data.data || response.data;
      
      return stats;
    } catch (error: any) {
      console.error('Erro ao buscar estatísticas de humor:', error);
      throw new Error(error.response?.data?.error || 'Erro ao buscar estatísticas');
    }
  }

  /**
   * Busca registros recentes (últimos 7 dias)
   */
  async getRecentMoodEntries(limit = 10): Promise<MoodEntry[]> {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    return this.getMoodEntries({ startDate, endDate, limit });
  }

  /**
   * Busca estatísticas da semana atual
   */
  async getWeeklyStats(): Promise<MoodStats> {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    console.log('getWeeklyStats called with dates:', { startDate, endDate });
    return this.getMoodStats({ startDate, endDate });
  }
}

export default new MoodService();