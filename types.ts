export interface DailyUsage {
  date: string;
  requests: number;
  cost: number;
  errors: number;
}

export interface ServiceData {
  id: string;
  name: string;
  provider: 'OpenAI' | 'ElevenLabs' | 'Google' | 'Other';
  status: 'healthy' | 'degraded' | 'down';
  totalCostMonth: number;
  totalRequestsMonth: number;
  dailyHistory: DailyUsage[];
  color: string;
}

export interface UserMetric {
  id: string;
  username: string;
  lastActive: string;
  totalSpend: number;
  platform: 'Android' | 'iOS' | 'Web';
}

export interface DashboardState {
  services: ServiceData[];
  users: UserMetric[];
}

export type ViewState = 'dashboard' | 'analytics' | 'users' | 'settings';
