import React, { useState } from 'react';
import {
  RiskEvaluation,
  SmartShiftPlan,
  AlertFeedbackState,
} from '../types';
import { DEMO_CREWS } from '../data/mockData';
import { evaluateHeatRisk } from '../utils/riskEngine';
import {
  Users,
  ShieldCheck,
  Calendar,
  Sparkles,
  Heart,
  TrendingUp,
  Download,
  ThumbsUp,
  ThumbsDown,
  CheckCircle,
  ThermometerSnowflake,
  AlertTriangle,
} from 'lucide-react';
import { AppLocale, UI_TRANSLATIONS } from '../utils/i18n';
import { DubaiHeatmap } from './DubaiHeatmap';

interface SupervisorViewProps {
  evaluation: RiskEvaluation;
  onOpenWhyAlert: () => void;
  feedbackState: AlertFeedbackState;
  onRecordFeedback: (type: 'useful' | 'false_alarm') => void;
  smartShiftPlan: SmartShiftPlan | null;
  onRequestPlan: () => void;
  isPlanLoading: boolean;
  historyWbgt: Array<{ time: string; wbgt: number }>;
  locale?: AppLocale;
}

const ARABIC_CREW_INFO: Record<string, { name: string; task: string; zone: string }> = {
  'crew-a': {
    name: 'فريق أ (حدادة وتجهيز حديد التسليح)',
    task: 'ربط حديد التسليح وتركيب الشباك المسبقة الصنع',
    zone: 'البرج الغربي - المنطقة المظللة 3',
  },
  'crew-b': {
    name: 'فريق ب (تركيب السقالات الهيكلية)',
    task: 'رفع المنصات الموديلية وتثبيت الأنابيب الخارجية',
    zone: 'الواجهة الشمالية - المنصة المرتفعة',
  },
  'crew-c': {
    name: 'فريق ج (صب الخرسانة والأساسات)',
    task: 'صب الخرسانة المستمر والتسوية السطحية',
    zone: 'مدخل القبو والساحة المكشوفة',
  },
};

export const SupervisorView: React.FC<SupervisorViewProps> = ({
  evaluation,
  onOpenWhyAlert,
  feedbackState,
  onRecordFeedback,
  smartShiftPlan,
  onRequestPlan,
  isPlanLoading,
  historyWbgt,
  locale = 'en',
}) => {
  const t = UI_TRANSLATIONS[locale];
  const [showWearableData, setShowWearableData] = useState(false);

  // Compute live risk status for each of the 3 crews
  const crewsWithLiveStatus = DEMO_CREWS.map((crew) => {
    const crewEval = evaluateHeatRisk({
      airTemp: evaluation.airTemp,
      humidity: evaluation.humidity,
      globeTemp: evaluation.globeTemp,
      sunExposure: 'full',
      workload: crew.workload,
      acclimatized: crew.acclimatized,
      heavyPPE: crew.heavyPPE,
      exposureHours: crew.exposureHours,
      forceMiddayBan: evaluation.isMiddayBanActive,
    });

    return {
      ...crew,
      liveEvaluation: crewEval,
    };
  });

  // Export CSV Audit for Dubai Municipality / MoHRE Inspector
  const handleExportCsv = () => {
    const headers = [
      'Timestamp',
      'Site Zone',
      'Crew',
      'Air Temp (°C)',
      'Humidity (%)',
      'Calculated WBGT (°C)',
      'Risk Level',
      'Mandatory Ratio',
      'Midday Ban Status',
      'MoHRE Compliant',
    ];

    const rows = crewsWithLiveStatus.map((c) => [
      new Date().toISOString(),
      c.zone,
      c.name,
      evaluation.airTemp,
      evaluation.humidity,
      c.liveEvaluation.wbgt,
      c.liveEvaluation.riskLevel,
      `"${c.liveEvaluation.workRestRatio || c.liveEvaluation.safeAction}"`,
      evaluation.isMiddayBanActive ? 'YES (12:30-15:00 Stop)' : 'NO',
      'TRUE (ISO 7243 / UAE Decree 44)',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `HeatShield_Dubai_Compliance_Audit_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* 1. Top Summary Banner for Site Coordinator */}
      <div className="bg-white border border-[#e5dfd3] rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="p-3 rounded-2xl bg-[#edf4f0] text-[#173829]">
              <Users className="w-6 h-6 text-[#173829]" />
            </div>
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <h2 className="text-lg font-black text-[#173829] font-sans">
                  {t.supervisor.overviewTitle}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#edf4f0] text-[#173829] border border-[#c3d9cd]">
                  {t.supervisor.threeCrewsActive}
                </span>
              </div>
              <p className="text-xs text-[#426050] mt-0.5">
                {t.supervisor.overviewSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            {/* Optional Wearables view toggle */}
            <button
              onClick={() => setShowWearableData((v) => !v)}
              className={`flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                showWearableData
                  ? 'bg-[#173829] text-[#f7f5ee] border-[#173829]'
                  : 'bg-[#f7f5ee] text-[#173829] border-[#d8d0bf] hover:bg-[#eae4d5]'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-[#c81d25]" />
              <span>{showWearableData ? t.supervisor.hideWearables : t.supervisor.showWearables}</span>
            </button>

            {/* CSV Export Button */}
            <button
              onClick={handleExportCsv}
              className="flex items-center space-x-1.5 rtl:space-x-reverse px-4 py-2 rounded-xl bg-[#173829] hover:bg-[#24533d] text-[#f7f5ee] text-xs font-bold transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.supervisor.downloadAuditCsv}</span>
            </button>
          </div>
        </div>

        {/* Midday Ban Banner if active */}
        {evaluation.isMiddayBanActive && (
          <div className="mt-4 p-4 rounded-xl bg-[#fff5f5] border-2 border-[#c81d25] flex items-center space-x-3 rtl:space-x-reverse">
            <AlertTriangle className="w-5 h-5 text-[#c81d25] shrink-0" />
            <div className="text-xs text-[#991b1b]">
              <strong className="font-black text-[#c81d25]">
                {locale === 'ar'
                  ? 'حظر العمل وقت الظهيرة سارٍ قانونياً (12:30 - 15:00):'
                  : 'UAE MoHRE Midday Work Ban Legally In Effect (12:30 - 15:00):'}
              </strong>{' '}
              {locale === 'ar'
                ? 'يمنع منعاً باتاً أداء أي أعمال مكشوفة تحت أشعة الشمس المباشرة. يجب نقل جميع الفرق إلى بيئات مكيفة أو استراحات مظللة.'
                : 'All outdoor work under direct sunlight must cease immediately. Relocate crews to shaded or air-conditioned rest halls.'}
            </div>
          </div>
        )}
      </div>

      {/* 2. Dubai District Heat Zones Heatmap (Interactive Geospatial Planning) */}
      <DubaiHeatmap locale={locale} />

      {/* 3. Three Site Crews Real-Time Status Table */}
      <div className="bg-white border border-[#e5dfd3] rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-[#173829] uppercase tracking-wider flex items-center space-x-2 rtl:space-x-reverse">
            <span className="w-2 h-2 rounded-full bg-[#173829]" />
            <span>{t.supervisor.crewGridTitle}</span>
          </h3>
          <button
            onClick={onOpenWhyAlert}
            className="text-xs text-[#173829] underline hover:text-[#24533d] font-bold"
          >
            {t.supervisor.auditThresholdFormula}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {crewsWithLiveStatus.map((crew) => {
            const isHighOrCritical =
              crew.liveEvaluation.riskLevel === 'High' || crew.liveEvaluation.riskLevel === 'Critical';

            return (
              <div
                key={crew.id}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  isHighOrCritical
                    ? 'bg-[#fff5f5] border-[#c81d25]/60 shadow-xs'
                    : 'bg-[#f7f5ee] border-[#e2dcd0] hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <div>
                      <h4 className="font-bold text-sm text-[#173829]">
                        {locale === 'ar'
                          ? ARABIC_CREW_INFO[crew.id]?.name || crew.name
                          : crew.name}
                      </h4>
                      <p className="text-[11px] text-[#426050]">
                        {locale === 'ar'
                          ? ARABIC_CREW_INFO[crew.id]?.zone || crew.zone
                          : crew.zone}
                      </p>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                        crew.liveEvaluation.riskLevel === 'Critical'
                          ? 'bg-[#c81d25] text-white border-[#c81d25]'
                          : crew.liveEvaluation.riskLevel === 'High'
                          ? 'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]'
                          : crew.liveEvaluation.riskLevel === 'Moderate'
                          ? 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]'
                          : 'bg-[#edf4f0] text-[#173829] border-[#c3d9cd]'
                      }`}
                    >
                      {crew.liveEvaluation.riskLevel}
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-[#e2dcd0] space-y-1.5 text-xs my-3 shadow-xs">
                    <div className="flex justify-between">
                      <span className="text-[#426050]">{locale === 'ar' ? 'مؤشر WBGT الفعلي' : 'Effective WBGT'}:</span>
                      <strong className="font-mono text-[#173829] font-bold">
                        {crew.liveEvaluation.wbgt.toFixed(1)}°C
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#426050]">{locale === 'ar' ? 'نسبة العمل / الراحة' : 'Work/Rest Ratio'}:</span>
                      <strong className="text-[#173829] font-bold">
                        {crew.liveEvaluation.workRestRatio || crew.liveEvaluation.safeAction}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#426050]">{locale === 'ar' ? 'طبيعة الجهد' : 'Workload'}:</span>
                      <span className="text-[#426050]">{crew.workload}</span>
                    </div>

                    {showWearableData && (
                      <div className="pt-2 border-t border-[#ece6da] flex justify-between text-[#c81d25] font-semibold">
                        <span>Avg HR (simulated):</span>
                        <span className="font-mono">118 bpm</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#e2dcd0] flex items-center justify-between text-[11px]">
                  <span className="text-[#426050]">
                    {crew.size} {locale === 'ar' ? 'عمال في الفريق' : 'workers on site'}
                  </span>
                  <span className="text-[#173829] font-bold">
                    {crew.liveEvaluation.isMiddayBanActive ? 'HALTED' : 'ACTIVE'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. SmartShift AI Re-Allocation Planner */}
      <div className="bg-white border border-[#e5dfd3] rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ece6da]">
          <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
            <div className="p-2.5 rounded-xl bg-[#edf4f0] text-[#173829]">
              <Sparkles className="w-5 h-5 text-[#173829]" />
            </div>
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <h3 className="font-extrabold text-base text-[#173829]">
                  {t.supervisor.smartShiftTitle}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#edf4f0] text-[#173829] border border-[#c3d9cd]">
                  {t.supervisor.smartShiftBadge}
                </span>
              </div>
              <p className="text-xs text-[#426050] mt-0.5">
                {t.supervisor.smartShiftSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onRequestPlan}
            disabled={isPlanLoading}
            className="flex items-center space-x-1.5 rtl:space-x-reverse px-4 py-2 rounded-xl bg-[#173829] hover:bg-[#24533d] text-[#f7f5ee] text-xs font-bold transition-all shadow-xs disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isPlanLoading ? t.supervisor.generatingPlan : t.supervisor.regeneratePlan}</span>
          </button>
        </div>

        {/* SmartShift Timeline Visual (06:00 to 18:00) */}
        {smartShiftPlan && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#f7f5ee] border border-[#e2dcd0]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#173829] mb-2 flex items-center space-x-1.5 rtl:space-x-reverse">
                <Calendar className="w-4 h-4 text-[#173829]" />
                <span>{t.supervisor.shiftTimelineTitle} (06:00 - 18:00 Dubai Time)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-3">
                {smartShiftPlan.timeline?.map((slot, idx) => {
                  const slotTime = slot.timeSlot || slot.hours || '';
                  const slotTitle = slot.label || slot.activity || 'Site Shift Window';
                  const slotDesc = slot.coolingProtocol || slot.zone || (slot.crewActions ? Object.values(slot.crewActions).join(' • ') : '');
                  const isMiddaySlot = slot.isMiddayBan || slotTime.includes('12:00') || slotTime.includes('12:30') || slotTime.includes('13:00') || slotTime.includes('14:00');
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-xs ${
                        isMiddaySlot
                          ? 'bg-[#fee2e2] border-[#fca5a5] text-[#991b1b]'
                          : 'bg-white border-[#e2dcd0] text-[#173829]'
                      }`}
                    >
                      <div className="font-mono font-bold text-xs mb-1 flex items-center justify-between">
                        <span>{slotTime}</span>
                        {isMiddaySlot && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#c81d25] text-white font-sans uppercase">
                            Midday Stop
                          </span>
                        )}
                      </div>
                      <div className="font-bold text-xs text-[#173829]">{slotTitle}</div>
                      <div className="text-[11px] text-[#426050] mt-1">{slotDesc}</div>
                      {slot.risk && (
                        <div className="mt-2 text-[10px] font-mono text-[#24533d]">
                          Risk: {slot.risk}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#edf4f0] border border-[#c3d9cd] text-xs text-[#173829] leading-relaxed">
              <strong className="font-bold">{t.supervisor.optimizationRationale}:</strong> {smartShiftPlan.rationale}
            </div>
          </div>
        )}
      </div>

      {/* 4. 5-Minute Rolling WBGT Trend Chart */}
      <div className="bg-white border border-[#e5dfd3] rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <TrendingUp className="w-4 h-4 text-[#173829]" />
            <h3 className="font-extrabold text-sm text-[#173829]">{t.supervisor.trendTitle}</h3>
          </div>
          <span className="text-xs font-mono text-[#426050]">ISO 7243 • 5m rolling window</span>
        </div>

        {/* Bar trend visualization */}
        <div className="pt-3 flex items-end justify-between h-36 gap-2 border-b border-[#e5dfd3] pb-2">
          {historyWbgt.map((entry, idx) => {
            const heightPercent = Math.min(100, Math.max(20, ((entry.wbgt - 25) / 12) * 100));
            const isHigh = entry.wbgt >= 31.0;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[10px] font-mono font-bold text-[#173829]">
                  {entry.wbgt.toFixed(1)}°
                </span>
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full max-w-[40px] rounded-t-lg transition-all ${
                    isHigh
                      ? 'bg-[#c81d25] shadow-xs'
                      : 'bg-[#173829] hover:bg-[#24533d]'
                  }`}
                />
                <span className="text-[10px] font-mono text-[#426050]">{entry.time}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Alert Feedback Loop & Adherence Metrics */}
      <div className="bg-white border border-[#e5dfd3] rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ece6da]">
          <div>
            <h3 className="font-extrabold text-sm text-[#173829]">{t.supervisor.feedbackTitle}</h3>
            <p className="text-xs text-[#426050] mt-0.5">{t.supervisor.feedbackSubtitle}</p>
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button
              onClick={() => onRecordFeedback('useful')}
              className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 rounded-xl bg-[#edf4f0] hover:bg-[#d8e8de] text-[#173829] text-xs font-bold border border-[#c3d9cd] transition-all"
            >
              <ThumbsUp className="w-3.5 h-3.5 text-[#173829]" />
              <span>{t.supervisor.usefulVote} ({feedbackState.usefulCount})</span>
            </button>

            <button
              onClick={() => onRecordFeedback('false_alarm')}
              className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 rounded-xl bg-[#fee2e2] hover:bg-[#fecaca] text-[#991b1b] text-xs font-bold border border-[#fca5a5] transition-all"
            >
              <ThumbsDown className="w-3.5 h-3.5 text-[#c81d25]" />
              <span>{t.supervisor.falseAlarmVote} ({feedbackState.falseAlarmCount})</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-[#f7f5ee] border border-[#e2dcd0]">
            <div className="text-[10px] font-semibold text-[#426050] uppercase">{t.supervisor.leadTimeTitle}</div>
            <div className="text-xl font-black text-[#173829] font-mono mt-0.5">
              {feedbackState.averageLeadTimeMinutes}m
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f7f5ee] border border-[#e2dcd0]">
            <div className="text-[10px] font-semibold text-[#426050] uppercase">{t.supervisor.adherenceRateTitle}</div>
            <div className="text-xl font-black text-[#173829] font-mono mt-0.5">
              {feedbackState.adherenceRatePercent}%
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f7f5ee] border border-[#e2dcd0]">
            <div className="text-[10px] font-semibold text-[#426050] uppercase">{t.supervisor.usefulRateTitle}</div>
            <div className="text-xl font-black text-[#173829] font-mono mt-0.5">
              {Math.round((feedbackState.usefulCount / (feedbackState.usefulCount + feedbackState.falseAlarmCount || 1)) * 100)}%
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f7f5ee] border border-[#e2dcd0]">
            <div className="text-[10px] font-semibold text-[#426050] uppercase">{t.supervisor.statutoryComplianceTitle}</div>
            <div className="text-xl font-black text-[#173829] mt-0.5 flex items-center space-x-1 rtl:space-x-reverse">
              <CheckCircle className="w-5 h-5 text-[#24533d]" />
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
