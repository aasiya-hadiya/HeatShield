import React, { useState } from 'react';
import { Volume2, VolumeX, Globe, Sparkles, CheckCircle2 } from 'lucide-react';
import { GeminiHeatAdvice, SupportedLanguage } from '../types';
import { speakAlertText } from '../utils/speech';
import { AppLocale, UI_TRANSLATIONS } from '../utils/i18n';

interface MultilingualAlertProps {
  advice: GeminiHeatAdvice;
  currentLang: SupportedLanguage;
  onChangeLanguage: (lang: SupportedLanguage) => void;
  isAiLoading?: boolean;
  locale?: AppLocale;
}

const LANGUAGE_LABELS: Record<SupportedLanguage, { label: string; native: string }> = {
  ar: { label: 'Arabic', native: 'العربية (دبي)' },
  en: { label: 'English', native: 'English' },
  hi: { label: 'Hindi', native: 'हिन्दी' },
  ml: { label: 'Malayalam', native: 'മലയാളം' },
  kn: { label: 'Kannada', native: 'ಕನ್ನಡ' },
  ur: { label: 'Urdu', native: 'اردو' },
};

export const MultilingualAlert: React.FC<MultilingualAlertProps> = ({
  advice,
  currentLang,
  onChangeLanguage,
  isAiLoading = false,
  locale = 'en',
}) => {
  const t = UI_TRANSLATIONS[locale];
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Authenticated Dubai Arabic fallback phrased appropriately for Dubai Municipality & MoHRE guidelines
  const dubaiArabicAlert =
    advice.alert_text.ar ||
    'خطر الإجهاد الحراري في تصاعد. يرجى التوقف عن العمل المكشوف، التوجه إلى منطقة مظللة ومكيفة، وتناول الماء البارد فوراً.';

  const activeAlertText =
    currentLang === 'ar'
      ? dubaiArabicAlert
      : advice.alert_text[currentLang] || advice.alert_text.en || 'Heat risk is elevated. Take shaded breaks and drink cold water.';

  const isRtl = currentLang === 'ar' || currentLang === 'ur';

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      return;
    }

    speakAlertText(
      activeAlertText,
      currentLang,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  return (
    <section
      aria-label={t.alert.title}
      className="bg-white border border-[#e5dfd3] rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow space-y-4"
    >
      {/* Header with Language selector & Audio button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ece6da]">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-xs font-bold uppercase tracking-wider text-[#173829]">
            <Sparkles className="w-4 h-4 text-[#24533d]" />
            <span>{t.alert.title}</span>
          </div>
          {advice.source === 'gemini' ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#edf4f0] text-[#173829] border border-[#c3d9cd]">
              {t.alert.verified}
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#f5f2e9] text-[#426050] border border-[#d8d0bf]">
              {t.alert.deterministic}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          {/* Language Selector Dropdown */}
          <div className="relative flex items-center">
            <Globe className="w-3.5 h-3.5 text-[#24533d] absolute left-2.5 rtl:left-auto rtl:right-2.5 pointer-events-none" />
            <select
              aria-label="Select audio and alert language"
              value={currentLang}
              onChange={(e) => onChangeLanguage(e.target.value as SupportedLanguage)}
              className="bg-[#f7f5ee] border border-[#d8d0bf] text-[#173829] text-xs font-semibold rounded-xl pl-8 pr-7 rtl:pl-7 rtl:pr-8 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#173829] cursor-pointer"
            >
              {(Object.keys(LANGUAGE_LABELS) as SupportedLanguage[]).map((key) => (
                <option key={key} value={key}>
                  {LANGUAGE_LABELS[key].native} ({LANGUAGE_LABELS[key].label})
                </option>
              ))}
            </select>
          </div>

          {/* Audio Speaker Button (Heritage Green / UAE Red on playing) */}
          <button
            onClick={handleSpeak}
            aria-label={isSpeaking ? t.alert.stop : t.alert.listen}
            title={t.alert.listen}
            className={`flex items-center space-x-1.5 rtl:space-x-reverse px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              isSpeaking
                ? 'bg-[#c81d25] text-white shadow-md animate-pulse'
                : 'bg-[#173829] hover:bg-[#24533d] text-[#f7f5ee] shadow-sm'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#f7f5ee]" />}
            <span>{isSpeaking ? t.alert.stop : t.alert.listen}</span>
          </button>
        </div>
      </div>

      {/* Main Alert Banner Display */}
      <div
        dir={isRtl ? 'rtl' : 'ltr'}
        className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#173829] to-[#24533d] border border-[#173829] text-[#f7f5ee] relative shadow-inner"
      >
        <p className="text-base sm:text-lg font-bold leading-relaxed text-[#faf8f3] font-sans">
          "{activeAlertText}"
        </p>
        <div className="mt-2 text-[11px] text-[#c3d9cd] flex items-center justify-between flex-wrap gap-2">
          <span>{t.alert.clarityTarget}</span>
          <span className="font-arabic-calligraphy text-xs text-[#e2ebe5]">
            دِرْعُ الحَرَارَةِ الذَّكِيّ • صِحَّتُكُمْ أَوْلَوِيَّتُنَا
          </span>
        </div>
      </div>

      {/* Gemini AI Thermal Reasoning */}
      <div className="bg-[#f7f5ee] p-4 sm:p-5 rounded-xl border border-[#e5dfd3] space-y-3">
        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#173829] mb-1 flex items-center space-x-1.5 rtl:space-x-reverse">
            <span className="w-1.5 h-1.5 rounded-full bg-[#173829]" />
            <span>{t.alert.analysis}</span>
            {isAiLoading && (
              <span className="text-[10px] text-[#24533d] font-semibold animate-pulse">{t.alert.updatingGemini}</span>
            )}
          </h3>
          <p className="text-xs sm:text-sm text-[#2d4d3c] leading-relaxed font-sans">
            {locale === 'ar' && advice.explanation.includes('Calculated WBGT')
              ? `تم حساب مؤشر الحرارة الرطبة الكروية (WBGT) بناءً على درجة حرارة الجو، الرطوبة الساحلية في دبي، والحمل الحراري الإشعاعي المباشر. تم تعديل حدود السلامة تلقائياً لحماية العامل.`
              : advice.explanation}
          </p>
        </div>

        {/* 3 Recommended Safety Actions */}
        <div className="pt-3 border-t border-[#e2dcd0]">
          <div className="text-xs font-bold text-[#173829] mb-2">{t.alert.protocol}</div>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {advice.recommended_actions?.map((action, idx) => (
              <li
                key={idx}
                className="flex items-start space-x-2 rtl:space-x-reverse bg-white p-3 rounded-xl border border-[#e2dcd0] text-xs text-[#173829] shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4 text-[#24533d] shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">
                  {locale === 'ar' && idx === 0 && action.includes('Stop outdoor')
                    ? 'إيقاف العمل تحت أشعة الشمس فوراً والتوجه لنقطة استراحة مبردة.'
                    : locale === 'ar' && idx === 1
                    ? 'شرب 250 مل من الماء البارد أو محلول الأملاح كل 15-20 دقيقة.'
                    : action}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
