import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import UsageChart from './components/UsageChart';
import ServiceCard from './components/ServiceCard';
import AiInsights from './components/AiInsights';
import AnalyticsView from './components/AnalyticsView';
import SettingsView from './components/SettingsView';
import { DollarSign, Activity, Users as UsersIcon, Server } from 'lucide-react';
import { getMockServices, getMockUsers } from './services/mockData';
import { ServiceData, UserMetric, ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [services, setServices] = useState<ServiceData[]>([]);
  const [users, setUsers] = useState<UserMetric[]>([]);

  useEffect(() => {
    // Initialize mock data
    setServices(getMockServices());
    setUsers(getMockUsers());
  }, []);

  const totalCost = services.reduce((acc, s) => acc + s.totalCostMonth, 0);
  const totalRequests = services.reduce((acc, s) => acc + s.totalRequestsMonth, 0);
  const activeServicesCount = services.filter(s => s.status === 'healthy').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex">
      {/* Sidebar Navigation */}
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />

      {/* Main Content Area */}
      <main className="flex-1 ml-20 md:ml-64 p-4 md:p-8 overflow-y-auto h-screen">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {currentView === 'dashboard' && 'Dashboard Overview'}
              {currentView === 'analytics' && 'Detailed Analytics'}
              {currentView === 'users' && 'User Management'}
              {currentView === 'settings' && 'Platform Settings'}
            </h1>
            <p className="text-slate-400">Welcome back, here's what's happening with your APIs.</p>
          </div>
          <div className="hidden md:block">
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/20">
              System Online
            </span>
          </div>
        </header>

        {currentView === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard 
                title="Total Monthly Cost" 
                value={`$${totalCost.toFixed(2)}`} 
                trend="12.5%" 
                trendUp={false} // Cost going up is usually "bad" or just metric, using red for up here to indicate spending increase
                icon={DollarSign} 
                colorClass="text-blue-400"
              />
              <StatCard 
                title="Total API Requests" 
                value={totalRequests.toLocaleString()} 
                trend="8.2%" 
                trendUp={true} 
                icon={Activity} 
                colorClass="text-purple-400"
              />
              <StatCard 
                title="Active Users" 
                value={users.length.toString()} 
                trend="2" 
                trendUp={true} 
                icon={UsersIcon} 
                colorClass="text-emerald-400"
              />
              <StatCard 
                title="Service Health" 
                value={`${activeServicesCount}/${services.length}`} 
                icon={Server} 
                colorClass="text-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Chart */}
              <div className="lg:col-span-2">
                <UsageChart services={services} />
              </div>
              
              {/* AI Insights Panel */}
              <div className="lg:col-span-1">
                <AiInsights services={services} />
                
                {/* User Snapshot */}
                <div className="mt-6 bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-4">Top Spenders</h3>
                  <div className="space-y-3">
                    {users.slice(0, 4).map(user => (
                      <div key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-700/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                            {user.username.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-200">{user.username}</p>
                            <p className="text-xs text-slate-500">{user.platform}</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-slate-200">${user.totalSpend.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Service Status Cards */}
            <h3 className="text-xl font-bold text-white mt-8 mb-4">Service Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        )}

        {currentView === 'analytics' && (
          <AnalyticsView services={services} />
        )}

        {currentView === 'settings' && (
          <SettingsView />
        )}

        {currentView === 'users' && (
           <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden animate-in fade-in duration-500">
             <div className="p-6 border-b border-slate-700/50">
               <h3 className="text-lg font-semibold text-white">All Users</h3>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm text-slate-400">
                 <thead className="bg-slate-900/50 text-slate-200 uppercase font-medium">
                   <tr>
                     <th className="px-6 py-4">User</th>
                     <th className="px-6 py-4">Platform</th>
                     <th className="px-6 py-4">Last Active</th>
                     <th className="px-6 py-4 text-right">Total Spend</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-700/50">
                   {users.map((user) => (
                     <tr key={user.id} className="hover:bg-slate-700/20 transition-colors">
                       <td className="px-6 py-4 font-medium text-slate-200">{user.username}</td>
                       <td className="px-6 py-4">{user.platform}</td>
                       <td className="px-6 py-4">{user.lastActive}</td>
                       <td className="px-6 py-4 text-right font-bold text-emerald-400">${user.totalSpend.toFixed(2)}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
        )}

      </main>
    </div>
  );
}

export default App;