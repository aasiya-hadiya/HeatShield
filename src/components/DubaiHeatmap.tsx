import React, { useState, useMemo } from 'react';
import { DubaiDistrictHeatZone, HeatZoneCluster, RiskLevel } from '../types';
import { DUBAI_DISTRICT_HEAT_ZONES } from '../data/heatmapData';
import { AppLocale } from '../utils/i18n';
import {
  Map,
  Thermometer,
  Sun,
  ShieldAlert,
  ShieldCheck,
  Clock,
  Compass,
  Building2,
  Factory,
  Trees,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Filter,
  Search,
  Droplets,
  Layers,
} from 'lucide-react';

interface DubaiHeatmapProps {
  locale?: AppLocale;
  onSelectDistrictForPlanning?: (district: DubaiDistrictHeatZone) => void;
}

type TimeOfDay = 'morning' | 'midday' | 'evening';

export const DubaiHeatmap: React.FC<DubaiHeatmapProps> = ({
  locale = 'en',
  onSelectDistrictForPlanning,
}) => {
  const isAr = locale === 'ar';

  // State
  const [selectedTime, setSelectedTime] = useState<TimeOfDay>('midday');
  const [selectedCluster, setSelectedCluster] = useState<HeatZoneCluster | 'All'>('All');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('downtown');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showRankings, setShowRankings] = useState<boolean>(false);

  // Compute active WBGT for chosen time of day
  const getDistrictWbgt = (district: DubaiDistrictHeatZone, time: TimeOfDay): number => {
    switch (time) {
      case 'morning':
        return district.morningWbgt;
      case 'midday':
        return district.middayWbgt;
      case 'evening':
        return district.eveningWbgt;
      default:
        return district.currentWbgt;
    }
  };

  const getRiskLevelForWbgt = (wbgt: number): RiskLevel => {
    if (wbgt >= 35.0) return 'Critical';
    if (wbgt >= 33.0) return 'High';
    if (wbgt >= 31.0) return 'Moderate';
    return 'Low';
  };

  const getRiskColor = (risk: RiskLevel) => {
    switch (risk) {
      case 'Critical':
        return {
          fill: '#FCA5A5',
          border: '#DC2626',
          text: '#991B1B',
          bg: '#FEF2F2',
          badge: 'bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]',
        };
      case 'High':
        return {
          fill: '#FDBA74',
          border: '#EA580C',
          text: '#9A3412',
          bg: '#FFF7ED',
          badge: 'bg-[#FFEDD5] text-[#9A3412] border-[#FDBA74]',
        };
      case 'Moderate':
        return {
          fill: '#FDE68A',
          border: '#D97706',
          text: '#92400E',
          bg: '#FFFBEB',
          badge: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
        };
      case 'Low':
      default:
        return {
          fill: '#A7F3D0',
          border: '#059669',
          text: '#065F46',
          bg: '#F0FDF4',
          badge: 'bg-[#DCFCE7] text-[#065F46] border-[#A7F3D0]',
        };
    }
  };

  // Filtered districts
  const filteredDistricts = useMemo(() => {
    return DUBAI_DISTRICT_HEAT_ZONES.filter((district) => {
      const matchesCluster =
        selectedCluster === 'All' || district.cluster === selectedCluster;
      const matchesSearch =
        district.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        district.nameAr.includes(searchQuery);
      return matchesCluster && matchesSearch;
    });
  }, [selectedCluster, searchQuery]);

  const selectedDistrict = useMemo(() => {
    return (
      DUBAI_DISTRICT_HEAT_ZONES.find((d) => d.id === selectedDistrictId) ||
      DUBAI_DISTRICT_HEAT_ZONES[0]
    );
  }, [selectedDistrictId]);

  const currentSelectedWbgt = getDistrictWbgt(selectedDistrict, selectedTime);
  const currentSelectedRisk = getRiskLevelForWbgt(currentSelectedWbgt);
  const selectedRiskStyle = getRiskColor(currentSelectedRisk);

  return (
    <div className="bg-white border border-[#E5DFD3] rounded-3xl p-5 sm:p-7 shadow-xs hover:shadow-md transition-shadow space-y-6">
      {/* Top Header: Title, Arabic Calligraphy, Description */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#ECE6DA]">
        <div className="space-y-1">
          <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
            <div className="p-2.5 rounded-2xl bg-[#EBF5F0] text-[#173829]">
              <Map className="w-5 h-5 text-[#173829]" />
            </div>
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <h3 className="font-arabic-calligraphy text-xl sm:text-2xl font-black text-[#173829]">
                  {isAr ? 'خريطة النطاقات الحرارية لمناطق دبي' : 'Dubai District Heat Zones Heatmap'}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF5F0] text-[#173829] border border-[#C5DFD0]">
                  {isAr ? 'تخطيط المواقع الآمنة' : 'Site Planning AI'}
                </span>
              </div>
              <p className="text-xs text-[#4A6857] mt-0.5">
                {isAr
                  ? 'مصفوفة حرارية جغرافية لمساعدة مشرفي المواقع على توجيه الفرق إلى المناطق الآمنة وتجنب الجزر الحرارية الصناعية'
                  : 'Geospatial microclimate thermal modeling to help coordinators schedule and deploy crews safely across Dubai'}
              </p>
            </div>
          </div>
        </div>

        {/* Time-of-Day Shift Selector Tabs */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse self-start lg:self-auto">
          <span className="text-xs font-bold text-[#4A6857] hidden sm:inline">
            {isAr ? 'فترة المناوبة:' : 'Shift Window:'}
          </span>
          <div className="inline-flex bg-[#F4EFE6] p-1 rounded-2xl border border-[#DDD4C3]">
            <button
              onClick={() => setSelectedTime('morning')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 rtl:space-x-reverse ${
                selectedTime === 'morning'
                  ? 'bg-[#173829] text-[#FAF8F3] shadow-xs'
                  : 'text-[#4A6857] hover:text-[#173829]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{isAr ? 'صباحاً (07:00)' : 'Morning (07:00)'}</span>
            </button>

            <button
              onClick={() => setSelectedTime('midday')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 rtl:space-x-reverse ${
                selectedTime === 'midday'
                  ? 'bg-[#173829] text-[#FAF8F3] shadow-xs'
                  : 'text-[#4A6857] hover:text-[#173829]'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>{isAr ? 'الذروة (13:00)' : 'Peak Midday (13:00)'}</span>
            </button>

            <button
              onClick={() => setSelectedTime('evening')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 rtl:space-x-reverse ${
                selectedTime === 'evening'
                  ? 'bg-[#173829] text-[#FAF8F3] shadow-xs'
                  : 'text-[#4A6857] hover:text-[#173829]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{isAr ? 'مساءً (17:00)' : 'Evening (17:00)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cluster Filters & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Cluster Tabs */}
        <div className="flex items-center space-x-1.5 rtl:space-x-reverse overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-[#4A6857] mr-1 rtl:mr-0 rtl:ml-1 hidden md:inline">
            <Filter className="w-3.5 h-3.5 inline mr-1" />
            {isAr ? 'القطاع:' : 'Zone:'}
          </span>
          {(['All', 'Coastal', 'Urban Core', 'Industrial', 'Inland Desert'] as const).map(
            (cluster) => {
              const count =
                cluster === 'All'
                  ? DUBAI_DISTRICT_HEAT_ZONES.length
                  : DUBAI_DISTRICT_HEAT_ZONES.filter((d) => d.cluster === cluster).length;
              return (
                <button
                  key={cluster}
                  onClick={() => setSelectedCluster(cluster)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                    selectedCluster === cluster
                      ? 'bg-[#173829] text-[#FAF8F3] border-[#173829] shadow-xs'
                      : 'bg-[#FAF8F3] border-[#DDD4C3] text-[#4A6857] hover:bg-[#EFE9DC]'
                  }`}
                >
                  <span>
                    {cluster === 'All'
                      ? isAr
                        ? 'كافة المناطق'
                        : 'All Districts'
                      : cluster === 'Coastal'
                      ? isAr
                        ? 'ساحلية'
                        : 'Coastal'
                      : cluster === 'Urban Core'
                      ? isAr
                        ? 'قلب المدينة'
                        : 'Urban Core'
                      : cluster === 'Industrial'
                      ? isAr
                        ? 'صناعية'
                        : 'Industrial'
                      : isAr
                      ? 'صحراوية داخلية'
                      : 'Inland Desert'}
                  </span>
                  <span className="ml-1 rtl:ml-0 rtl:mr-1 opacity-70">({count})</span>
                </button>
              );
            }
          )}
        </div>

        {/* Quick Search */}
        <div className="relative max-w-xs w-full">
          <Search className="w-3.5 h-3.5 text-[#6C8D7B] absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'بحث عن منطقة في دبي...' : 'Search Dubai district...'}
            className="w-full pl-9 pr-3 rtl:pl-3 rtl:pr-9 py-1.5 rounded-xl bg-[#FAF8F3] border border-[#DDD4C3] text-xs text-[#173829] placeholder-[#8EA99A] focus:outline-none focus:ring-2 focus:ring-[#173829]"
          />
        </div>
      </div>

      {/* Main Heatmap Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Dubai Geographic Map Canvas */}
        <div className="lg:col-span-7 bg-[#FAF8F3] rounded-3xl border border-[#DDD4C3] p-4 sm:p-5 relative overflow-hidden flex flex-col justify-between min-h-[440px] sm:min-h-[480px]">
          {/* Map Top Indicators & Legend */}
          <div className="flex items-center justify-between mb-3 z-10">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-[11px] font-bold text-[#173829] flex items-center space-x-1 rtl:space-x-reverse">
                <Compass className="w-3.5 h-3.5 text-[#173829]" />
                <span>{isAr ? 'مخطط إمارة دبي الجغرافي' : 'Dubai Spatial Grid (Simulated)'}</span>
              </span>
              <span className="text-[10px] text-[#6C8D7B] font-mono">
                {selectedTime === 'morning'
                  ? '07:00 AM'
                  : selectedTime === 'midday'
                  ? '01:00 PM (Midday Ban)'
                  : '05:00 PM'}
              </span>
            </div>

            {/* Heatmap Legend */}
            <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-[9px] font-bold">
              <span className="flex items-center space-x-1 rtl:space-x-reverse">
                <span className="w-2.5 h-2.5 rounded-full bg-[#A7F3D0] border border-[#059669]" />
                <span className="text-[#065F46]">&lt;31°</span>
              </span>
              <span className="flex items-center space-x-1 rtl:space-x-reverse">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FDE68A] border border-[#D97706]" />
                <span className="text-[#92400E]">31-33°</span>
              </span>
              <span className="flex items-center space-x-1 rtl:space-x-reverse">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FDBA74] border border-[#EA580C]" />
                <span className="text-[#9A3412]">33-35°</span>
              </span>
              <span className="flex items-center space-x-1 rtl:space-x-reverse">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FCA5A5] border border-[#DC2626] animate-pulse" />
                <span className="text-[#991B1B]">&gt;35°</span>
              </span>
            </div>
          </div>

          {/* SVG Map Canvas with Coastline, Water, and District Nodes */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#E2F1F8] via-[#F4EFE6] to-[#EAE4D7] border border-[#DCD4C4] shadow-inner select-none">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Coastal Sea Water Pattern */}
                <linearGradient id="seaWater" x1="0%" y1="0%" x2="60%" y2="80%">
                  <stop offset="0%" stopColor="#C9E6F2" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#D8EEF7" stopOpacity="0.4" />
                </linearGradient>

                {/* Heat glow filters */}
                <filter id="heatGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Arabian Gulf Water Body on Top-Left */}
              <path
                d="M 0 0 L 85 0 Q 75 18 68 28 Q 50 35 38 48 Q 20 62 8 85 L 0 100 Z"
                fill="url(#seaWater)"
              />

              {/* Dubai Creek (Khor Dubai) Penetrating Inland */}
              <path
                d="M 72 15 Q 70 24 74 28 Q 80 32 82 40"
                stroke="#B5DCEE"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />

              {/* Dubai Water Canal Ribbon */}
              <path
                d="M 48 32 Q 54 38 58 44"
                stroke="#B5DCEE"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="1,1"
              />

              {/* Palm Jumeirah Stylized Frond Outline */}
              <g opacity="0.6">
                <path
                  d="M 33 43 C 32 40 33 36 34 34 C 36 36 37 40 35 43 Z"
                  fill="#C0DFD0"
                  stroke="#8CC6A5"
                  strokeWidth="0.5"
                />
                <circle cx="34" cy="35" r="3.5" fill="none" stroke="#8CC6A5" strokeWidth="0.6" strokeDasharray="1,1" />
              </g>

              {/* Sheikh Zayed Road (E11) Arterial Highway Corridor */}
              <path
                d="M 80 18 L 64 32 L 48 48 L 28 66 L 14 82"
                stroke="#C5BEAE"
                strokeWidth="1.2"
                strokeDasharray="2,1.5"
                fill="none"
              />

              {/* District Heat Halo Gradients */}
              {filteredDistricts.map((d) => {
                const wbgt = getDistrictWbgt(d, selectedTime);
                const risk = getRiskLevelForWbgt(wbgt);
                const color = getRiskColor(risk);
                const isSelected = d.id === selectedDistrictId;

                return (
                  <circle
                    key={`halo-${d.id}`}
                    cx={d.mapCoords.x}
                    cy={d.mapCoords.y}
                    r={isSelected ? 10 : 7}
                    fill={color.fill}
                    opacity={isSelected ? 0.65 : 0.45}
                    filter="url(#heatGlow)"
                    className="transition-all duration-500"
                  />
                );
              })}

              {/* Text label: Arabian Gulf */}
              <text x="12" y="16" fill="#4B778D" fontSize="3.2" fontWeight="700" letterSpacing="0.2">
                {isAr ? 'الخليج العربي' : 'Arabian Gulf'}
              </text>

              {/* Text label: SZR Highway */}
              <text x="50" y="44" fill="#887E6E" fontSize="2.2" transform="rotate(-38 50 44)">
                Sheikh Zayed Rd (E11)
              </text>
            </svg>

            {/* Clickable HTML Interactive District Nodes */}
            {filteredDistricts.map((district) => {
              const wbgt = getDistrictWbgt(district, selectedTime);
              const risk = getRiskLevelForWbgt(wbgt);
              const color = getRiskColor(risk);
              const isSelected = district.id === selectedDistrictId;

              return (
                <button
                  key={district.id}
                  onClick={() => {
                    setSelectedDistrictId(district.id);
                    if (onSelectDistrictForPlanning) onSelectDistrictForPlanning(district);
                  }}
                  style={{
                    left: `${district.mapCoords.x}%`,
                    top: `${district.mapCoords.y}%`,
                  }}
                  title={`${district.name}: ${wbgt.toFixed(1)}°C WBGT (${risk})`}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-200 z-20 ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                  }`}
                >
                  <div
                    style={{ backgroundColor: color.fill, borderColor: color.border }}
                    className={`px-2 py-1 rounded-xl shadow-md border-2 flex items-center space-x-1 rtl:space-x-reverse transition-transform ${
                      risk === 'Critical' ? 'animate-pulse' : ''
                    } ${isSelected ? 'ring-3 ring-[#173829] shadow-lg' : ''}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color.border }} />
                    <span className="text-[10px] font-mono font-black" style={{ color: color.text }}>
                      {wbgt.toFixed(1)}°
                    </span>
                  </div>

                  {/* District Tooltip Name Badge */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 -bottom-5 px-1.5 py-0.5 rounded-md bg-[#173829]/95 text-white text-[9px] font-bold whitespace-nowrap pointer-events-none transition-opacity ${
                      isSelected ? 'opacity-100 shadow-sm' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {isAr ? district.nameAr.split(' ')[0] : district.name.split(' ')[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Geographic Advice Strip */}
          <div className="mt-3 pt-2.5 border-t border-[#DDD4C3] flex items-center justify-between text-[11px] text-[#4A6857]">
            <span className="flex items-center space-x-1.5 rtl:space-x-reverse">
              <Trees className="w-3.5 h-3.5 text-[#173829]" />
              <span>
                {isAr
                  ? 'المناطق الساحلية (مارينا، جميرا) أكثر أماناً بفارق 2.5-3 درجات مئوية'
                  : 'Coastal belts (Marina, Jumeirah) stay ~2.5°C cooler than desert hubs'}
              </span>
            </span>
            <button
              onClick={() => setShowRankings((v) => !v)}
              className="text-[#173829] underline hover:text-[#24533D] font-bold text-xs"
            >
              {showRankings
                ? isAr
                  ? 'إخفاء جدول المقارنة'
                  : 'Hide Ranking'
                : isAr
                ? 'عرض ترتيب المناطق'
                : 'View Full Ranking'}
            </button>
          </div>
        </div>

        {/* Selected District Planning Inspector Card */}
        <div className="lg:col-span-5 bg-[#FAF8F3] rounded-3xl border border-[#DDD4C3] p-5 sm:p-6 space-y-4">
          <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#E8E2D5]">
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6C8D7B]">
                  {selectedDistrict.cluster} Zone
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${selectedRiskStyle.badge}`}
                >
                  {currentSelectedRisk} Heat Risk
                </span>
              </div>
              <h4 className="font-arabic-calligraphy text-xl font-black text-[#173829] mt-1 leading-snug">
                {isAr ? selectedDistrict.nameAr : selectedDistrict.name}
              </h4>
              <p className="text-xs text-[#4A6857]">
                {isAr ? selectedDistrict.name : selectedDistrict.nameAr}
              </p>
            </div>

            {/* Safety Score Meter */}
            <div className="flex flex-col items-center bg-white p-2.5 rounded-2xl border border-[#DDD4C3] shadow-xs">
              <span className="text-[9px] font-bold text-[#6C8D7B] uppercase">Safety Score</span>
              <span
                className={`text-lg font-black font-mono ${
                  selectedDistrict.safetyScore >= 70
                    ? 'text-[#065F46]'
                    : selectedDistrict.safetyScore >= 50
                    ? 'text-[#92400E]'
                    : 'text-[#991B1B]'
                }`}
              >
                {selectedDistrict.safetyScore}/100
              </span>
            </div>
          </div>

          {/* Microclimate Telemetry Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-2xl bg-white border border-[#DDD4C3] shadow-xs space-y-0.5">
              <div className="text-[10px] font-semibold text-[#6C8D7B] uppercase flex items-center space-x-1 rtl:space-x-reverse">
                <Thermometer className="w-3.5 h-3.5 text-[#173829]" />
                <span>Effective WBGT</span>
              </div>
              <div className="text-xl font-black text-[#173829] font-mono">
                {currentSelectedWbgt.toFixed(1)}°C
              </div>
              <div className="text-[10px] text-[#4A6857]">
                Air: {selectedDistrict.airTemp}°C • RH: {selectedDistrict.humidity}%
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-[#DDD4C3] shadow-xs space-y-0.5">
              <div className="text-[10px] font-semibold text-[#6C8D7B] uppercase flex items-center space-x-1 rtl:space-x-reverse">
                <Sun className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Solar Radiation</span>
              </div>
              <div className="text-xl font-black text-[#173829] font-mono">
                {selectedDistrict.solarRadiationWm2} W/m²
              </div>
              <div className="text-[10px] text-[#4A6857]">
                Natural Shade: <strong>{selectedDistrict.shadePercentage}%</strong>
              </div>
            </div>
          </div>

          {/* Supervisor Site Safety Action Recommendation */}
          <div className="p-4 rounded-2xl bg-white border border-[#DDD4C3] space-y-2 shadow-xs">
            <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-xs font-bold text-[#173829]">
              <ShieldAlert className="w-4 h-4 text-[#173829]" />
              <span>{isAr ? 'توصيات مشرف الموقع المعتمدة:' : 'Supervisor Site Planning Directive:'}</span>
            </div>
            <p className="text-xs text-[#2D4D3C] leading-relaxed">
              {isAr ? selectedDistrict.safetyRecommendationAr : selectedDistrict.safetyRecommendationEn}
            </p>
          </div>

          {/* Suitable Work Type & Cooling Hub */}
          <div className="p-3.5 rounded-2xl bg-[#EBF5F0] border border-[#C5DFD0] space-y-2 text-xs">
            <div className="flex items-start space-x-2 rtl:space-x-reverse text-[#173829]">
              <CheckCircle2 className="w-4 h-4 text-[#173829] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">{isAr ? 'الأنشطة المناسبة حالياً:' : 'Permitted Tasks:'}</span>{' '}
                <span className="text-[#385947]">
                  {isAr ? selectedDistrict.suitableWorkTypeAr : selectedDistrict.suitableWorkTypeEn}
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-2 rtl:space-x-reverse text-[#173829] pt-1.5 border-t border-[#D5E5DC]">
              <Compass className="w-4 h-4 text-[#173829] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">{isAr ? 'أقرب استراحة مبردة:' : 'Designated Cooling Oasis:'}</span>{' '}
                <span className="text-[#385947]">
                  {isAr ? selectedDistrict.coolingHubAr : selectedDistrict.nearestCoolingHub}
                </span>
              </div>
            </div>
          </div>

          {/* Supervisor Action CTA */}
          <div className="pt-2">
            <button
              onClick={() => {
                if (onSelectDistrictForPlanning) onSelectDistrictForPlanning(selectedDistrict);
              }}
              className="w-full py-3 px-4 rounded-2xl bg-[#173829] hover:bg-[#24533D] text-[#FAF8F3] font-bold text-xs flex items-center justify-center space-x-2 rtl:space-x-reverse shadow-xs transition-colors"
            >
              <span>
                {isAr
                  ? `اعتماد خطة السلامة لمنطقة ${selectedDistrict.nameAr.split(' ')[0]}`
                  : `Plan Site Crew Safety for ${selectedDistrict.name}`}
              </span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Comparative Ranking Table */}
      {showRankings && (
        <div className="pt-4 border-t border-[#ECE6DA] space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-[#173829] flex items-center space-x-2 rtl:space-x-reverse">
              <Layers className="w-4 h-4 text-[#173829]" />
              <span>
                {isAr
                  ? 'ترتيب كافة مناطق دبي حسب مؤشر الأمان الحراري (من الأكثر أماناً إلى الأشد خطورة)'
                  : 'Dubai Districts Thermal Safety Ranking (Safest to Most Critical)'}
              </span>
            </h4>
            <span className="text-xs text-[#6C8D7B]">13 Districts Monitored</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#DDD4C3]">
            <table className="w-full text-xs text-left rtl:text-right">
              <thead className="bg-[#FAF8F3] text-[#173829] font-bold border-b border-[#DDD4C3]">
                <tr>
                  <th className="p-3">Rank</th>
                  <th className="p-3">{isAr ? 'المنطقة' : 'District'}</th>
                  <th className="p-3">{isAr ? 'القطاع' : 'Cluster'}</th>
                  <th className="p-3">Effective WBGT</th>
                  <th className="p-3">{isAr ? 'نسبة الظل' : 'Shade %'}</th>
                  <th className="p-3">{isAr ? 'مستوى الخطر' : 'Risk'}</th>
                  <th className="p-3">{isAr ? 'العمال التقديريون' : 'Est. Workers'}</th>
                  <th className="p-3">{isAr ? 'إجراء المشرف' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE4D7] bg-white">
                {[...DUBAI_DISTRICT_HEAT_ZONES]
                  .sort((a, b) => b.safetyScore - a.safetyScore)
                  .map((d, index) => {
                    const wbgt = getDistrictWbgt(d, selectedTime);
                    const risk = getRiskLevelForWbgt(wbgt);
                    const color = getRiskColor(risk);

                    return (
                      <tr
                        key={d.id}
                        onClick={() => setSelectedDistrictId(d.id)}
                        className={`hover:bg-[#F9F7F2] cursor-pointer transition-colors ${
                          d.id === selectedDistrictId ? 'bg-[#EBF5F0]/60 font-semibold' : ''
                        }`}
                      >
                        <td className="p-3 font-mono font-bold text-[#6C8D7B]">#{index + 1}</td>
                        <td className="p-3">
                          <div className="font-bold text-[#173829]">{isAr ? d.nameAr : d.name}</div>
                          <div className="text-[10px] text-[#6C8D7B]">{isAr ? d.name : d.nameAr}</div>
                        </td>
                        <td className="p-3 text-[#4A6857]">{d.cluster}</td>
                        <td className="p-3 font-mono font-bold text-[#173829]">
                          {wbgt.toFixed(1)}°C
                        </td>
                        <td className="p-3 font-mono text-[#4A6857]">{d.shadePercentage}%</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${color.badge}`}
                          >
                            {risk}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-[#6C8D7B]">
                          {d.activeWorkersEst.toLocaleString()}
                        </td>
                        <td className="p-3 text-[11px] text-[#2D4D3C] max-w-xs truncate">
                          {isAr ? d.safetyRecommendationAr : d.safetyRecommendationEn}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
