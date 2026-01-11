import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, AlertTriangle } from 'lucide-react';
import { ServiceData } from '../types';
import { analyzeDashboardData } from '../services/geminiService';

interface AiInsightsProps {
  services: ServiceData[];
}

const AiInsights: React.FC<AiInsightsProps> = ({ services }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await analyzeDashboardData(services);
    setInsight(result);
    setLoading(false);
  };

  useEffect(() => {
    // Auto-analyze on mount
    handleAnalyze();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Simple formatter to handle basic markdown-like structure without heavy libraries
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, index) => {
      // Bold handling (simple)
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={index} className="mb-2 last:mb-0">
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900/40 to-slate-800/50 border border-indigo-500/30 rounded-xl p-6 shadow-sm relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-12 bg-indigo-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>

      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-semibold text-white">Gemini AI Analysis</h3>
        </div>
        <button 
          onClick={handleAnalyze}
          disabled={loading}
          className="p-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="relative z-10 min-h-[120px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-32 space-y-3">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-indigo-300 animate-pulse">Analyzing spending patterns...</p>
          </div>
        ) : (
          <div className="text-sm text-slate-300 leading-relaxed font-light">
             {insight ? renderFormattedText(insight) : "Waiting for analysis..."}
          </div>
        )}
      </div>

      {!process.env.API_KEY && !loading && (
        <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-700/50 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
          <p className="text-xs text-yellow-200">
            API Key not detected. The analysis above is a placeholder or failed. Please add your Gemini API Key to <code>metadata.json</code> or environment to enable real AI insights.
          </p>
        </div>
      )}
    </div>
  );
};

export default AiInsights;