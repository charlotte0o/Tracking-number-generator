import { useState } from 'react';
import { Check } from 'lucide-react';
import { TrackingNumber } from '../types';
import { exportToCSV, exportToTXT } from '../lib/tracking';

interface ResultsPanelProps {
  results: TrackingNumber[];
  onClear: () => void;
}

export default function ResultsPanel({ results, onClear }: ResultsPanelProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  if (!results.length) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAll = () => {
    const allText = results.map((r) => r.trackingNumber).join('\n');
    navigator.clipboard.writeText(allText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <>
      <div className="flex items-center justify-between shrink-0 flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Generated Results</h2>
          <p className="text-sm text-slate-500">Showing {results.length} mock numbers for {results[0].carrierName}.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClear}
            className="bg-white border border-slate-200 text-red-500 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={() => exportToCSV(results)}
            className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            Export CSV
          </button>
          <button
            onClick={() => exportToTXT(results)}
            className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            Export TXT
          </button>
          <button
            onClick={handleCopyAll}
            className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            {copiedAll ? 'Copied!' : 'Copy All'}
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200 py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
          <div className="col-span-1">#</div>
          <div className="col-span-3">Carrier</div>
          <div className="col-span-5">Mock Tracking Number</div>
          <div className="col-span-2">Timestamp</div>
          <div className="col-span-1 text-right"></div>
        </div>
        
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 bg-white">
          {results.map((item, idx) => (
            <div key={item.id} className="grid grid-cols-12 py-4 px-6 items-center hover:bg-slate-50 group transition-colors">
              <div className="col-span-1 text-sm text-slate-400">
                {(idx + 1).toString().padStart(2, '0')}
              </div>
              <div className="col-span-3 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full shrink-0 ${item.carrierId === 'SF' ? 'bg-blue-500' : item.carrierId === 'ZTO' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                <span className="text-sm font-semibold text-slate-700 truncate">{item.carrierName}</span>
              </div>
              <div className="col-span-5 font-mono text-sm font-bold text-indigo-600 select-all truncate">
                {item.trackingNumber}
              </div>
              <div className="col-span-2 text-xs text-slate-400 italic">
                {new Date(item.timestamp).toLocaleTimeString()}
              </div>
              <div className="col-span-1 flex justify-end">
                <button
                  onClick={() => handleCopy(item.trackingNumber, item.id)}
                  className="p-1.5 rounded-md hover:bg-slate-200 text-slate-400 group-hover:text-indigo-600 transition-colors focus:outline-none"
                  title="Copy"
                >
                  {copiedId === item.id ? (
                     <Check className="w-4 h-4 text-green-600" />
                  ) : (
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                  )}
                </button>
              </div>
            </div>
          ))}
          <div className="grid grid-cols-12 py-12 px-6 items-center opacity-20">
             <div className="col-span-12 text-center text-xs font-mono">--- End of current batch ---</div>
          </div>
        </div>
      </div>
    </>
  );
}
