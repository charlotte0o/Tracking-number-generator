import { Carrier, CarrierId, TrackingNumber } from '../types';

export const CARRIERS: Carrier[] = [
  { id: 'ZTO', name: 'ZTO Express' },
  { id: 'YTO', name: 'YTO Express' },
  { id: 'SF', name: 'SF Express' },
  { id: 'STO', name: 'STO Express' },
];

function generateRandomDigits(length: number): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
}

export function generateMockTrackingNumber(carrierId: CarrierId): string {
  switch (carrierId) {
    case 'SF':
      return `SF${generateRandomDigits(13)}`;
    case 'ZTO':
      return `75${generateRandomDigits(12)}`;
    case 'YTO':
      return `YT${generateRandomDigits(13)}`;
    case 'STO':
      return `77${generateRandomDigits(13)}`;
    default:
      return `MOCK${generateRandomDigits(10)}`;
  }
}

export function downloadFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportToCSV(batch: TrackingNumber[]) {
  const headers = ['Tracking Number', 'Carrier', 'Generated At', 'Disclaimer'];
  const rows = batch.map((item) => [
    item.trackingNumber,
    item.carrierName,
    new Date(item.timestamp).toISOString(),
    'MOCK DATA ONLY',
  ]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  const filename = `mock_tracking_${Date.now()}.csv`;
  downloadFile(filename, csvContent, 'text/csv;charset=utf-8;');
}

export function exportToTXT(batch: TrackingNumber[]) {
  const header = '--- MOCK TRACKING NUMBERS FOR TESTING ONLY ---\n\n';
  const rows = batch.map((item) => `${item.trackingNumber} (${item.carrierName})`);
  const footer = '\n\nDisclaimer: These are test-only mock numbers and not real shipments.';

  const txtContent = header + rows.join('\n') + footer;
  const filename = `mock_tracking_${Date.now()}.txt`;
  downloadFile(filename, txtContent, 'text/plain;charset=utf-8;');
}
