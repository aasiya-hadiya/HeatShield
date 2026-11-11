import React, { useState, useEffect } from 'react';
import {
  RiskEvaluation,
  GeminiHeatAdvice,
  SupportedLanguage,
  CoolingStation,
} from '../types';
import { RiskCard } from './RiskCard';
import { MultilingualAlert } from './MultilingualAlert';
import { DUBAI_COOLING_STATIONS } from '../data/mockData';
import { calculateHaversineDistance } from '../utils/riskEngine';
import {
  Navigation,
  MapPin,
  Clock,
  ExternalLink,
  Flame,
  Bike,
  Compass,
  CheckCircle2,
  Droplets,
  Zap,
  Wind,
} from 'lucide-react';
import { AppLocale, UI_TRANSLATIONS } from '../utils/i18n';

interface RiderViewProps {
  evaluation: RiskEvaluation;
  advice: GeminiHeatAdvice;
  currentLang: SupportedLanguage;
  onChangeLanguage: (lang: SupportedLanguage) => void;
  onOpenWhyAlert: () => void;
  isAiLoading: boolean;
  locale?: AppLocale;
}

// Arabic names for Dubai cooling stations
const ARABIC_STATION_NAMES: Record<string, { name: string; district: string }> = {
  'cs-1': {
    name: 'محطة استراحة وسط مدينة دبي المبردة',
    district: 'وسط مدينة دبي / بوليفارد الشيخ محمد بن راشد',
  },
  'cs-2': {
    name: 'ملاذ الخليج التجاري لسائقي التوصيل',
    district: 'الخليج التجاري / مراسي درايف',
  },
  'cs-3': {
    name: 'واحة البرشاء لاستراحة مندوبي التوصيل',
    district: 'البرشاء 1 / بالقرب من مول الإمارات',
  },
  'cs-4': {
    name: 'محطة سوق الذهب المكيفة في ديرة',
    district: 'ديرة / شارع البلدية القديم',
  },
  'cs-5': {
    name: 'نقطة دبي مارينا المظللة للتوصيل',
    district: 'دبي مارينا / ممشى المارينا',
  },
  'cs-6': {
    name: 'مستودع القوز الصناعي المبرد للراحة',
    district: 'القوز الصناعية 3 / شارع 8',
  },
};

export const RiderView: React.FC<RiderViewProps> = ({
  evaluation,
  advice,
  currentLang,
  onChangeLanguage,
  onOpenWhyAlert,
  isAiLoading,
  locale = 'en',
}) => {
  const t = UI_TRANSLATIONS[locale];

  // Default coordinates: Downtown Dubai / Business Bay hub
  const [riderCoords, setRiderCoords] = useState<{ lat: number; lng: number }>({
    lat: 25.1972,
    lng: 55.2744,
  });
  const [hasCustomLocation, setHasCustomLocation] = useState(false);

  // Innovation 5: "Cool-by routing": estimate minutes until crossing High/Critical band
  const currentWbgt = evaluation.wbgt;
  const highThresholdWbgt = 31.0;
  const criticalThresholdWbgt = 33.5;

  let minutesUntilHigh = 45;
  if (currentWbgt >= criticalThresholdWbgt) {
    minutesUntilHigh = 0;
  } else if (currentWbgt >= highThresholdWbgt) {
    minutesUntilHigh = Math.max(2, Math.round((criticalThresholdWbgt - currentWbgt) * 6));
  } else {
    minutesUntilHigh = Math.max(10, Math.round((highThresholdWbgt - currentWbgt) * 12 + 15));
  }

  const coolByDate = new Date(Date.now() + minutesUntilHigh * 60 * 1000);
  const coolByTimeString = coolByDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Geolocation
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setRiderCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setHasCustomLocation(true);
        },
        () => {
          setHasCustomLocation(false);
        },
        { timeout: 5000 }
      );
    }
  }, []);

  // Compute distances & travel times for all 6 stations
  const computedStations: CoolingStation[] = DUBAI_COOLING_STATIONS.map((station) => {
    const dist = calculateHaversineDistance(
      riderCoords.lat,
      riderCoords.lng,
      station.lat,
      station.lng
    );
    // Average Dubai delivery motorcycle speed in urban traffic ~28 km/h
    const travelMins = Math.max(1, Math.round((dist / 28) * 60));
    return {
      ...station,
      distanceKm: dist,
      travelMinutesRiding: travelMins,
    };
  }).sort((a, b) => (a.distanceKm ?? 99) - (b.distanceKm ?? 99));

  const nearestStation = computedStations[0];
  const isHighOrCritical = evaluation.riskLevel === 'High' || evaluation.riskLevel === 'Critical';

  const openGoogleMapsDirections = (station: CoolingStation) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${riderCoords.lat},${riderCoords.lng}&destination=${station.lat},${station.lng}&travelmode=motorcycle`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      {/* 1. Primary Risk Card */}
      <RiskCard evaluation={evaluation} onOpenWhyAlert={onOpenWhyAlert} locale={locale} />

      {/* 2. Multilingual Alert advisory with voice read-out */}
      <MultilingualAlert
        advice={advice}
        currentLang={currentLang}
        onChangeLanguage={onChangeLanguage}
        isAiLoading={isAiLoading}
        locale={locale}
      />

      {/* 3. Innovation 5: "Cool-by Routing" Dynamic Window */}
      <section
        aria-label={t.rider.coolByTitle}
        className="bg-white border border-[#e5dfd3] rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#ece6da]">
          <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
            <div className="p-2.5 rounded-xl bg-[#edf4f0] text-[#173829]">
              <Compass className="w-5 h-5 text-[#173829]" />
            </div>
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <h3 className="font-extrabold text-base text-[#173829] font-sans">
                  {t.rider.coolByTitle}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#edf4f0] text-[#173829] border border-[#c3d9cd]">
                  {t.rider.coolByBadge}
                </span>
              </div>
              <p className="text-xs text-[#426050] mt-0.5">
                {t.rider.coolByDesc}
              </p>
            </div>
          </div>

          {/* Cool-by Badge */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse bg-[#f7f5ee] px-4 py-2.5 rounded-xl border border-[#e2dcd0] self-start sm:self-auto">
            <Clock className="w-4 h-4 text-[#d97706]" />
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#426050]">
                {t.rider.recommendedCoolBy}
              </div>
              <div className="text-sm font-extrabold text-[#173829] font-mono">
                {minutesUntilHigh === 0
                  ? t.rider.immediatelyNow
                  : `${coolByTimeString} (${minutesUntilHigh}m ${t.rider.minsLeft})`}
              </div>
            </div>
          </div>
        </div>

        {/* 4. PINNED NEAREST STATION (When High or Critical) */}
        {isHighOrCritical && nearestStation && (
          <div className="mt-4 p-5 rounded-xl bg-[#fff5f5] border-2 border-[#c81d25] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start space-x-3 rtl:space-x-reverse">
              <div className="p-3 rounded-xl bg-[#fee2e2] text-[#c81d25] shrink-0 mt-1">
                <Flame className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#c81d25] text-white">
                    {t.rider.emergencyRefuge}
                  </span>
                  <span className="text-xs text-[#991b1b] font-bold">{t.rider.highStrain}</span>
                </div>
                <h4 className="text-lg font-black text-[#173829] mt-1">
                  {locale === 'ar'
                    ? ARABIC_STATION_NAMES[nearestStation.id]?.name || nearestStation.name
                    : nearestStation.name}
                </h4>
                <p className="text-xs text-[#426050]">
                  {locale === 'ar'
                    ? ARABIC_STATION_NAMES[nearestStation.id]?.district || nearestStation.district
                    : nearestStation.district}
                </p>
                <div className="flex items-center space-x-3 rtl:space-x-reverse mt-2 text-xs font-mono text-[#173829]">
                  <span className="flex items-center space-x-1 rtl:space-x-reverse">
                    <MapPin className="w-3.5 h-3.5 text-[#c81d25]" />
                    <span>{nearestStation.distanceKm} {locale === 'ar' ? 'كم' : 'km'}</span>
                  </span>
                  <span className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Bike className="w-3.5 h-3.5 text-[#173829]" />
                    <span>~{nearestStation.travelMinutesRiding} {locale === 'ar' ? 'دقيقة دراجة' : 'mins bike'}</span>
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => openGoogleMapsDirections(nearestStation)}
              className="flex items-center justify-center space-x-2 rtl:space-x-reverse px-5 py-3 rounded-xl bg-[#c81d25] hover:bg-[#a5151c] text-white font-extrabold text-sm transition-all shadow-md shrink-0"
            >
              <Navigation className="w-4 h-4 fill-current" />
              <span>{t.rider.goNow}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>
        )}

        {/* 5. Schematic Radar / Mini-Map View */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Visual Schematic Radar */}
          <div className="bg-[#f7f5ee] p-5 rounded-xl border border-[#e2dcd0] flex flex-col items-center justify-center relative overflow-hidden min-h-[260px]">
            <div className="text-[11px] font-semibold text-[#426050] mb-2 w-full flex items-center justify-between">
              <span className="flex items-center space-x-1 rtl:space-x-reverse">
                <Compass className="w-3.5 h-3.5 text-[#173829]" />
                <span className="font-bold text-[#173829]">{t.rider.radarTitle}</span>
              </span>
              <span className="text-[10px] text-[#426050] font-mono">
                {hasCustomLocation ? t.rider.gpsLocked : t.rider.dubaiDefault}
              </span>
            </div>

            {/* Radar circles */}
            <div className="relative w-52 h-52 rounded-full border border-[#d8d0bf] flex items-center justify-center bg-white/70 shadow-inner">
              <div className="absolute inset-4 rounded-full border border-dashed border-[#d8d0bf]" />
              <div className="absolute inset-12 rounded-full border border-[#d8d0bf]" />
              <div className="absolute inset-20 rounded-full border border-[#d8d0bf]" />

              {/* Center crosshair (Current Rider) */}
              <div className="relative z-10 w-4 h-4 rounded-full bg-[#173829] border-2 border-white shadow-md flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#faf8f3]" />
              </div>
              <span className="absolute z-10 -bottom-5 text-[10px] font-bold text-[#173829] bg-white px-2 py-0.5 rounded-md border border-[#d8d0bf] shadow-xs">
                {t.rider.currentRiderPin}
              </span>

              {/* Station Markers placed radially */}
              {computedStations.slice(0, 5).map((st, i) => {
                const angle = (i * 72 * Math.PI) / 180;
                const radius = 28 + (st.distanceKm ?? 3) * 12;
                const clampedRadius = Math.min(85, Math.max(30, radius));
                const left = 104 + Math.cos(angle) * clampedRadius;
                const top = 104 + Math.sin(angle) * clampedRadius;

                return (
                  <button
                    key={st.id}
                    onClick={() => openGoogleMapsDirections(st)}
                    style={{ left: `${left}px`, top: `${top}px` }}
                    title={`${st.name} (${st.distanceKm} km)`}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#173829] text-white flex items-center justify-center shadow-md hover:scale-125 transition-transform border border-white">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="text-[10px] text-[#426050] text-center mt-6">
              {locale === 'ar'
                ? 'موقعك التقديري وسط مدينة دبي • انقر على أي محطة للملاحة المباشرة'
                : 'Click any rest station pin to launch turn-by-turn navigation.'}
            </div>
          </div>

          {/* Top Nearest Rest Stations List */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-[#173829] mb-1">
              <span>{t.rider.allStationsTitle} (6)</span>
              <span className="text-[11px] text-[#426050] font-normal">{t.rider.sortedByProximity}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
              {computedStations.map((station, index) => {
                const isNearest = index === 0;
                return (
                  <div
                    key={station.id}
                    className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                      isNearest
                        ? 'bg-[#edf4f0] border-[#173829]/40 shadow-xs'
                        : 'bg-[#f7f5ee] border-[#e2dcd0] hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <h4 className="text-xs font-bold text-[#173829] leading-tight">
                          {locale === 'ar'
                            ? ARABIC_STATION_NAMES[station.id]?.name || station.name
                            : station.name}
                        </h4>
                        {isNearest && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-[#173829] text-[#f7f5ee] shrink-0">
                            {t.rider.nearest}
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-[#426050] mb-2">
                        {locale === 'ar'
                          ? ARABIC_STATION_NAMES[station.id]?.district || station.district
                          : station.district}
                      </p>

                      {/* Amenities Icons */}
                      <div className="flex items-center flex-wrap gap-1.5 mb-3">
                        {station.amenities.map((am, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-[#d8d0bf] text-[#173829] font-medium"
                          >
                            {am}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#e2dcd0] text-xs">
                      <div className="font-mono text-[#173829] font-bold">
                        {station.distanceKm} {locale === 'ar' ? 'كم' : 'km'} • ~{station.travelMinutesRiding} {locale === 'ar' ? 'دقيقة' : 'm'}
                      </div>
                      <button
                        onClick={() => openGoogleMapsDirections(station)}
                        className="flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1 rounded-lg bg-[#173829] hover:bg-[#24533d] text-[#f7f5ee] font-bold text-[11px] transition-colors"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>{t.rider.route}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Rider Advisory Card with 3D Delivery Rider Illustration */}
        <div className="mt-5 p-5 rounded-2xl bg-gradient-to-r from-[#EBF5F0] to-[#FAF8F3] border border-[#C5DFD0] flex flex-col sm:flex-row items-center gap-4 shadow-xs">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white shrink-0">
            <img
              src="/assets/images/dubai_rider_3d_1794412011010.jpg"
              alt="Dubai Delivery Rider 3D Character"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-1 text-center sm:text-left rtl:sm:text-right">
            <div className="flex items-center justify-center sm:justify-start rtl:sm:justify-start space-x-1.5 rtl:space-x-reverse text-xs font-bold text-[#173829]">
              <Bike className="w-4 h-4 text-[#173829]" />
              <span>
                {locale === 'ar'
                  ? 'بروتوكول السلامة المعتمد لسائقي التوصيل في دبي'
                  : 'Dubai Delivery Rider Thermal Protocol'}
              </span>
            </div>
            <p className="text-xs text-[#2D4D3C] leading-relaxed">
              {locale === 'ar'
                ? 'تزيد حرارة الإسفلت المشعة من الحمل الحراري بمقدار 3 إلى 5 درجات مئوية أثناء الانتظار عند الإشارات. ارتدِ سترة التبريد الترطيبية وتوجه لأقرب محطة استراحة مبردة قبل موعد Cool-by المحدد.'
                : 'Asphalt solar re-radiation elevates effective skin temperature by +4°C during street stops. Hydrate with electrolyte water every 30 mins and navigate to nearest shaded sanctuary.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
