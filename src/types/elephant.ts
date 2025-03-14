
export interface ElephantIncident {
  id: string;
  idNo: string;
  detectionDate: string;
  circle: string;
  division: string;
  range: string;
  gender: 'Male' | 'Female' | 'Calf' | 'Makhna';
  category: string;
  subCategory: string;
  age: number;
  weight?: number;
  location?: {
    lat: number;
    lng: number;
  };
  // Additional fields that might be useful
  details?: string;
  imageUrl?: string;
  reportedBy?: string;
}

export interface PredictionZone {
  id: string;
  location: {
    lat: number;
    lng: number;
  };
  radius: number; // in kilometers
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  predictedTime: string;
  confidence: number; // 0-1
  elephantCount?: number;
  details?: string;
  createdAt: string;
}

export interface TrainSchedule {
  id: string;
  trainNumber: string;
  name?: string;
  route: string;
  departureTime: string;
  arrivalTime: string;
  currentLocation?: {
    lat: number;
    lng: number;
  };
  speed?: number; // km/h
  status: 'on-time' | 'delayed' | 'cancelled';
}
