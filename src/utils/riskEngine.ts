import { RiskEvaluation, RiskLevel, SunExposure, WorkloadLevel } from '../types';

/**
 * Stull (2011) empirical formula for wet-bulb temperature estimate.
 * @param T Ambient air temperature in °C
 * @param RH Relative humidity in %
 */
export function calculateWetBulb(T: number, RH: number): number {
  const clampedRH = Math.max(1, Math.min(100, RH));
  const tw =
    T * Math.atan(0.151977 * Math.sqrt(clampedRH + 8.313659)) +
    Math.atan(T + clampedRH) -
    Math.atan(clampedRH - 1.676331) +
    0.00391838 * Math.pow(clampedRH, 1.5) * Math.atan(0.023101 * clampedRH) -
    4.686035;
  return Number(tw.toFixed(2));
}

/**
 * Sun offset lookup for assumed solar globe temperature when no globe probe is connected.
 */
export const SUN_OFFSETS: Record<SunExposure, number> = {
  shade: 0,
  partial: 3,
  full: 7,
};

/**
 * Illustrative baseline workload thresholds (ISO 7243 / ACGIH / Dubai guidance placeholders).
 */
export const WORKLOAD_THRESHOLDS: Record<WorkloadLevel, number> = {
  Light: 31,
  Moderate: 28,
  Heavy: 26,
  'Very heavy': 24,
};

export interface RiskEngineParams {
  airTemp: number;             // °C
  humidity: number;            // %
  globeTemp?: number | null;   // °C from physical sensor probe, or null if using sun selector
  sunExposure: SunExposure;
  workload: WorkloadLevel;
  acclimatized: boolean;
  heavyPPE: boolean;
  exposureHours: number;
  isNewWorker?: boolean;
  symptoms?: string[];         // e.g. ["dizziness", "headache"]
  forceMiddayBan?: boolean;    // Demo toggle to simulate UAE 12:30-15:00 Midday Ban
  customTimestamp?: Date;
}

/**
 * Checks whether UAE midday ban is active (June 15 - Sept 15, 12:30 - 15:00).
 */
export function checkMiddayBanActive(forceToggle?: boolean, date = new Date()): boolean {
  if (forceToggle) return true;

  const month = date.getMonth(); // 0-indexed: May is 4, June is 5, Sept is 8
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const timeInMinutes = hours * 60 + minutes;

  // Between June 15 and September 15
  const isSummerWindow =
    (month === 5 && day >= 15) ||
    (month === 6) ||
    (month === 7) ||
    (month === 8 && day <= 15);

  // Between 12:30 (750 mins) and 15:00 (900 mins)
  const isBanHours = timeInMinutes >= 750 && timeInMinutes <= 900;

  return isSummerWindow && isBanHours;
}

/**
 * Evaluates thermal risk deterministically using Stull 2011 + WBGT + Workload Adjustments + Overrides.
 */
export function evaluateHeatRisk(params: RiskEngineParams): RiskEvaluation {
  const {
    airTemp,
    humidity,
    globeTemp: rawGlobe,
    sunExposure,
    workload,
    acclimatized,
    heavyPPE,
    exposureHours,
    isNewWorker = false,
    symptoms = [],
    forceMiddayBan = false,
    customTimestamp = new Date(),
  } = params;

  // Step 1: Wet-bulb estimate (Stull 2011)
  const wetBulb = calculateWetBulb(airTemp, humidity);

  // Step 2: Globe temp & WBGT estimate
  const sunOffset = SUN_OFFSETS[sunExposure];
  const globeTemp = rawGlobe !== null && rawGlobe !== undefined ? rawGlobe : airTemp + sunOffset;
  const wbgtRaw = 0.7 * wetBulb + 0.2 * globeTemp + 0.1 * airTemp;
  const wbgt = Number(wbgtRaw.toFixed(2));

  // Step 3: Margin against workload threshold
  const baseThreshold = WORKLOAD_THRESHOLDS[workload] ?? 28;
  let deductions = 0;
  if (!acclimatized) deductions += 3;
  if (heavyPPE) deductions += 2;
  if (exposureHours > 4) deductions += 1;
  if (isNewWorker) deductions += 2; // Innovation 8: Gradual ramp for new/returning workers

  const adjustedThreshold = baseThreshold - deductions;
  const margin = Number((adjustedThreshold - wbgt).toFixed(2));

  // Step 4: Level from margin
  let calculatedLevel: RiskLevel = 'Low';
  let safeAction = 'Normal work, hydrate regularly';

  if (margin >= 3) {
    calculatedLevel = 'Low';
    safeAction = 'Normal work, hydrate every 20-30 min';
  } else if (margin >= 0) {
    calculatedLevel = 'Moderate';
    safeAction = 'Hydrate, active monitoring, scheduled shade breaks';
  } else if (margin >= -3) {
    calculatedLevel = 'High';
    safeAction = 'Cooling break required, review and reduce workload';
  } else {
    calculatedLevel = 'Critical';
    safeAction = 'Stop work immediately, initiate urgent cooling safety protocol';
  }

  // Overrides:
  let overrideReason: string | undefined;
  const isMiddayBan = checkMiddayBanActive(forceMiddayBan, customTimestamp);

  // Check symptoms override
  const activeSymptoms = symptoms.filter((s) => s.toLowerCase() !== 'none');
  if (activeSymptoms.length > 0) {
    if (calculatedLevel === 'Low' || calculatedLevel === 'Moderate') {
      calculatedLevel = 'High';
      overrideReason = `Safety override: reported symptoms (${activeSymptoms.join(', ')}) force level to High.`;
      safeAction = 'Voluntary symptom reported: pause work immediately and seek shaded recovery.';
    }
  }

  if (isMiddayBan) {
    overrideReason = 'Outdoor work not permitted (UAE midday ban: 12:30 - 15:00, June 15 - Sept 15).';
    safeAction = 'Mandatory cessation of open-sun outdoor work. Move to air-conditioned shelter.';
  }

  // Color & Badge metadata
  const colorMap: Record<RiskLevel, { bg: string; border: string; badge: string; text: string }> = {
    Low: {
      bg: 'bg-emerald-950/40',
      border: 'border-emerald-500/40',
      badge: 'bg-emerald-500 text-emerald-950 font-bold',
      text: 'text-emerald-400',
    },
    Moderate: {
      bg: 'bg-amber-950/40',
      border: 'border-amber-500/40',
      badge: 'bg-amber-500 text-amber-950 font-bold',
      text: 'text-amber-400',
    },
    High: {
      bg: 'bg-orange-950/50',
      border: 'border-orange-500/60',
      badge: 'bg-orange-500 text-orange-950 font-bold',
      text: 'text-orange-400',
    },
    Critical: {
      bg: 'bg-red-950/60',
      border: 'border-red-500/80',
      badge: 'bg-red-500 text-white font-bold animate-pulse',
      text: 'text-red-400',
    },
  };

  return {
    airTemp,
    humidity,
    globeTemp,
    wetBulb,
    wbgt,
    workload,
    baseThreshold,
    acclimatized,
    heavyPPE,
    exposureHours,
    isNewWorker,
    adjustedThreshold,
    margin,
    riskLevel: calculatedLevel,
    safeAction,
    workRestRatio: safeAction,
    isMiddayBanActive: isMiddayBan,
    symptomsReported: activeSymptoms,
    overrideReason,
    colorClass: colorMap[calculatedLevel],
  };
}

/**
 * Haversine formula to compute distance between two GPS coordinates in kilometers.
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
}
