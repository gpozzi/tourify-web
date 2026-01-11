import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ServiceData } from '../types';
import { TrendingUp, AlertOctagon, Wallet } from 'lucide-react';

interface AnalyticsViewProps {
  services: ServiceData[];
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ services }) => {
  // Data for Pie Chart (Cost Distribution)
  const costDistribution = services.map(s => ({
    name: s.name,
    value: s.totalCostMonth,
    color: s.color
  }));

  // Data for Bar Chart (Requests vs Errors)
  const performanceData = services.map(s => {
    const totalErrors = s.dailyHistory.reduce((acc, day) => acc + day.errors, 0);
    return {
      name: s.name.split(' ')[0], // Short name
      requests: s.totalRequestsMonth,
      errors: totalErrors,
      errorRate: ((totalErrors / s.totalRequestsMonth) * 100).toFixed(2)
    };
  });

  // Calculate Projections
  const totalCurrentCost = services.reduce((acc, s) => acc + s.totalCostMonth, 0);
  const projectedCost = (totalCurrentCost * 1.2).toFixed(2); // Simple mock projection (+20%)
  const avgCostPerRequest = (totalCurrentCost / services.reduce((acc, s) => acc + s.totalRequestsMonth, 0)).toFixed(5);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-lg">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Projected Monthly Bill</p>
            <h3 className="text-2xl font-bold text-white">${projectedCost}</h3>
            <p className="text-xs text-slate-500">Based on current usage rate</p>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Avg. Cost per Request</p>
            <h3 className="text-2xl font-bold text-white">${avgCostPerRequest}</h3>
            <p className="text-xs text-slate-500">Across all providers</p>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-rose-500/20 text-rose-400 rounded-lg">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Total Error Count</p>
            <h3 className="text-2xl font-bold text-white">
              {performanceData.reduce((acc, curr) => acc + curr.errors, 0)}
            </h3>
            <p className="text-xs text-slate-500">Failed requests this month</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Distribution Chart */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-white mb-6">Cost Distribution by Service</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {costDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0)" />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `$${value.toFixed(2)}`}
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f1f5f9' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reliability Chart */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-white mb-6">Request Volume vs. Errors</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: '#334155', opacity: 0.2 }}
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f1f5f9' }}
                />
                <Legend />
                <Bar dataKey="requests" name="Total Requests" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="errors" name="Errors" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Detailed Table */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
           <h3 className="text-lg font-semibold text-white">Performance Metrics</h3>
        </div>
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-slate-900/50 text-slate-200 uppercase font-medium">
            <tr>
              <th className="px-6 py-4">Service</th>
              <th className="px-6 py-4">Total Requests</th>
              <th className="px-6 py-4">Error Count</th>
              <th className="px-6 py-4">Error Rate</th>
              <th className="px-6 py-4 text-right">Total Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {performanceData.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-700/20 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-200">{item.name}</td>
                <td className="px-6 py-4">{item.requests.toLocaleString()}</td>
                <td className="px-6 py-4 text-rose-400">{item.errors}</td>
                <td className="px-6 py-4">{item.errorRate}%</td>
                <td className="px-6 py-4 text-right font-bold text-slate-200">
                   ${costDistribution.find(c => c.name.includes(item.name))?.value.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticsView;