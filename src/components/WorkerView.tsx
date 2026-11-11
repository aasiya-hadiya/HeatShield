import React, { useState, useEffect } from 'react';
import {
  RiskEvaluation,
  GeminiHeatAdvice,
  SupportedLanguage,
} from '../types';
import { RiskCard } from './RiskCard';
import { MultilingualAlert } from './MultilingualAlert';
import {
  GlassWater,
  Clock,
  HeartHandshake,
  AlertOctagon,
  ShieldCheck,
  Lock,
  X,
  UserCheck,
  Activity,
} from 'lucide-react';
import { AppLocale, UI_TRANSLATIONS } from '../utils/i18n';

interface WorkerViewProps {
  evaluation: RiskEvaluation;
  advice: GeminiHeatAdvice;
  currentLang: SupportedLanguage;
  onChangeLanguage: (lang: SupportedLanguage) => void;
  onOpenWhyAlert: () => void;
  symptoms: string[];
  onToggleSymptom: (symptom: string) => void;
  isNewWorker: boolean;
  onToggleNewWorker: (val: boolean) => void;
  isAiLoading: boolean;
  locale?: AppLocale;
}

export const WorkerView: React.FC<WorkerViewProps> = ({
  evaluation,
  advice,
  currentLang,
  onChangeLanguage,
  onOpenWhyAlert,
  symptoms,
  onToggleSymptom,
  isNewWorker,
  onToggleNewWorker,
  isAiLoading,
  locale = 'en',
}) => {
  const t = UI_TRANSLATIONS[locale];

  const availableSymptoms = [
    {
      id: 'dizziness',
      label: locale === 'ar' ? 'دوخة أو عدم اتزان' : 'Dizziness or lightheadedness',
    },
    {
      id: 'headache',
      label: locale === 'ar' ? 'صداع نابض مستمر' : 'Throbbing headache',
    },
    {
      id: 'nausea',
      label: locale === 'ar' ? 'غثيان أو اضطراب معدة' : 'Nausea or vomiting',
    },
    {
      id: 'cramps',
      label: locale === 'ar' ? 'تقلصات عضلية شديدة' : 'Heavy muscle cramps',
    },
  ];

  // Hydration tracker state
  const [cupsLogged, setCupsLogged] = useState(3);
  const [breakTimerSeconds, setBreakTimerSeconds] = useState(18 * 60);
  const [showSosModal, setShowSosModal] = useState(false);
  const [showDataLedger, setShowDataLedger] = useState(false);
  const [buddyCheckCount, setBuddyCheckCount] = useState(2);
  const [justCheckedBuddy, setJustCheckedBuddy] = useState(false);

  // Countdown timer for next break
  useEffect(() => {
    const interval = setInterval(() => {
      setBreakTimerSeconds((prev) => (prev > 0 ? prev - 1 : 20 * 60));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleBuddyCheck = () => {
    setBuddyCheckCount((prev) => prev + 1);
    setJustCheckedBuddy(true);
    setTimeout(() => setJustCheckedBuddy(false), 3000);
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

      {/* 3. Hydration & Rest Break Guidance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hydration Tracker */}
        <div className="bg-white border border-[#e5dfd3] rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
              <div className="p-2.5 rounded-xl bg-[#edf4f0] text-[#173829]">
                <GlassWater className="w-5 h-5 text-[#173829]" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#173829]">{t.worker.hydrationTitle}</h3>
                <p className="text-xs text-[#426050]">{t.worker.hydrationTarget}</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#edf4f0] text-[#173829] border border-[#c3d9cd]">
              {cupsLogged} / 8 {t.worker.cupsLogged}
            </span>
          </div>

          {/* Hydration visual indicators */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse my-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-3 rounded-full transition-all ${
                  i < cupsLogged ? 'bg-[#173829] shadow-xs' : 'bg-[#eae4d5]'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#ece6da]">
            <span className="text-xs text-[#426050]">
              {t.worker.totalLogged}: <strong className="text-[#173829] font-mono text-sm">{cupsLogged * 250}</strong> {locale === 'ar' ? 'مل' : 'ml'}
            </span>
            <button
              onClick={() => setCupsLogged((c) => Math.min(12, c + 1))}
              className="px-4 py-2 rounded-xl bg-[#173829] hover:bg-[#24533d] text-[#f7f5ee] font-bold text-xs transition-colors shadow-xs"
            >
              + {t.worker.addCup}
            </button>
          </div>
        </div>

        {/* Work / Rest Ratio & Countdown Timer */}
        <div className="bg-white border border-[#e5dfd3] rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
              <div className="p-2.5 rounded-xl bg-[#edf4f0] text-[#173829]">
                <Clock className="w-5 h-5 text-[#173829]" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#173829]">{t.worker.workRestTitle}</h3>
                <p className="text-xs text-[#426050]">{t.worker.workRestDesc}</p>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#edf4f0] text-[#173829] border border-[#c3d9cd]">
              {evaluation.workRestRatio || evaluation.safeAction}
            </span>
          </div>

          <div className="bg-[#f7f5ee] rounded-xl p-3.5 border border-[#e2dcd0] my-3 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#426050]">
                {t.worker.nextCoolingBreak}
              </div>
              <div className="text-2xl font-black text-[#173829] font-mono mt-0.5">
                {formatTimer(breakTimerSeconds)}
              </div>
            </div>
            <button
              onClick={() => setBreakTimerSeconds(20 * 60)}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#eae4d5] border border-[#d8d0bf] text-[#173829] text-xs font-bold transition-all shadow-xs"
            >
              {t.worker.startBreakNow}
            </button>
          </div>

          <div className="text-[11px] text-[#426050] leading-relaxed">
            {locale === 'ar'
              ? 'موصى به بموجب معايير السلامة المهنية بدبي: الاستراحة في خيمة مظللة ومكيفة مع تهوية ميكانيكية.'
              : 'ISO 7243 compliance: Cooling breaks must be taken in mechanically air-conditioned or shaded welfare units.'}
          </div>
        </div>
      </div>

      {/* 4. Innovation 2: "Check In on a Teammate" (Buddy Check) & Innovation 4: Acclimatization Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Buddy System Card */}
        <div className="bg-white border border-[#e5dfd3] rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-2.5 rtl:space-x-reverse mb-3">
            <div className="p-2.5 rounded-xl bg-[#edf4f0] text-[#173829]">
              <HeartHandshake className="w-5 h-5 text-[#173829]" />
            </div>
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <h3 className="font-bold text-sm text-[#173829]">{t.worker.buddyTitle}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#edf4f0] text-[#173829] border border-[#c3d9cd]">
                  {t.worker.buddyBadge}
                </span>
              </div>
              <p className="text-xs text-[#426050]">{t.worker.buddyDesc}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f7f5ee] border border-[#e2dcd0] mb-3 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#DDD4C3] bg-white shrink-0 shadow-xs">
              <img
                src="/assets/images/dubai_worker_3d_1794411980911.jpg"
                alt="Teammate avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#426050]">{t.worker.assignedBuddy}:</span>
                <strong className="text-[#173829] font-bold font-sans">
                  {locale === 'ar' ? 'راشد كومار (سقالات ب)' : 'Rashid Kumar (Crew B)'}
                </strong>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#426050]">{t.worker.checksCompletedToday}:</span>
                <span className="font-mono font-bold text-[#173829] bg-white px-2 py-0.5 rounded-md border border-[#d8d0bf]">
                  {buddyCheckCount} {locale === 'ar' ? 'فحوصات' : 'checks'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleBuddyCheck}
            disabled={justCheckedBuddy}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 rtl:space-x-reverse transition-all shadow-xs ${
              justCheckedBuddy
                ? 'bg-[#24533d] text-white'
                : 'bg-[#173829] hover:bg-[#24533d] text-[#f7f5ee]'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>
              {justCheckedBuddy
                ? locale === 'ar'
                  ? 'تم تسجيل الفحص بنجاح ✓'
                  : 'Buddy Check Logged ✓'
                : t.worker.checkBuddyButton}
            </span>
          </button>
        </div>

        {/* Acclimatization & New Worker Protection Card */}
        <div className="bg-white border border-[#e5dfd3] rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
              <div className="p-2.5 rounded-xl bg-[#edf4f0] text-[#173829]">
                <ShieldCheck className="w-5 h-5 text-[#173829]" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#173829]">{t.worker.acclimTitle}</h3>
                <p className="text-xs text-[#426050]">{t.worker.acclimDesc}</p>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f7f5ee] border border-[#e2dcd0] space-y-2 mb-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#426050]">{t.worker.statusLabel}:</span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                  isNewWorker
                    ? 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]'
                    : 'bg-[#edf4f0] text-[#173829] border-[#c3d9cd]'
                }`}
              >
                {isNewWorker ? t.worker.newWorker14Days : t.worker.fullyAcclimatized}
              </span>
            </div>

            <p className="text-[11px] text-[#426050] leading-relaxed">
              {isNewWorker
                ? locale === 'ar'
                  ? 'بروتوكول اليوم الأول إلى الرابع عشر: عتبة المخاطر منخفضة بمقدار درجتين، مع فترات راحة إضافية إلزامية لغير المعتادين على مناخ الخليج.'
                  : 'Days 1-14 protocol active: WBGT limit reduced by 2°C, with mandatory ramp-up rest breaks enforced.'
                : locale === 'ar'
                  ? 'تم استيفاء متطلبات التأقلم الكاملة (أكثر من 14 يوماً من العمل الميداني المستمر).'
                  : 'Full heat adaptation confirmed (>14 continuous days on Dubai sites).'}
            </p>
          </div>

          <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer text-xs text-[#173829] font-semibold bg-[#f7f5ee] p-2.5 rounded-xl border border-[#e2dcd0] hover:bg-[#eae4d5] transition-colors">
            <input
              type="checkbox"
              checked={isNewWorker}
              onChange={(e) => onToggleNewWorker(e.target.checked)}
              className="rounded text-[#173829] focus:ring-[#173829] w-4 h-4"
            />
            <span>{t.worker.toggleNewWorker}</span>
          </label>
        </div>
      </div>

      {/* 5. Innovation 3: Self-Report Early Heat Strain Symptoms */}
      <div className="bg-white border border-[#e5dfd3] rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-[#ece6da]">
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Activity className="w-4 h-4 text-[#c81d25]" />
              <h3 className="font-bold text-sm text-[#173829]">{t.worker.symptomsTitle}</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fee2e2] text-[#991b1b] border border-[#fecaca]">
                {t.worker.symptomsBadge}
              </span>
            </div>
            <p className="text-xs text-[#426050] mt-0.5">{t.worker.symptomsDesc}</p>
          </div>

          {symptoms.length > 0 && (
            <button
              onClick={() => setShowSosModal(true)}
              className="flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 rounded-xl bg-[#c81d25] hover:bg-[#a5151c] text-white text-xs font-bold transition-all shadow-xs animate-pulse"
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>{t.worker.alertMedic}</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          {availableSymptoms.map((symp) => {
            const isChecked = symptoms.includes(symp.id);
            return (
              <button
                key={symp.id}
                onClick={() => onToggleSymptom(symp.id)}
                className={`p-3 rounded-xl border text-left rtl:text-right text-xs transition-all flex items-start space-x-2 rtl:space-x-reverse ${
                  isChecked
                    ? 'bg-[#fee2e2] border-[#f87171] text-[#991b1b] font-bold shadow-xs'
                    : 'bg-[#f7f5ee] border-[#e2dcd0] text-[#173829] hover:bg-[#eae4d5]'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                    isChecked
                      ? 'bg-[#c81d25] border-[#c81d25] text-white'
                      : 'border-[#b5ac9a] bg-white'
                  }`}
                >
                  {isChecked && '✓'}
                </span>
                <span className="leading-snug">{symp.label}</span>
              </button>
            );
          })}
        </div>

        {symptoms.length > 0 && (
          <div className="mt-4 p-3.5 rounded-xl bg-[#fee2e2] border border-[#fca5a5] flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-[#991b1b] font-bold">
              <AlertOctagon className="w-4 h-4 text-[#c81d25] shrink-0" />
              <span>
                {locale === 'ar'
                  ? 'تم رصد أعراض إجهاد حراري: تم رفع مستوى الخطر آلياً وإبلاغ مشرف الموقع.'
                  : 'Heat strain symptoms detected: Risk level has been elevated automatically.'}
              </span>
            </div>
            <button
              onClick={() => onToggleSymptom('none')}
              className="text-xs text-[#991b1b] underline hover:text-black font-semibold"
            >
              {locale === 'ar' ? 'مسح الأعراض' : 'Clear symptoms'}
            </button>
          </div>
        )}
      </div>

      {/* 6. Privacy & Data Ledger Link */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#e5dfd3] shadow-xs">
        <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-[#426050]">
          <Lock className="w-4 h-4 text-[#173829]" />
          <span>{t.worker.privacyLedgerText}</span>
        </div>
        <button
          onClick={() => setShowDataLedger(true)}
          className="text-xs text-[#173829] underline hover:text-[#24533d] font-bold"
        >
          {t.worker.viewDataLedger}
        </button>
      </div>

      {/* SOS / On-Site Medic Dispatch Modal */}
      {showSosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#e5dfd3] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e5dfd3]">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-[#c81d25]">
                <AlertOctagon className="w-6 h-6 animate-pulse" />
                <h3 className="font-black text-lg text-[#173829]">{t.worker.sosModalTitle}</h3>
              </div>
              <button
                onClick={() => setShowSosModal(false)}
                className="text-[#6c8577] hover:text-[#173829] p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#426050] leading-relaxed">
              {locale === 'ar'
                ? 'جاري إرسال إشعار فوري لمسعف الموقع الميداني ومسؤول السلامة مع تحديد موقعك الحالي عبر GPS.'
                : 'Emergency dispatch alert generated. On-site first-aider and site safety officer have been alerted with your GPS location.'}
            </p>

            <div className="bg-[#f7f5ee] p-3.5 rounded-xl border border-[#e2dcd0] space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-[#426050]">{locale === 'ar' ? 'الموقع' : 'Location'}:</span>
                <strong className="text-[#173829]">{locale === 'ar' ? 'برج الخليج - الطابق 14' : 'Downtown Tower - Sector 4'}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#426050]">{locale === 'ar' ? 'رقم الطوارئ الميداني' : 'Site First-Aid'}:</span>
                <strong className="text-[#c81d25] font-mono font-black">998 (Dubai Ambulance) / 04-206-5555</strong>
              </div>
            </div>

            <button
              onClick={() => setShowSosModal(false)}
              className="w-full py-3 rounded-xl bg-[#173829] hover:bg-[#24533d] text-[#f7f5ee] font-bold text-xs shadow-md transition-colors"
            >
              {locale === 'ar' ? 'تأكيد وصول المساعدة وإغلاق' : 'Assistance Dispatched • Acknowledge'}
            </button>
          </div>
        </div>
      )}

      {/* Data Ledger Privacy Modal */}
      {showDataLedger && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-[#e5dfd3] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e5dfd3]">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-[#173829]">
                <Lock className="w-5 h-5" />
                <h3 className="font-bold text-base">{t.worker.dataLedgerModalTitle}</h3>
              </div>
              <button
                onClick={() => setShowDataLedger(false)}
                className="text-[#6c8577] hover:text-[#173829] p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#426050] leading-relaxed">
              {locale === 'ar'
                ? 'يلتزم نظام درع الحرارة الذكي بأعلى معايير حماية البيانات الشخصية المعتمدة في دولة الإمارات العربية المتحدة (قانون البيانات الاتحادي). جميع قياسات المستشعرات وسجلات الإرهاق مجهولة المصدر وتخزن محلياً.'
                : 'HeatShield AI complies with UAE Federal Data Protection regulations. All physiological strain telemetry and symptom disclosures are anonymized on-device and cannot be used for punitive employment metrics.'}
            </p>

            <div className="p-3 bg-[#f7f5ee] rounded-xl border border-[#e2dcd0] space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#426050]">Telemetry ID:</span>
                <span className="font-mono text-[#173829]">UAEPASS-ANON-7781</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#426050]">Encryption:</span>
                <span className="font-mono text-[#173829]">AES-256 (Local Storage Only)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#426050]">Zero-Tracking:</span>
                <span className="text-[#173829] font-bold">Enabled (No camera/mic tracking)</span>
              </div>
            </div>

            <button
              onClick={() => setShowDataLedger(false)}
              className="w-full py-2.5 rounded-xl bg-[#173829] hover:bg-[#24533d] text-[#f7f5ee] font-bold text-xs"
            >
              {locale === 'ar' ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
