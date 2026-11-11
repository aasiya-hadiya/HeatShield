export type Role = 'worker' | 'rider' | 'supervisor';

export type WorkloadLevel = 'Light' | 'Moderate' | 'Heavy' | 'Very heavy';

export type SunExposure = 'shade' | 'partial' | 'full';

export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Critical';

export interface SensorReading {
  t: number;      // Air temperature in °C
  rh: number;     // Relative humidity in %
  globe?: number | null; // Solar globe temperature in °C (if hardware probe present)
  ts: number;     // Timestamp in epoch ms
}

export type SupportedLanguage = 'en' | 'hi' | 'ml' | 'kn' | 'ar' | 'ur';

export interface MultilingualAlertText {
  en: string;
  hi: string;
  ml: string;
  kn: string;
  ar: string;
  ur: string;
}

export interface RiskEvaluation {
  airTemp: number;
  humidity: number;
  globeTemp: number;
  wetBulb: number;
  wbgt: number;
  workload: WorkloadLevel;
  baseThreshold: number;
  acclimatized: boolean;
  heavyPPE: boolean;
  exposureHours: number;
  isNewWorker: boolean;
  adjustedThreshold: number;
  margin: number;
  riskLevel: RiskLevel;
  safeAction: string;
  workRestRatio?: string;
  isMiddayBanActive: boolean;
  symptomsReported: string[];
  overrideReason?: string;
  colorClass: {
    bg: string;
    border: string;
    badge: string;
    text: string;
  };
}

export interface GeminiHeatAdvice {
  explanation: string;
  recommended_actions: string[];
  level_suggestion: string;
  alert_text: MultilingualAlertText;
  source?: string;
}

export interface CoolingStation {
  id: string;
  name: string;
  district: string;
  lat: number;
  lng: number;
  amenities: string[];
  availability: 'unknown (demo)';
  distanceKm?: number;
  travelMinutesRiding?: number;
  travelMinutesWalking?: number;
  reachableBeforeHigh?: boolean;
}

export interface CrewInfo {
  id: string;
  name: string;
  size: number;
  workload: WorkloadLevel;
  taskDescription: string;
  zone: string;
  exposureHours: number;
  wearableHeartRateAvg?: number; // optional demo aggregate
  acclimatized: boolean;
  heavyPPE: boolean;
}

export interface SmartShiftTimelineSlot {
  timeSlot: string;
  hours?: string;
  label?: string;
  activity?: string;
  zone?: string;
  workRestRatio?: string;
  crewActions?: Record<string, string>;
  risk?: string;
  coolingProtocol?: string;
  isMiddayBan?: boolean;
}

export interface SmartShiftPlan {
  rationale: string;
  timeline: SmartShiftTimelineSlot[];
  adherenceNotes: string[];
  source?: string;
}

export interface AlertFeedbackState {
  usefulCount: number;
  falseAlarmCount: number;
  averageLeadTimeMinutes: number;
  adherenceRatePercent: number;
  eventsLog: Array<{
    id: string;
    timestamp: string;
    riskLevel: RiskLevel;
    feedbackType: 'useful' | 'false_alarm';
    wbgt: number;
    actionTaken: string;
  }>;
}

export type HeatZoneCluster = 'Coastal' | 'Urban Core' | 'Industrial' | 'Inland Desert';

export interface DubaiDistrictHeatZone {
  id: string;
  name: string;
  nameAr: string;
  cluster: HeatZoneCluster;
  mapCoords: { x: number; y: number }; // SVG map percentage coordinates (0-100)
  currentWbgt: number;
  morningWbgt: number;
  middayWbgt: number;
  eveningWbgt: number;
  airTemp: number;
  humidity: number;
  solarRadiationWm2: number;
  shadePercentage: number;
  safetyScore: number; // 0-100 (higher = safer)
  riskLevel: RiskLevel;
  activeWorkersEst: number;
  safetyRecommendationEn: string;
  safetyRecommendationAr: string;
  suitableWorkTypeEn: string;
  suitableWorkTypeAr: string;
  nearestCoolingHub: string;
  coolingHubAr: string;
}
