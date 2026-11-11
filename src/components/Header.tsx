import React from 'react';
import {
  ShieldAlert,
  HardHat,
  Bike,
  Users,
  Sliders,
  BookOpen,
  TrendingUp,
  Radio,
  Clock,
} from 'lucide-react';
import { Role } from '../types';
import { AppLocale, UI_TRANSLATIONS } from '../utils/i18n';

interface HeaderProps {
  currentRole: Role;
  onSelectRole: (role: Role) => void;
  isLiveMode: boolean;
  isMiddayBanActive: boolean;
  locale: AppLocale;
  onSetLocale: (locale: AppLocale) => void;
  onOpenDemoControls: () => void;
  onOpenEvidence: () => void;
  onOpenImpact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onSelectRole,
  isLiveMode,
  isMiddayBanActive,
  locale,
  onSetLocale,
  onOpenDemoControls,
  onOpenEvidence,
  onOpenImpact,
}) => {
  const t = UI_TRANSLATIONS[locale];

  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#E8E2D5] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          {/* Brand Logo & Title with Arabic Calligraphy & Heritage Green */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-[#173829] text-white shadow-md shadow-[#173829]/20 border border-[#24533D]/40">
              <ShieldAlert className="w-5 h-5 text-[#FAF8F3]" />
              {/* UAE Crimson red accent dot */}
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#C81D25] border-2 border-[#FAF8F3]" />
            </div>

            <div>
              <div className="flex items-baseline flex-wrap gap-x-2 gap-y-0.5">
                <span className="font-arabic-calligraphy text-xl sm:text-2xl font-black text-[#173829] tracking-tight">
                  دِرْعُ الحَرَارَةِ الذَّكِيّ
                </span>
                <span className="text-[#557564] text-xs font-semibold font-sans tracking-wide">
                  HeatShield AI
                </span>
              </div>
              <p className="text-[11px] text-[#4A6857] hidden md:block font-medium">
                {locale === 'ar'
                  ? 'منظومة حماية العمال وسائقي التوصيل من الإجهاد الحراري • إمارة دبي'
                  : 'Dubai Municipal Heat Risk & SmartShift Early Warning Platform'}
              </p>
            </div>
          </div>

          {/* Desktop App Role Switcher in Pastel Sage Container */}
          <nav
            aria-label="Role selector"
            className="hidden md:flex items-center bg-[#EBF3EE] p-1.5 rounded-2xl border border-[#D5E5DC]"
          >
            <button
              onClick={() => onSelectRole('worker')}
              className={`flex items-center space-x-2 rtl:space-x-reverse px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentRole === 'worker'
                  ? 'bg-[#173829] text-[#FAF8F3] shadow-xs'
                  : 'text-[#2D4D3C] hover:text-[#173829] hover:bg-[#DDECE4]'
              }`}
            >
              <HardHat className="w-4 h-4" />
              <span>{t.roles.worker}</span>
            </button>

            <button
              onClick={() => onSelectRole('rider')}
              className={`flex items-center space-x-2 rtl:space-x-reverse px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentRole === 'rider'
                  ? 'bg-[#173829] text-[#FAF8F3] shadow-xs'
                  : 'text-[#2D4D3C] hover:text-[#173829] hover:bg-[#DDECE4]'
              }`}
            >
              <Bike className="w-4 h-4" />
              <span>{t.roles.rider}</span>
            </button>

            <button
              onClick={() => onSelectRole('supervisor')}
              className={`flex items-center space-x-2 rtl:space-x-reverse px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentRole === 'supervisor'
                  ? 'bg-[#173829] text-[#FAF8F3] shadow-xs'
                  : 'text-[#2D4D3C] hover:text-[#173829] hover:bg-[#DDECE4]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{t.roles.supervisor}</span>
            </button>
          </nav>

          {/* Language Selector: Explicit Two Options (English & Arabic) */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div
              role="group"
              aria-label="Language selection"
              className="flex items-center bg-[#EFE9DC] p-1 rounded-2xl border border-[#DDD4C3] shadow-inner"
            >
              <button
                type="button"
                onClick={() => onSetLocale('en')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 rtl:space-x-reverse ${
                  locale === 'en'
                    ? 'bg-[#173829] text-[#FAF8F3] shadow-sm'
                    : 'text-[#4A6857] hover:text-[#173829] hover:bg-[#E4DDCF]'
                }`}
              >
                <span className="text-sm">🇬🇧</span>
                <span>English</span>
              </button>

              <button
                type="button"
                onClick={() => onSetLocale('ar')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 rtl:space-x-reverse font-arabic-calligraphy ${
                  locale === 'ar'
                    ? 'bg-[#173829] text-[#FAF8F3] shadow-sm'
                    : 'text-[#4A6857] hover:text-[#173829] hover:bg-[#E4DDCF]'
                }`}
              >
                <span className="text-sm">🇦🇪</span>
                <span>العربية</span>
              </button>
            </div>

            {/* Live / Simulated Indicator */}
            <div
              className={`hidden sm:flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 rounded-2xl text-xs font-bold border ${
                isLiveMode
                  ? 'bg-[#EBF5F0] text-[#173829] border-[#B8DFC8]'
                  : 'bg-[#F4EFE6] text-[#4A6857] border-[#DDD4C3]'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${isLiveMode ? 'animate-pulse text-[#173829]' : 'text-[#7A9887]'}`} />
              <span>{isLiveMode ? t.status.live : t.status.simulated}</span>
            </div>

            {/* Midday Ban Warning Pill */}
            {isMiddayBanActive && (
              <div
                title="UAE Legal Midday Ban active (12:30 - 15:00)"
                className="hidden xl:flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 rounded-2xl text-xs font-bold bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5] animate-pulse"
              >
                <Clock className="w-3.5 h-3.5 text-[#C81D25]" />
                <span>{locale === 'ar' ? 'حظر الظهيرة مفعّل' : 'MIDDAY BAN ACTIVE'}</span>
              </div>
            )}

            {/* Quick Modals */}
            <button
              onClick={onOpenImpact}
              title={t.nav.impact}
              className="p-2.5 rounded-2xl bg-white text-[#2D4D3C] hover:bg-[#EFE9DC] border border-[#DDD4C3] text-xs hidden lg:flex items-center space-x-1.5 rtl:space-x-reverse shadow-xs"
            >
              <TrendingUp className="w-4 h-4 text-[#173829]" />
              <span>{t.nav.impact}</span>
            </button>

            <button
              onClick={onOpenEvidence}
              title={t.nav.evidence}
              className="p-2.5 rounded-2xl bg-white text-[#2D4D3C] hover:bg-[#EFE9DC] border border-[#DDD4C3] text-xs hidden lg:flex items-center space-x-1.5 rtl:space-x-reverse shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-[#173829]" />
              <span>{t.nav.evidence}</span>
            </button>

            {/* Demo Controls Button */}
            <button
              onClick={onOpenDemoControls}
              className="flex items-center space-x-1.5 rtl:space-x-reverse px-3.5 py-2 rounded-2xl bg-[#173829] hover:bg-[#24533D] text-[#FAF8F3] font-bold text-xs transition-colors shadow-xs"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{t.nav.demoControls}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
