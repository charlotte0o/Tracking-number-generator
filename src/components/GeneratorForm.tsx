import React, { useState } from 'react';
import { CARRIERS } from '../lib/tracking';
import { CarrierId } from '../types';

interface GeneratorFormProps {
  onGenerate: (carrierId: CarrierId, quantity: number) => void;
}

export default function GeneratorForm({ onGenerate }: GeneratorFormProps) {
  const [carrierId, setCarrierId] = useState<CarrierId>('ZTO');
  const [quantity, setQuantity] = useState<number>(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = Math.max(1, Math.min(100, quantity || 1));
    setQuantity(qty);
    onGenerate(carrierId, qty);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <section>
        <label htmlFor="carrier" className="block text-xs font-bold text-slate-400 uppercase mb-2">
          Carrier Selection
        </label>
        <div className="relative">
          <select
            id="carrier"
            value={carrierId}
            onChange={(e) => setCarrierId(e.target.value as CarrierId)}
            className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer text-slate-800 font-medium"
          >
            <option value="SF">SF Express (Recommended)</option>
            <option value="ZTO">ZTO Express</option>
            <option value="YTO">YTO Express</option>
            <option value="STO">STO Express</option>
          </select>
          <div className="absolute right-3 top-3.5 pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </section>

      <section>
        <label htmlFor="quantity" className="block text-xs font-bold text-slate-400 uppercase mb-2">
          Quantity (1 - 100)
        </label>
        <input
          type="number"
          id="quantity"
          min="1"
          max="100"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-medium"
        />
      </section>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        <span>Generate Numbers</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      </button>
    </form>
  );
}
