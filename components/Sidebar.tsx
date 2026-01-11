import React from 'react';
import { LayoutDashboard, Users, Settings, Activity } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: Activity },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <aside className="fixed left-0 top-0 h-full w-20 md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-all z-20">
      <div className="h-16 flex items-center justify-center md:justify-start md:px-6 border-b border-slate-800">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
          A
        </div>
        <span className="ml-3 font-semibold text-lg hidden md:block text-slate-100">ApiControl</span>
      </div>

      <nav className="flex-1 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as ViewState)}
              className={`w-full flex items-center px-4 md:px-6 py-3 transition-colors relative
                ${isActive ? 'text-blue-400 bg-slate-800/50' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/30'}
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full" />
              )}
              <item.icon className="w-5 h-5 min-w-[20px]" />
              <span className="ml-3 hidden md:block font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">
            JD
          </div>
          <div className="hidden md:block overflow-hidden">
            <p className="text-sm font-medium text-slate-200 truncate">Jane Doe</p>
            <p className="text-xs text-slate-500 truncate">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
