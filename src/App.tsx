import { useState, useEffect } from 'react';
import Header from './components/Header';
import DisclaimerBanner from './components/DisclaimerBanner';
import GeneratorForm from './components/GeneratorForm';
import ResultsPanel from './components/ResultsPanel';
import HistoryPanel from './components/HistoryPanel';
import { useTrackingHistory } from './hooks/useTrackingHistory';
import { CarrierId, TrackingNumber, HistoryBatch } from './types';
import { CARRIERS, generateMockTrackingNumber } from './lib/tracking';

export default function App() {
  const { history, addBatch, clearHistory } = useTrackingHistory();
  const [currentResults, setCurrentResults] = useState<TrackingNumber[]>([]);

  // Load latest batch on initial load if available
  useEffect(() => {
    if (history.length > 0 && currentResults.length === 0) {
      setCurrentResults(history[0].numbers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerate = (carrierId: CarrierId, quantity: number) => {
    const carrier = CARRIERS.find((c) => c.id === carrierId)!;
    const newNumbers: TrackingNumber[] = Array.from({ length: quantity }).map(() => ({
      id: crypto.randomUUID(),
      carrierId,
      carrierName: carrier.name,
      trackingNumber: generateMockTrackingNumber(carrierId),
      timestamp: Date.now(),
    }));

    const batch: HistoryBatch = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      carrierName: carrier.name,
      quantity,
      numbers: newNumbers,
    };

    setCurrentResults(newNumbers);
    addBatch(batch);
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col font-sans text-slate-800 overflow-hidden">
      <DisclaimerBanner />
      <Header />

      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto">
          <div className="p-6 flex flex-col gap-6 min-h-full">
            <GeneratorForm onGenerate={handleGenerate} />
            <HistoryPanel
              history={history}
              onClear={clearHistory}
              onSelectBatch={(batch) => setCurrentResults(batch.numbers)}
            />
          </div>
        </aside>

        {/* Right Content */}
        <div className="flex-1 p-8 flex flex-col gap-6 overflow-hidden bg-slate-50">
          {currentResults.length > 0 ? (
            <ResultsPanel results={currentResults} onClear={() => setCurrentResults([])} />
          ) : (
            <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm border-dashed flex items-center justify-center p-12 text-center h-full">
              <div>
                <div className="bg-slate-50 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4 border border-slate-100">
                  <svg
                    className="h-8 w-8 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">No results yet</h2>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                  Select a carrier and quantity from the sidebar to generate instant mock numbers for your workflows.
                </p>
              </div>
            </div>
          )}

          <footer className="mt-auto flex justify-between items-center text-xs text-slate-400 shrink-0">
            <p>© {new Date().getFullYear()} Mock Tracker Gen Utility. All rights reserved.</p>
            <p>No real data is stored or transmitted.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
