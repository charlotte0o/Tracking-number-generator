export type CarrierId = 'ZTO' | 'YTO' | 'SF' | 'STO';

export interface Carrier {
  id: CarrierId;
  name: string;
}

export interface TrackingNumber {
  id: string;
  carrierId: CarrierId;
  carrierName: string;
  trackingNumber: string;
  timestamp: number;
}

export interface HistoryBatch {
  id: string;
  timestamp: number;
  carrierName: string;
  quantity: number;
  numbers: TrackingNumber[];
}
