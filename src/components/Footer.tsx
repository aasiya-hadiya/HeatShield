import React from 'react';
import { AppLocale, UI_TRANSLATIONS } from '../utils/i18n';
import { DubaiSkyline } from './DubaiSkyline';
import { ShieldAlert, BookOpen, TrendingUp, Heart } from 'lucide-react';

interface FooterProps {
  onOpenEvidence: () => void;
  onOpenImpact: () => void;
  locale: AppLocale;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenEvidence,
  onOpenImpact,
  locale,
}) => {
  const t = UI_TRANSLATIONS[locale];

  return (
    <footer className="mt-12 bg-[#F4EFE6] border-t border-[#E2DCD0] text-[#173829] relative overflow-hidden">
      {/* Dubai Skyline illustration along the top edge of footer */}
      <div className="w-full opacity-90 pt-4">
        <DubaiSkyline fillColor="#173829" accentColor="#2D5E46" height={80} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-[#DDD4C3]">
          {/* Brand Info & Arabic Calligraphy */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-8 h-8 rounded-xl bg-[#173829] flex items-center justify-center text-[#FAF8F3]">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <span className="font-arabic-calligraphy text-xl font-black text-[#173829]">
                دِرْعُ الحَرَارَةِ الذَّكِيّ
              </span>
              <span className="text-xs text-[#557564] font-bold">| HeatShield AI</span>
            </div>
            <p className="text-xs text-[#4A6857] leading-relaxed max-w-sm">
              {locale === 'ar'
                ? 'مبادرة رقمية متقدمة لحماية عمال الإنشاءات وسائقي توصيل الطلبات في دبي من الإجهاد الحراري، تجمع بين الذكاء الاصطناعي ومعايير السلامة المهنية الدولية.'
                : 'Advanced AI-powered heat-risk early warning and SmartShift planning system for Dubai outdoor workers and delivery riders.'}
            </p>
          </div>

          {/* Quick Regulatory Links */}
          <div className="space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-[#173829]">
              {locale === 'ar' ? 'المعايير والتوثيق' : 'Standards & Verification'}
            </div>
            <div className="flex flex-col space-y-1.5 text-xs">
              <button
                onClick={onOpenEvidence}
                className="text-left rtl:text-right text-[#2D4D3C] hover:text-[#173829] hover:underline flex items-center space-x-1.5 rtl:space-x-reverse"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#173829]" />
                <span>{t.nav.evidence} • ISO 7243 & Stull 2011</span>
              </button>
              <button
                onClick={onOpenImpact}
                className="text-left rtl:text-right text-[#2D4D3C] hover:text-[#173829] hover:underline flex items-center space-x-1.5 rtl:space-x-reverse"
              >
                <TrendingUp className="w-3.5 h-3.5 text-[#173829]" />
                <span>{t.nav.impact} • Lead Time & Adherence</span>
              </button>
              <div className="text-[11px] text-[#6C8D7B]">
                {locale === 'ar'
                  ? 'متوافق مع قرار وزارة الموارد البشرية والتوطين رقم (44) لسنة 2022'
                  : 'UAE Ministerial Decree No. 44 (2022) Midday Ban Compliant'}
              </div>
            </div>
          </div>

          {/* Hackathon Credentials */}
          <div className="space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-[#173829]">
              {locale === 'ar' ? 'الابتكار والتطوير' : 'Innovation & Impact'}
            </div>
            <p className="text-xs text-[#4A6857] leading-relaxed">
              {locale === 'ar'
                ? 'تم التطوير خصيصاً لمسابقة تحدي صحة المستقبل للابتكار الرقمي 2026. يدعم مستشعرات ESP32 الميدانية ونماذج Gemini AI متقدمة التفكير.'
                : 'Built for the Future Health Digital Innovation Challenge 2026. Powered by Google AI Studio, multi-model Gemini fallback, and ESP32 IoT micro-climate telemetry.'}
            </p>
          </div>
        </div>

        {/* Non-medical Statutory Disclaimer */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#6C8D7B]">
          <div className="leading-relaxed text-center sm:text-left rtl:sm:text-right">
            <strong>{t.footer.disclaimerTitle}:</strong> {t.footer.disclaimerText}
          </div>

          <div className="shrink-0 flex items-center space-x-1 rtl:space-x-reverse font-medium">
            <span>Made with care for Dubai's field heroes</span>
            <Heart className="w-3 h-3 text-[#C81D25] fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
};
