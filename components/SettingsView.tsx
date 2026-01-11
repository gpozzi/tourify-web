import React, { useState } from 'react';
import { Save, Bell, Shield, CreditCard, Key } from 'lucide-react';

const SettingsView: React.FC = () => {
  const [budgetCap, setBudgetCap] = useState('100');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Cost Controls */}
      <section className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
           <div className="p-2 bg-amber-500/20 text-amber-500 rounded-lg">
             <CreditCard className="w-5 h-5" />
           </div>
           <div>
             <h3 className="text-lg font-semibold text-white">Cost Control & Budget</h3>
             <p className="text-sm text-slate-400">Manage your spending limits and billing alerts.</p>
           </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Monthly Budget Cap ($)</label>
              <input 
                type="number" 
                value={budgetCap}
                onChange={(e) => setBudgetCap(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
              <p className="mt-1 text-xs text-slate-500">We'll send an alert if you reach 80% of this amount.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Billing Cycle</label>
              <select className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors">
                 <option>Monthly (1st of month)</option>
                 <option>Weekly</option>
                 <option>Threshold based</option>
              </select>
            </div>
          </div>
        </form>
      </section>

      {/* API Keys Management */}
      <section className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
           <div className="p-2 bg-blue-500/20 text-blue-500 rounded-lg">
             <Key className="w-5 h-5" />
           </div>
           <div>
             <h3 className="text-lg font-semibold text-white">API Configuration</h3>
             <p className="text-sm text-slate-400">Manage keys for your connected services.</p>
           </div>
        </div>

        <div className="space-y-4">
          {[
            { label: 'OpenAI API Key', val: 'sk-proj-....................x8s9', status: 'Active' },
            { label: 'ElevenLabs API Key', val: '2983....................ks92', status: 'Active' },
            { label: 'Google Places API Key', val: 'AIza....................9dk2', status: 'Expiring Soon' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-950/50 border border-slate-800 rounded-lg gap-4">
               <div className="flex-1">
                 <label className="block text-xs font-medium text-slate-500 mb-1">{item.label}</label>
                 <div className="font-mono text-slate-300 text-sm">{item.val}</div>
               </div>
               <div className="flex items-center gap-4">
                 <span className={`text-xs px-2 py-1 rounded-full border ${item.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                   {item.status}
                 </span>
                 <button className="text-sm text-blue-400 hover:text-blue-300">Rotate</button>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
           <div className="p-2 bg-purple-500/20 text-purple-500 rounded-lg">
             <Bell className="w-5 h-5" />
           </div>
           <div>
             <h3 className="text-lg font-semibold text-white">Notifications</h3>
             <p className="text-sm text-slate-400">Choose how you want to be alerted.</p>
           </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                checked={emailAlerts}
                onChange={() => setEmailAlerts(!emailAlerts)}
                className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <p className="text-sm font-medium text-slate-200">Email Alerts</p>
                <p className="text-xs text-slate-500">Receive daily summaries and critical alerts.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                defaultChecked 
                className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <p className="text-sm font-medium text-slate-200">Anomaly Detection</p>
                <p className="text-xs text-slate-500">Notify immediately if usage spikes > 50% in 1 hour.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-end pt-4">
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all active:scale-95"
        >
          <Save className="w-4 h-4" />
          {saved ? 'Saved Successfully' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default SettingsView;