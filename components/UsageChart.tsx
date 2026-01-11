import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ServiceData } from '../types';

interface UsageChartProps {
  services: ServiceData[];
}

const UsageChart: React.FC<UsageChartProps> = ({ services }) => {
  // Guard clause for empty data
  if (!services || services.length === 0) {
    return (
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 shadow-sm h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-2 border-slate-600 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-slate-400 text-sm">Loading usage trends...</p>
        </div>
      </div>
    );
  }

  // Transform data for the chart: merge daily histories by date
  // Assuming all services have data for the same date range for simplicity
  const data = services[0].dailyHistory.map((day, index) => {
    const dataPoint: any = { date: day.date };
    services.forEach(service => {
      dataPoint[service.id] = service.dailyHistory[index]?.cost || 0;
    });
    return dataPoint;
  });

  // Reverse to show oldest to newest if the generator produced newest first
  const chartData = [...data].reverse();

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-white mb-6">Cost Trends (Last 30 Days)</h3>
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              {services.map(service => (
                <linearGradient key={service.id} id={`color${service.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={service.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={service.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => new Date(value).getDate().toString()} // Show day number
            />
            <YAxis 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f1f5f9' }}
              itemStyle={{ fontSize: '12px' }}
            />
            <Legend />
            {services.map(service => (
              <Area
                key={service.id}
                type="monotone"
                dataKey={service.id}
                name={service.name}
                stroke={service.color}
                fillOpacity={1}
                fill={`url(#color${service.id})`}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsageChart;