import React from 'react';
import { X, Calculator, AlertTriangle, CheckCircle } from 'lucide-react';
import { RiskEvaluation } from '../types';
import { AppLocale } from '../utils/i18n';

interface WhyAlertDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  evaluation: RiskEvaluation;
  locale?: AppLocale;
}

export const WhyAlertDrawer: React.FC<WhyAlertDrawerProps> = ({
  isOpen,
  onClose,
  evaluation,
  locale = 'en',
}) => {
  if (!isOpen) return null;

  const isAr = locale === 'ar';
  const {
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
    riskLevel,
    overrideReason,
  } = evaluation;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Why this alert mathematical derivation"
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity"
    >
      <div className="w-full max-w-lg bg-[#FAF8F3] border-l rtl:border-l-0 rtl:border-r border-[#DDD4C3] h-full flex flex-col shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="p-5 border-b border-[#E8E2D5] flex items-center justify-between sticky top-0 bg-[#FAF8F3]/95 backdrop-blur-md z-10">
          <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
            <div className="p-2.5 rounded-xl bg-[#EBF5F0] text-[#173829]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#173829]">
                {isAr ? 'الشفافية الحسابية: لماذا هذا التنبيه؟' : 'Mathematical Transparency: Why This Alert?'}
              </h3>
              <p className="text-xs text-[#4A6857]">
                {isAr ? 'اشتقاق خطوة بخطوة وفق ISO 7243 وStull 2011' : 'Deterministic derivation per ISO 7243 & Stull (2011)'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close why alert drawer"
            className="p-1.5 rounded-xl bg-white border border-[#DDD4C3] text-[#4A6857] hover:text-[#173829] hover:bg-[#EFE9DC] transition-colors shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 flex-1 text-xs text-[#2D4D3C]">
          {/* Override callout if present */}
          {overrideReason && (
            <div className="p-3.5 rounded-2xl bg-[#FEE2E2] border border-[#FCA5A5] flex items-start space-x-2.5 rtl:space-x-reverse text-[#991B1B]">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">
                  {isAr ? 'تعديل استثنائي للأمان (Override):' : 'Safety Override Active:'}
                </strong>
                <span>{overrideReason}</span>
              </div>
            </div>
          )}

          {/* Step 1: Stull Wet-Bulb Derivation */}
          <div className="bg-white p-4 rounded-2xl border border-[#DDD4C3] space-y-2 shadow-xs">
            <div className="font-bold text-[#173829] text-xs uppercase tracking-wider flex items-center justify-between">
              <span>{isAr ? 'الخطوة 1: حساب درجة الحرارة الرطبة (Stull 2011)' : 'Step 1: Wet-Bulb Temperature (Stull 2011)'}</span>
              <span className="font-mono text-[#173829] font-black">{wetBulb.toFixed(1)}°C</span>
            </div>
            <p className="text-[#4A6857] leading-relaxed">
              {isAr
                ? 'استخدام معادلة Stull (2011) البالستية ذات الدقة العالية للاشتقاق من درجة حرارة الهواء والرطوبة الساحلية في دبي.'
                : 'Calculated using Roland Stull (2011) high-precision empirical formulation for ambient air temp and relative humidity.'}
            </p>
            <div className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#E8E2D5] font-mono text-[11px] text-[#173829] break-all">
              T_wb = T*atan[0.151977*(RH+8.313659)^0.5] + atan(T+RH) - atan(RH-1.676331) + 0.00391838*RH^1.5*atan(0.023101*RH) - 4.686035
            </div>
            <div className="flex justify-between text-[11px] text-[#4A6857]">
              <span>T = {airTemp}°C</span>
              <span>RH = {humidity}%</span>
              <span>Result: Tw = {wetBulb.toFixed(2)}°C</span>
            </div>
          </div>

          {/* Step 2: ISO 7243 WBGT Calculation */}
          <div className="bg-white p-4 rounded-2xl border border-[#DDD4C3] space-y-2 shadow-xs">
            <div className="font-bold text-[#173829] text-xs uppercase tracking-wider flex items-center justify-between">
              <span>{isAr ? 'الخطوة 2: حساب مؤشر WBGT الإشعاعي' : 'Step 2: ISO 7243 WBGT Formulation'}</span>
              <span className="font-mono text-[#173829] font-black">{wbgt.toFixed(1)}°C</span>
            </div>
            <p className="text-[#4A6857] leading-relaxed">
              {globeTemp !== null
                ? 'Outdoor direct sun equation: WBGT = 0.7*Tw + 0.2*Tg + 0.1*Ta'
                : 'Estimated solar load equation: WBGT = 0.7*Tw + 0.3*Ta (+ solar delta)'}
            </p>
            <div className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#E8E2D5] font-mono text-[11px] text-[#173829]">
              WBGT = (0.7 × {wetBulb.toFixed(1)}) + (0.2 × {(globeTemp ?? airTemp).toFixed(1)}) + (0.1 × {airTemp.toFixed(1)}) = {wbgt.toFixed(1)}°C
            </div>
          </div>

          {/* Step 3: Threshold & Modifiers */}
          <div className="bg-white p-4 rounded-2xl border border-[#DDD4C3] space-y-2 shadow-xs">
            <div className="font-bold text-[#173829] text-xs uppercase tracking-wider">
              {isAr ? 'الخطوة 3: العتبة المعيارية والتعديلات الفسيولوجية' : 'Step 3: Base Threshold & Physiological Modifiers'}
            </div>
            <div className="space-y-1.5 pt-1 text-[11px]">
              <div className="flex justify-between py-1 border-b border-[#E8E2D5]">
                <span className="text-[#4A6857]">Base ISO 7243 limit ({workload}):</span>
                <span className="font-mono font-bold text-[#173829]">{baseThreshold.toFixed(1)}°C</span>
              </div>
              {heavyPPE && (
                <div className="flex justify-between py-1 border-b border-[#E8E2D5] text-[#C81D25]">
                  <span>Heavy / Impermeable PPE penalty:</span>
                  <span className="font-mono font-bold">-2.0°C</span>
                </div>
              )}
              {!acclimatized && (
                <div className="flex justify-between py-1 border-b border-[#E8E2D5] text-[#C81D25]">
                  <span>Unacclimatized worker penalty:</span>
                  <span className="font-mono font-bold">-1.5°C</span>
                </div>
              )}
              {isNewWorker && (
                <div className="flex justify-between py-1 border-b border-[#E8E2D5] text-[#C81D25]">
                  <span>New Worker (Days 1-14) protocol:</span>
                  <span className="font-mono font-bold">-2.0°C</span>
                </div>
              )}
              {exposureHours >= 4 && (
                <div className="flex justify-between py-1 border-b border-[#E8E2D5] text-[#D97706]">
                  <span>Prolonged shift exposure ({exposureHours}h):</span>
                  <span className="font-mono font-bold">-1.0°C</span>
                </div>
              )}
              <div className="flex justify-between py-1 font-bold text-xs text-[#173829] pt-1">
                <span>Final Adjusted Limit:</span>
                <span className="font-mono">{adjustedThreshold.toFixed(1)}°C</span>
              </div>
            </div>
          </div>

          {/* Step 4: Final Safety Margin & Level Classification */}
          <div className="bg-white p-4 rounded-2xl border border-[#DDD4C3] space-y-2 shadow-xs">
            <div className="font-bold text-[#173829] text-xs uppercase tracking-wider flex items-center justify-between">
              <span>{isAr ? 'الخطوة 4: هامش الأمان وتحديد مستوى الخطر' : 'Step 4: Safety Margin & Final Risk Level'}</span>
              <span className="font-black px-2.5 py-0.5 rounded-full text-[11px] bg-[#EBF5F0] text-[#173829] border border-[#C5DFD0]">
                {riskLevel}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#4A6857]">Safety Margin (Limit - WBGT):</span>
              <span className={`font-mono font-bold text-sm ${margin <= 0 ? 'text-[#C81D25]' : 'text-[#173829]'}`}>
                {margin > 0 ? `+${margin.toFixed(1)}` : margin.toFixed(1)}°C
              </span>
            </div>
            <p className="text-[#4A6857] text-[11px] leading-relaxed">
              {margin <= -1.5
                ? 'WBGT significantly exceeds limit. Mandatory work stoppage and cool-down cycle initiated.'
                : margin <= 0
                ? 'WBGT at or slightly exceeding threshold. 15-45 min cooling cycle triggered.'
                : margin <= 2.0
                ? 'Approaching threshold. Enhanced hydration & shade vigilance.'
                : 'Operating safely within thermal tolerance.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E8E2D5] bg-[#FAF8F3] sticky bottom-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#173829] hover:bg-[#24533D] text-[#FAF8F3] font-bold text-xs shadow-xs transition-colors"
          >
            {isAr ? 'إغلاق نافذة الشفافية' : 'Close Derivation'}
          </button>
        </div>
      </div>
    </div>
  );
};
