import { ServiceData, UserMetric, DailyUsage } from '../types';

const generateDailyHistory = (days: number, baseCost: number, variance: number): DailyUsage[] => {
  const history: DailyUsage[] = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Randomize daily stats
    const randomFactor = 0.7 + Math.random() * 0.6; // 0.7 to 1.3
    const cost = parseFloat((baseCost * randomFactor).toFixed(2));
    const requests = Math.floor(cost * 1000 * (0.8 + Math.random() * 0.4));
    const errors = Math.floor(requests * (Math.random() * 0.02)); // 0-2% error rate

    history.push({
      date: dateStr,
      requests,
      cost,
      errors
    });
  }
  return history;
};

export const getMockServices = (): ServiceData[] => {
  const openAIHistory = generateDailyHistory(30, 5.50, 2);
  const elevenLabsHistory = generateDailyHistory(30, 8.20, 3);
  const placesHistory = generateDailyHistory(30, 2.10, 1);

  return [
    {
      id: 'openai',
      name: 'OpenAI (GPT-4o)',
      provider: 'OpenAI',
      status: 'healthy',
      totalCostMonth: openAIHistory.reduce((acc, curr) => acc + curr.cost, 0),
      totalRequestsMonth: openAIHistory.reduce((acc, curr) => acc + curr.requests, 0),
      dailyHistory: openAIHistory,
      color: '#10a37f'
    },
    {
      id: 'elevenlabs',
      name: 'ElevenLabs TTS',
      provider: 'ElevenLabs',
      status: 'healthy',
      totalCostMonth: elevenLabsHistory.reduce((acc, curr) => acc + curr.cost, 0),
      totalRequestsMonth: elevenLabsHistory.reduce((acc, curr) => acc + curr.requests, 0),
      dailyHistory: elevenLabsHistory,
      color: '#3b82f6'
    },
    {
      id: 'places',
      name: 'Google Places API',
      provider: 'Google',
      status: 'degraded', // Simulating a minor issue
      totalCostMonth: placesHistory.reduce((acc, curr) => acc + curr.cost, 0),
      totalRequestsMonth: placesHistory.reduce((acc, curr) => acc + curr.requests, 0),
      dailyHistory: placesHistory,
      color: '#f59e0b'
    }
  ];
};

export const getMockUsers = (): UserMetric[] => {
  return Array.from({ length: 15 }).map((_, i) => ({
    id: `user-${i}`,
    username: `User_${Math.floor(Math.random() * 10000)}`,
    lastActive: new Date(Date.now() - Math.floor(Math.random() * 100000000)).toLocaleString(),
    totalSpend: parseFloat((Math.random() * 50).toFixed(2)),
    platform: (Math.random() > 0.5 ? 'Android' : 'Web') as 'Android' | 'iOS' | 'Web'
  })).sort((a, b) => b.totalSpend - a.totalSpend);
};