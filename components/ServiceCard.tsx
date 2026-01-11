import React from 'react';
import { ServiceData } from '../types';
import { Activity, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceData;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'degraded': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'down': return <XCircle className="w-4 h-4 text-rose-500" />;
      default: return <Activity className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'healthy': return <span className="text-emerald-500 text-xs font-medium bg-emerald-500/10 px-2 py-1 rounded-full">Operational</span>;
      case 'degraded': return <span className="text-amber-500 text-xs font-medium bg-amber-500/10 px-2 py-1 rounded-full">Degraded</span>;
      case 'down': return <span className="text-rose-500 text-xs font-medium bg-rose-500/10 px-2 py-1 rounded-full">Outage</span>;
      default: return null;
    }
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 hover:border-slate-600 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center text-xl" style={{ color: service.color }}>
            {service.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-semibold text-slate-200">{service.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              {getStatusIcon(service.status)}
              <span className="text-xs text-slate-400 capitalize">{service.provider}</span>
            </div>
          </div>
        </div>
        {getStatusText(service.status)}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
          <p className="text-xs text-slate-500 mb-1">Month Cost</p>
          <p className="text-lg font-bold text-slate-200">${service.totalCostMonth.toFixed(2)}</p>
        </div>
        <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
          <p className="text-xs text-slate-500 mb-1">Requests</p>
          <p className="text-lg font-bold text-slate-200">{service.totalRequestsMonth.toLocaleString()}</p>
        </div>
      </div>
      
      {/* Mini sparkline visualization (simplified) */}
      <div className="mt-4 flex items-end h-8 gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
        {service.dailyHistory.slice(0, 20).reverse().map((day, i) => (
          <div 
            key={i} 
            className="flex-1 bg-current rounded-sm min-h-[2px]"
            style={{ 
              height: `${(day.cost / (Math.max(...service.dailyHistory.map(d => d.cost)) || 1)) * 100}%`,
              color: service.color
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceCard;
