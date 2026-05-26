import { useState, useEffect } from 'react';
import { HistoryBatch } from '../types';

const STORAGE_KEY = 'mock_tracking_history';

export function useTrackingHistory() {
  const [history, setHistory] = useState<HistoryBatch[]>(() => {
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addBatch = (batch: HistoryBatch) => {
    setHistory((prev) => [batch, ...prev].slice(0, 50)); // Keep last 50 batches
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return { history, addBatch, clearHistory };
}
