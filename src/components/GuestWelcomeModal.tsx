import React, { useState } from 'react';
import { ShieldAlert, HardHat, Bike, Users, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Role } from '../types';
import { AppLocale, UI_TRANSLATIONS } from '../utils/i18n';
import { DubaiSkyline } from './DubaiSkyline';

interface GuestWelcomeModalProps {
  isOpen: boolean;
  onContinueAsGuest: (selectedRole: Role) => void;
  locale: AppLocale;
  onSetLocale: (locale: AppLocale) => void;
}

export const GuestWelcomeModal: React.FC<GuestWelcomeModalProps> = ({
  isOpen,
  onContinueAsGuest,
  locale,
  onSetLocale,
}) => {
  const [selectedRole, setSelectedRole] = useState<Role>('worker');
  const t = UI_TRANSLATIONS[locale];

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <div className="bg-[#FAF8F3] border-2 border-[#DDD4C3] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden my-auto">
        {/* Soft pastel ambient background blobs */}
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#EBF5F0] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-[#FEF7DA] blur-3xl pointer-events-none" />

        {/* Top bar: Two-Option Language Switcher */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D5]">
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-xs font-bold text-[#173829]">
            <Sparkles className="w-4 h-4 text-[#24533D]" />
            <span className="font-arabic-calligraphy text-sm">إمارة دبي • دولة الإمارات</span>
          </div>

          {/* Two-Option Language Switcher Buttons */}
          <div
            role="radiogroup"
            aria-label="Language selection"
            className="flex items-center bg-white p-1 rounded-2xl border border-[#DDD4C3] shadow-xs"
          >
            <button
              type="button"
              role="radio"
              aria-checked={locale === 'en'}
              onClick={() => onSetLocale('en')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 rtl:space-x-reverse ${
                locale === 'en'
                  ? 'bg-[#173829] text-[#FAF8F3] shadow-xs'
                  : 'text-[#4A6857] hover:text-[#173829]'
              }`}
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>

            <button
              type="button"
              role="radio"
              aria-checked={locale === 'ar'}
              onClick={() => onSetLocale('ar')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 rtl:space-x-reverse font-arabic-calligraphy ${
                locale === 'ar'
                  ? 'bg-[#173829] text-[#FAF8F3] shadow-xs'
                  : 'text-[#4A6857] hover:text-[#173829]'
              }`}
            >
              <span>🇦🇪</span>
              <span>العربية</span>
            </button>
          </div>
        </div>

        {/* Brand Banner with 3D Worker Preview & Arabic Calligraphy */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left rtl:sm:text-right">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#173829] shadow-md bg-white shrink-0">
            <img
              src="/assets/images/dubai_worker_3d_1794411980911.jpg"
              alt="Dubai HSE Worker"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="font-arabic-calligraphy text-2xl sm:text-3xl font-black text-[#173829] tracking-tight leading-snug">
              دِرْعُ الحَرَارَةِ الذَّكِيّ
            </h1>
            <div className="text-sm font-bold text-[#24533D]">
              HeatShield AI • {t.guestModal.badge}
            </div>
            <p className="text-xs text-[#4A6857] mt-1 leading-relaxed">
              {t.guestModal.subtext}
            </p>
          </div>
        </div>

        {/* Instant Access Banner in Pastel Mint */}
        <div className="p-3.5 rounded-2xl bg-[#EBF5F0] border border-[#C5DFD0] space-y-1 text-xs text-[#173829]">
          <div className="flex items-center space-x-1.5 rtl:space-x-reverse font-black text-xs uppercase tracking-wide">
            <ShieldCheck className="w-4 h-4 text-[#173829]" />
            <span>{t.guestModal.instantAccess}</span>
          </div>
          <p className="text-[#385947] leading-relaxed">
            {t.guestModal.accessDesc}
          </p>
        </div>

        {/* Role Picker in Pastel Cards */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-[#173829] uppercase tracking-wider block">
            {t.guestModal.chooseRole}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Worker */}
            <button
              type="button"
              onClick={() => setSelectedRole('worker')}
              className={`p-3.5 rounded-2xl border text-left rtl:text-right flex flex-col justify-between transition-all ${
                selectedRole === 'worker'
                  ? 'bg-white border-2 border-[#173829] shadow-md ring-2 ring-[#173829]/10'
                  : 'bg-white/80 border-[#DDD4C3] hover:border-[#173829]/50'
              }`}
            >
              <div className="p-2 rounded-xl bg-[#EBF5F0] w-fit mb-2 text-[#173829]">
                <HardHat className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-sm text-[#173829]">{t.roles.worker}</div>
                <div className="text-[11px] text-[#4A6857] mt-0.5 leading-snug">
                  {locale === 'ar'
                    ? 'تنبيهات صوتية فورية، ترطيب، فحص الأعراض، ونداء الطوارئ'
                    : 'Multilingual voice alerts, hydration, symptoms & SOS'}
                </div>
              </div>
            </button>

            {/* Rider */}
            <button
              type="button"
              onClick={() => setSelectedRole('rider')}
              className={`p-3.5 rounded-2xl border text-left rtl:text-right flex flex-col justify-between transition-all ${
                selectedRole === 'rider'
                  ? 'bg-white border-2 border-[#173829] shadow-md ring-2 ring-[#173829]/10'
                  : 'bg-white/80 border-[#DDD4C3] hover:border-[#173829]/50'
              }`}
            >
              <div className="p-2 rounded-xl bg-[#EBF5F0] w-fit mb-2 text-[#173829]">
                <Bike className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-sm text-[#173829]">{t.roles.rider}</div>
                <div className="text-[11px] text-[#4A6857] mt-0.5 leading-snug">
                  {locale === 'ar'
                    ? 'مسار التبريد التنبؤي، 6 محطات استراحة وملاحة الخرائط'
                    : 'Cool-by routing & 6 Dubai rest stations with GPS'}
                </div>
              </div>
            </button>

            {/* Supervisor */}
            <button
              type="button"
              onClick={() => setSelectedRole('supervisor')}
              className={`p-3.5 rounded-2xl border text-left rtl:text-right flex flex-col justify-between transition-all ${
                selectedRole === 'supervisor'
                  ? 'bg-white border-2 border-[#173829] shadow-md ring-2 ring-[#173829]/10'
                  : 'bg-white/80 border-[#DDD4C3] hover:border-[#173829]/50'
              }`}
            >
              <div className="p-2 rounded-xl bg-[#EBF5F0] w-fit mb-2 text-[#173829]">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-sm text-[#173829]">{t.roles.supervisor}</div>
                <div className="text-[11px] text-[#4A6857] mt-0.5 leading-snug">
                  {locale === 'ar'
                    ? 'جدول الفرق الثلاثة، مخطط SmartShift، وتصدير تقرير CSV'
                    : '3 crews table, SmartShift AI schedule & CSV audit export'}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Dubai Skyline Accent Illustration */}
        <div className="pt-2 border-t border-[#E8E2D5]">
          <DubaiSkyline fillColor="#173829" accentColor="#2D5E46" height={50} />
        </div>

        {/* Large Continue Action Button (Heritage Dark Green) */}
        <button
          onClick={() => onContinueAsGuest(selectedRole)}
          className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse py-3.5 px-6 rounded-2xl bg-[#173829] hover:bg-[#24533D] text-[#FAF8F3] font-black text-sm shadow-lg shadow-[#173829]/20 transition-all transform active:scale-[0.99]"
        >
          <span>{t.guestModal.continueBtn}</span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </button>

        <p className="text-[11px] text-[#6C8D7B] text-center">
          {t.guestModal.roleNotice}
        </p>
      </div>
    </div>
  );
};
