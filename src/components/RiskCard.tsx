import React from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Flame,
  AlertOctagon,
  HelpCircle,
  Sun,
  Droplets,
  Thermometer,
  Activity,
  ShieldBan,
} from 'lucide-react';
import { RiskEvaluation, RiskLevel } from '../types';
import { AppLocale, UI_TRANSLATIONS } from '../utils/i18n';

interface RiskCardProps {
  evaluation: RiskEvaluation;
  onOpenWhyAlert: () => void;
  locale?: AppLocale;
}

export const RiskCard: React.FC<RiskCardProps> = ({
  evaluation,
  onOpenWhyAlert,
  locale = 'en',
}) => {
  const t = UI_TRANSLATIONS[locale];
  const {
    airTemp,
    humidity,
    globeTemp,
    wetBulb,
    wbgt,
    workload,
    adjustedThreshold,
    margin,
    riskLevel,
    safeAction,
    isMiddayBanActive,
    overrideReason,
  } = evaluation;

  // Translated level names for Dubai Arabic
  const riskLabels: Record<RiskLevel, { en: string; ar: string }> = {
    Low: { en: 'LOW RISK', ar: 'مستوى خطر منخفض' },
    Moderate: { en: 'MODERATE RISK', ar: 'مستوى خطر معتدل' },
    High: { en: 'HIGH HEAT STRESS', ar: 'إجهاد حراري مرتفع' },
    Critical: { en: 'CRITICAL HEAT DANGER', ar: 'خطر حراري حرج جداً' },
  };

  const safeActionText =
    locale === 'ar'
      ? riskLevel === 'Critical'
        ? 'إيقاف العمل فوراً في الأماكن المكشوفة والتوجه إلى غرف التبريد والراحة'
        : riskLevel === 'High'
        ? 'استراحة تبريد إلزامية في الظل، شرب الماء، وتخفيف الأعمال الشاقة'
        : riskLevel === 'Moderate'
        ? 'شرب الماء باستمرار، مراقبة نشطة، وأخذ فترات راحة منتظمة في الظل'
        : 'مواصلة العمل الاعتيادي مع شرب الماء بانتظام كل 20 دقيقة'
      : safeAction;

  const renderRiskIcon = (level: RiskLevel) => {
    switch (level) {
      case 'Low':
        return <ShieldCheck className="w-8 h-8 text-[#173829]" aria-hidden="true" />;
      case 'Moderate':
        return <AlertTriangle className="w-8 h-8 text-[#b45309]" aria-hidden="true" />;
      case 'High':
        return <Flame className="w-8 h-8 text-[#c2410c]" aria-hidden="true" />;
      case 'Critical':
        return <AlertOctagon className="w-8 h-8 text-[#c81d25] animate-bounce" aria-hidden="true" />;
    }
  };

  // Cream & heritage green card styling
  const riskCardStyles: Record<RiskLevel, { bg: string; border: string; badge: string; text: string }> = {
    Low: {
      bg: 'bg-white',
      border: 'border-[#173829]/30',
      badge: 'bg-[#173829] text-[#f7f5ee] font-bold',
      text: 'text-[#173829]',
    },
    Moderate: {
      bg: 'bg-[#fffcf4]',
      border: 'border-[#f59e0b]/50',
      badge: 'bg-[#b45309] text-white font-bold',
      text: 'text-[#b45309]',
    },
    High: {
      bg: 'bg-[#fff8f2]',
      border: 'border-[#ea580c]/50',
      badge: 'bg-[#c2410c] text-white font-bold',
      text: 'text-[#c2410c]',
    },
    Critical: {
      bg: 'bg-[#fff5f5]',
      border: 'border-[#c81d25]/60',
      badge: 'bg-[#c81d25] text-white font-bold animate-pulse',
      text: 'text-[#c81d25]',
    },
  };

  const currentStyle = riskCardStyles[riskLevel];

  return (
    <section
      aria-label={t.riskCard.title}
      className={`relative overflow-hidden rounded-3xl border-2 transition-all p-5 sm:p-7 ${currentStyle.bg} ${currentStyle.border} shadow-md`}
    >
      {/* UAE Midday Ban Emergency Header Banner */}
      {isMiddayBanActive && (
        <div className="mb-4 -mt-2 -mx-2 px-4 py-3 bg-[#c81d25] text-white rounded-2xl flex items-center justify-between border border-[#a1141b] shadow-sm">
          <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
            <ShieldBan className="w-6 h-6 text-yellow-300 shrink-0" />
            <div>
              <p className="font-extrabold text-sm uppercase tracking-wide">
                {t.riskCard.middayBanTitle}
              </p>
              <p className="text-xs text-red-100 font-medium">
                {t.riskCard.middayBanDesc}
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block px-2.5 py-1 bg-black/30 rounded-lg text-xs font-mono font-bold text-white">
            {t.status.legalStop}
          </span>
        </div>
      )}

      {/* Primary Level Indicator & WBGT Gauge */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-5 border-b border-[#e5dfd3]">
        <div className="flex items-start sm:items-center space-x-4 rtl:space-x-reverse">
          <div className="p-3.5 rounded-2xl bg-[#f7f5ee] border border-[#d8d0bf] shadow-inner">
            {renderRiskIcon(riskLevel)}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-lg text-xs uppercase tracking-wider ${currentStyle.badge}`}>
                {riskLabels[riskLevel][locale]}
              </span>
              {overrideReason && (
                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#fef3c7] text-[#92400e] border border-[#f59e0b]/40">
                  {t.riskCard.overrideActive}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#173829] mt-2 tracking-tight leading-snug">
              {safeActionText}
            </h2>
            {overrideReason && (
              <p className="text-xs text-[#b45309] mt-1 font-semibold">{overrideReason}</p>
            )}
          </div>
        </div>

        {/* WBGT Metric Gauge in Poster Heritage Green */}
        <div className="flex items-center space-x-6 rtl:space-x-reverse bg-[#f7f5ee] px-6 py-4 rounded-2xl border border-[#d8d0bf] self-start lg:self-auto shadow-xs">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#426050]">
              {t.riskCard.estimatedWbgt}
            </div>
            <div className="flex items-baseline space-x-1 rtl:space-x-reverse">
              <span className="text-3xl sm:text-4xl font-black font-mono text-[#173829]">
                {wbgt.toFixed(1)}
              </span>
              <span className="text-sm font-bold text-[#24533d]">°C</span>
            </div>
          </div>

          <div className="h-10 w-px bg-[#d8d0bf]" />

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#426050]">
              {t.riskCard.safetyMargin}
            </div>
            <div className="flex items-baseline space-x-1 rtl:space-x-reverse">
              <span
                className={`text-xl font-black font-mono ${
                  margin >= 0 ? 'text-[#173829]' : 'text-[#c81d25]'
                }`}
              >
                {margin > 0 ? `+${margin.toFixed(1)}` : margin.toFixed(1)}
              </span>
              <span className="text-xs text-[#24533d]">°C</span>
            </div>
            <div className="text-[10px] text-[#6c8577]">
              {t.riskCard.vsLimit} {adjustedThreshold}°C
            </div>
          </div>
        </div>
      </div>

      {/* Sensor & Environmental Factors Grid */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#f7f5ee] p-3.5 rounded-2xl border border-[#e5dfd3]">
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-xs text-[#426050] mb-1 font-semibold">
            <Thermometer className="w-3.5 h-3.5 text-orange-600" />
            <span>{t.riskCard.airTemp}</span>
          </div>
          <div className="text-lg font-black font-mono text-[#173829]">{airTemp.toFixed(1)}°C</div>
        </div>

        <div className="bg-[#f7f5ee] p-3.5 rounded-2xl border border-[#e5dfd3]">
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-xs text-[#426050] mb-1 font-semibold">
            <Droplets className="w-3.5 h-3.5 text-cyan-600" />
            <span>{t.riskCard.relHumidity}</span>
          </div>
          <div className="text-lg font-black font-mono text-[#173829]">{humidity}%</div>
        </div>

        <div className="bg-[#f7f5ee] p-3.5 rounded-2xl border border-[#e5dfd3]">
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-xs text-[#426050] mb-1 font-semibold">
            <Sun className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.riskCard.globeTemp}</span>
          </div>
          <div className="text-lg font-black font-mono text-[#173829]">{globeTemp.toFixed(1)}°C</div>
        </div>

        <div className="bg-[#f7f5ee] p-3.5 rounded-2xl border border-[#e5dfd3]">
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-xs text-[#426050] mb-1 font-semibold">
            <Activity className="w-3.5 h-3.5 text-[#173829]" />
            <span>{t.riskCard.stullWetBulb}</span>
          </div>
          <div className="text-lg font-black font-mono text-[#173829]">{wetBulb.toFixed(1)}°C</div>
        </div>
      </div>

      {/* Thermal Drivers & Why This Alert Trigger */}
      <div className="mt-4 pt-4 border-t border-[#e5dfd3] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center flex-wrap gap-2 text-[#24533d]">
          <span className="font-bold text-[#173829]">{t.riskCard.drivers}</span>
          <span className="px-2.5 py-1 rounded-lg bg-[#f0ece1] border border-[#d8d0bf] font-medium text-[#173829]">
            {locale === 'ar' ? 'الجهد البدني:' : 'Workload:'} {workload} ({adjustedThreshold}°C)
          </span>
          {globeTemp - airTemp > 2 && (
            <span className="px-2.5 py-1 rounded-lg bg-[#fef3c7] text-[#92400e] border border-[#f59e0b]/40 font-semibold">
              +{Number((globeTemp - airTemp).toFixed(1))}°C {locale === 'ar' ? 'حمل إشعاعي شمسي' : 'Solar Radiation'}
            </span>
          )}
          {humidity > 55 && (
            <span className="px-2.5 py-1 rounded-lg bg-[#e0f2fe] text-[#0369a1] border border-[#0284c7]/30 font-semibold">
              {locale === 'ar' ? 'رطوبة مرتفعة تعيق تبخر العرق' : 'High Humidity Impairs Evaporation'}
            </span>
          )}
        </div>

        <button
          onClick={onOpenWhyAlert}
          aria-label={t.riskCard.whyAlert}
          className="flex items-center space-x-1.5 rtl:space-x-reverse px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#f0ece1] text-[#173829] border border-[#d8d0bf] transition-colors shrink-0 self-start sm:self-auto font-bold shadow-xs"
        >
          <HelpCircle className="w-3.5 h-3.5 text-[#24533d]" />
          <span>{t.riskCard.whyAlert}</span>
        </button>
      </div>
    </section>
  );
};
