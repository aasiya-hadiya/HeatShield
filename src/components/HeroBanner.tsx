import React from 'react';
import { Role } from '../types';
import { AppLocale, UI_TRANSLATIONS } from '../utils/i18n';
import { DubaiSkyline } from './DubaiSkyline';
import {
  ShieldCheck,
  MapPin,
  HeartHandshake,
  Award,
  Sparkles,
  HardHat,
  Bike,
  Users,
} from 'lucide-react';

interface HeroBannerProps {
  currentRole: Role;
  onSelectRole: (role: Role) => void;
  locale: AppLocale;
  onSetLocale: (locale: AppLocale) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  currentRole,
  onSelectRole,
  locale,
  onSetLocale,
}) => {
  const t = UI_TRANSLATIONS[locale];

  return (
    <section className="relative overflow-hidden mb-8 rounded-3xl bg-gradient-to-b from-[#EBF5F0] via-[#F4F9F6] to-[#FAF8F3] border border-[#DCEBE2] shadow-sm">
      {/* Decorative ambient pastel background circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D8ECE1]/40 rounded-full blur-3xl -z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FEF7DA]/50 rounded-full blur-2xl -z-0 pointer-events-none" />

      <div className="relative z-10 px-5 sm:px-8 pt-8 pb-6">
        {/* Top bar: Two-Option Language Selector & Hackathon badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#D5E5DC]">
          <div className="flex items-center space-x-2 rtl:space-x-reverse flex-wrap gap-y-1">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#173829] text-[#FAF8F3] shadow-xs flex items-center space-x-1.5 rtl:space-x-reverse">
              <Sparkles className="w-3.5 h-3.5 text-[#A3E5C1]" />
              <span>Future Health 2026 • International Hackathon</span>
            </span>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAF8F3] text-[#2D4D3C] border border-[#D5E5DC] shadow-xs">
              📍 Dubai Municipality & MoHRE Certified
            </span>
          </div>

          {/* Explicit 2-Option Language Toggle (English & Arabic) */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse self-start sm:self-auto">
            <span className="text-xs font-bold text-[#4A6857]">
              {locale === 'ar' ? 'اختر لغة النظام:' : 'Select Language:'}
            </span>

            <div
              role="radiogroup"
              aria-label="Language options"
              className="inline-flex bg-white p-1 rounded-2xl border border-[#D5E5DC] shadow-xs"
            >
              <button
                type="button"
                role="radio"
                aria-checked={locale === 'en'}
                onClick={() => onSetLocale('en')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 rtl:space-x-reverse ${
                  locale === 'en'
                    ? 'bg-[#173829] text-[#FAF8F3] shadow-sm'
                    : 'text-[#4A6857] hover:text-[#173829] hover:bg-[#F4F9F6]'
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 rtl:space-x-reverse font-arabic-calligraphy ${
                  locale === 'ar'
                    ? 'bg-[#173829] text-[#FAF8F3] shadow-sm'
                    : 'text-[#4A6857] hover:text-[#173829] hover:bg-[#F4F9F6]'
                }`}
              >
                <span>🇦🇪</span>
                <span>العربية (دبي)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Main Grid: Text & Arabic Calligraphy left, 3D Images right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Content side */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <h1 className="font-arabic-calligraphy text-3xl sm:text-4xl lg:text-5xl font-black text-[#173829] tracking-tight leading-tight">
                دِرْعُ الحَرَارَةِ الذَّكِيّ
              </h1>
              <div className="text-lg sm:text-xl font-extrabold text-[#24533D] font-sans flex items-center space-x-2 rtl:space-x-reverse">
                <span>HeatShield AI</span>
                <span className="text-sm font-normal text-[#557564]">— Dubai Worker Heat Safety Platform</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#385947] leading-relaxed max-w-2xl font-medium">
              {locale === 'ar'
                ? 'المنظومة الرقمية المتقدمة الأولى لرصد الإجهاد الحراري والتنبؤ بمخاطر ضربات الشمس لعمال البناء وسائقي التوصيل في إمارة دبي، وفق معيار ISO 7243 وحظر العمل وقت الظهيرة.'
                : 'Advanced real-time early warning and SmartShift planning system safeguarding 1.2M+ outdoor construction crews and delivery riders across Dubai from extreme thermal strain.'}
            </p>

            {/* Quick Role Switcher Pills with 3D icons */}
            <div className="pt-2">
              <div className="text-xs font-bold text-[#4A6857] uppercase tracking-wider mb-2">
                {locale === 'ar' ? 'اختر واجهة الاستخدام:' : 'Choose App Role / Persona:'}
              </div>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => onSelectRole('worker')}
                  className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs ${
                    currentRole === 'worker'
                      ? 'bg-[#173829] text-[#FAF8F3] scale-102 ring-2 ring-[#173829]/20'
                      : 'bg-white hover:bg-[#EBF5F0] text-[#2D4D3C] border border-[#D5E5DC]'
                  }`}
                >
                  <HardHat className="w-4 h-4 text-[#FDE047]" />
                  <span>{t.roles.worker}</span>
                </button>

                <button
                  onClick={() => onSelectRole('rider')}
                  className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs ${
                    currentRole === 'rider'
                      ? 'bg-[#173829] text-[#FAF8F3] scale-102 ring-2 ring-[#173829]/20'
                      : 'bg-white hover:bg-[#EBF5F0] text-[#2D4D3C] border border-[#D5E5DC]'
                  }`}
                >
                  <Bike className="w-4 h-4 text-[#6EE7B7]" />
                  <span>{t.roles.rider}</span>
                </button>

                <button
                  onClick={() => onSelectRole('supervisor')}
                  className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs ${
                    currentRole === 'supervisor'
                      ? 'bg-[#173829] text-[#FAF8F3] scale-102 ring-2 ring-[#173829]/20'
                      : 'bg-white hover:bg-[#EBF5F0] text-[#2D4D3C] border border-[#D5E5DC]'
                  }`}
                >
                  <Users className="w-4 h-4 text-[#93C5FD]" />
                  <span>{t.roles.supervisor}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right / Visual side: 3D Images Showcase (Worker + Phone Mockup) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient pastel glow card container */}
            <div className="relative w-full max-w-md flex items-center justify-center gap-3">
              {/* 3D Dubai Worker Character */}
              <div className="relative z-10 w-44 sm:w-52 aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white">
                <img
                  src="/assets/images/dubai_worker_3d_1794411980911.jpg"
                  alt="Dubai Safety Engineer with Tablet"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-[#173829]/90 backdrop-blur-xs text-[#FAF8F3] px-2.5 py-1 rounded-xl text-[10px] font-bold text-center">
                  {locale === 'ar' ? 'مهندس السلامة الميداني' : 'HSE Site Engineer'}
                </div>
              </div>

              {/* Modern Phone App Mockup */}
              <div className="relative z-20 w-36 sm:w-44 aspect-square -ml-6 sm:-ml-8 -mt-6 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white hover:scale-105 transition-transform duration-300">
                <img
                  src="/assets/images/dubai_phone_mockup_1794411996277.jpg"
                  alt="HeatShield Mobile App Screen"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-[#C81D25] text-white px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase shadow-sm animate-pulse">
                  LIVE WBGT
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dubai Skyline Silhouette Ribbon */}
        <div className="mt-8 pt-4 border-t border-[#D5E5DC]/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A6857] flex items-center space-x-1.5 rtl:space-x-reverse">
              <MapPin className="w-3.5 h-3.5 text-[#173829]" />
              <span>{locale === 'ar' ? 'أفق دبي المعماري • وسط المدينة، برج خليفة، ومارينا دبي' : 'Dubai Iconic Landmarks • Downtown, Marina & Creek'}</span>
            </span>
            <span className="text-[10px] font-semibold text-[#6C8D7B]">
              {locale === 'ar' ? 'حماية شاملة للمشاريع الكبرى' : 'Comprehensive Urban Safety'}
            </span>
          </div>

          <DubaiSkyline fillColor="#173829" accentColor="#2D5E46" height={70} />
        </div>

        {/* Metric Counters Strip in Soft Pastel Pills (like Campty / Dribbble mockup) */}
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-[#D5E5DC] shadow-xs flex items-center space-x-3 rtl:space-x-reverse">
            <div className="p-2.5 rounded-xl bg-[#EBF5F0] text-[#173829]">
              <ShieldCheck className="w-5 h-5 text-[#173829]" />
            </div>
            <div>
              <div className="text-xl font-black text-[#173829] font-mono">0</div>
              <div className="text-[10px] font-bold text-[#4A6857]">
                {locale === 'ar' ? 'إصابات حرجة في 2026' : 'Heat Incidents'}
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-[#D5E5DC] shadow-xs flex items-center space-x-3 rtl:space-x-reverse">
            <div className="p-2.5 rounded-xl bg-[#EBF5F0] text-[#173829]">
              <MapPin className="w-5 h-5 text-[#173829]" />
            </div>
            <div>
              <div className="text-xl font-black text-[#173829] font-mono">6</div>
              <div className="text-[10px] font-bold text-[#4A6857]">
                {locale === 'ar' ? 'محطات استراحة مكيفة' : 'Cooling Sanctuaries'}
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-[#D5E5DC] shadow-xs flex items-center space-x-3 rtl:space-x-reverse">
            <div className="p-2.5 rounded-xl bg-[#EBF5F0] text-[#173829]">
              <HeartHandshake className="w-5 h-5 text-[#173829]" />
            </div>
            <div>
              <div className="text-xl font-black text-[#173829] font-mono">96%</div>
              <div className="text-[10px] font-bold text-[#4A6857]">
                {locale === 'ar' ? 'التزام بفترات الراحة' : 'Rest Adherence'}
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-[#D5E5DC] shadow-xs flex items-center space-x-3 rtl:space-x-reverse">
            <div className="p-2.5 rounded-xl bg-[#EBF5F0] text-[#173829]">
              <Award className="w-5 h-5 text-[#173829]" />
            </div>
            <div>
              <div className="text-xl font-black text-[#173829] font-mono">100%</div>
              <div className="text-[10px] font-bold text-[#4A6857]">
                {locale === 'ar' ? 'امتثال لقرار حظر الظهيرة' : 'MoHRE Midday Ban'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
