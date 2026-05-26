import { AlertTriangle } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <div className="bg-amber-50 border-b border-amber-200 px-6 py-2 flex items-center justify-center gap-3 shrink-0">
      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
      <p className="text-sm font-medium text-amber-800">
        <strong>Important:</strong> This tool generates mock tracking numbers for testing and demonstration only. These are not real shipping labels.
      </p>
    </div>
  );
}
