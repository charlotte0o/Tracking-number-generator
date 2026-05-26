export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">S</div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Mock Tracker Gen</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Demo Generator v1.2</p>
        </div>
      </div>
    </header>
  );
}
