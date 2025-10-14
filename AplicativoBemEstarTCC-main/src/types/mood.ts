// Tipos para o sistema de humor baseados no backend

export interface MoodType {
  level: number;
  name: 'Triste' | 'Ansioso' | 'Neutro' | 'Feliz' | 'Motivado';
  icon: string;
  color: string;
}

export interface MoodEntry {
  id: string;
  userId: string;
  moodType: 'Triste' | 'Ansioso' | 'Neutro' | 'Feliz' | 'Motivado';
  level: number;
  shortDescription?: string;
  registrationDate: string; // ISO string
  createdAt: any; // Firebase timestamp
  updatedAt?: string; // ISO string
}

export interface CreateMoodEntryRequest {
  moodType: 'Triste' | 'Ansioso' | 'Neutro' | 'Feliz' | 'Motivado';
  level: number;
  shortDescription?: string;
}

export interface UpdateMoodEntryRequest {
  moodType?: 'Triste' | 'Ansioso' | 'Neutro' | 'Feliz' | 'Motivado';
  level?: number;
  shortDescription?: string;
}

export interface MoodStats {
  totalEntries: number;
  averageMood: number;
  moodDistribution: Record<string, number>;
  lastEntry: MoodEntry | null;
  trend: 'improving' | 'declining' | 'stable';
}

export interface MoodQueryOptions {
  startDate?: string;
  endDate?: string;
  limit?: number;
}

export interface MoodApiResponse<T = any> {
  moodEntries?: MoodEntry[];
  moodEntry?: MoodEntry;
  message?: string;
  total?: number;
  error?: string;
  details?: string[];
  data?: T;
}

export interface MoodStatsResponse extends MoodStats {
  // Extend if needed
}