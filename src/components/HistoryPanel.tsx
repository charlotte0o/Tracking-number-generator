import { HistoryBatch } from '../types';

interface HistoryPanelProps {
  history: HistoryBatch[];
  onClear: () => void;
  onSelectBatch: (batch: HistoryBatch) => void;
}

export default function HistoryPanel({ history, onClear, onSelectBatch }: HistoryPanelProps) {
  const formatTime = (ts: number) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(new Date(ts));
  };

  if (!history.length) {
    return (
      <div className="mt-auto p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center shrink-0">
        <p className="text-xs text-slate-500">No local history available.</p>
      </div>
    );
  }

  return (
    <div className="mt-auto p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex flex-col max-h-[300px] shrink-0">
      <h4 className="text-xs font-bold text-slate-500 uppercase mb-2 shrink-0">Local History</h4>
      <ul className="text-xs space-y-2 text-slate-400 overflow-y-auto flex-1 mb-2">
        {history.map((batch) => (
          <li key={batch.id}>
            <button
              onClick={() => onSelectBatch(batch)}
              className="w-full flex justify-between items-center text-left hover:bg-slate-200/50 p-1 -ml-1 rounded transition-colors group"
            >
              <span className="font-medium text-slate-600 group-hover:text-indigo-600 truncate">
                {batch.carrierName} ({batch.quantity})
              </span>
              <span className="shrink-0 ml-2">{formatTime(batch.timestamp)}</span>
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={onClear}
        className="mt-2 text-xs font-semibold text-indigo-600 hover:underline self-start bg-transparent border-0 p-0 cursor-pointer"
      >
        Clear History
      </button>
    </div>
  );
}
