import React from 'react';
import {
  X,
  Play,
  Square,
  RotateCcw,
  Sliders,
  Radio,
  Clock,
  Sun,
  Droplets,
  Thermometer,
  Flame,
} from 'lucide-react';
import { SunExposure, WorkloadLevel } from '../types';
import { AppLocale } from '../utils/i18n';

interface DemoControlsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sensorUrl: string;
  onSetSensorUrl: (url: string) => void;
  isLiveMode: boolean;
  onToggleLiveMode: (val: boolean) => void;
  sensorStatusMessage?: string;
  isMiddayBanSimulated: boolean;
  onToggleMiddayBan: (val: boolean) => void;
  airTemp: number;
  onAirTempChange: (temp: number) => void;
  humidity: number;
  onHumidityChange: (hum: number) => void;
  sunExposure: SunExposure;
  onSunExposureChange: (exp: SunExposure) => void;
  workload: WorkloadLevel;
  onWorkloadChange: (w: WorkloadLevel) => void;
  acclimatized: boolean;
  onAcclimatizedChange: (acc: boolean) => void;
  heavyPPE: boolean;
  onHeavyPPEChange: (ppe: boolean) => void;
  exposureHours: number;
  onExposureHoursChange: (hours: number) => void;
  isHeatWaveRunning: boolean;
  heatWaveSecondsElapsed: number;
  onStartHeatWave: () => void;
  onStopHeatWave: () => void;
  onResetToBaseline: () => void;
  locale?: AppLocale;
}

export const DemoControlsDrawer: React.FC<DemoControlsDrawerProps> = ({
  isOpen,
  onClose,
  sensorUrl,
  onSetSensorUrl,
  isLiveMode,
  onToggleLiveMode,
  sensorStatusMessage,
  isMiddayBanSimulated,
  onToggleMiddayBan,
  airTemp,
  onAirTempChange,
  humidity,
  onHumidityChange,
  sunExposure,
  onSunExposureChange,
  workload,
  onWorkloadChange,
  acclimatized,
  onAcclimatizedChange,
  heavyPPE,
  onHeavyPPEChange,
  exposureHours,
  onExposureHoursChange,
  isHeatWaveRunning,
  heatWaveSecondsElapsed,
  onStartHeatWave,
  onStopHeatWave,
  onResetToBaseline,
  locale = 'en',
}) => {
  if (!isOpen) return null;

  const isAr = locale === 'ar';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Demo Controls and Simulation Drawer"
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity"
    >
      <div className="w-full max-w-md bg-[#FAF8F3] border-l rtl:border-l-0 rtl:border-r border-[#DDD4C3] h-full flex flex-col shadow-2xl overflow-y-auto">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E8E2D5] flex items-center justify-between sticky top-0 bg-[#FAF8F3]/95 backdrop-blur-md z-10">
          <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
            <div className="p-2.5 rounded-xl bg-[#EBF5F0] text-[#173829]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#173829]">
                {isAr ? 'لوحة التحكم والمحاكاة التجريبية' : 'Demo Controls & Simulation'}
              </h3>
              <p className="text-xs text-[#4A6857]">
                {isAr ? 'ربط عتاد ESP32 وتجربة سيناريوهات الحرارة' : 'ESP32 Hardware Relay & Heat Scenarios'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close demo controls drawer"
            className="p-1.5 rounded-xl bg-white border border-[#DDD4C3] text-[#4A6857] hover:text-[#173829] hover:bg-[#EFE9DC] transition-colors shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-5 space-y-6 flex-1 text-xs text-[#2D4D3C]">
          {/* Section 1: ESP32 Hardware Relay Switch */}
          <div className="bg-white p-4 rounded-2xl border border-[#DDD4C3] space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 rtl:space-x-reverse font-bold text-sm text-[#173829]">
                <Radio className="w-4 h-4 text-[#173829]" />
                <span>{isAr ? 'ربط مستشعر ESP32 الميداني' : 'ESP32 Live Hardware Relay'}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isLiveMode}
                  onChange={(e) => onToggleLiveMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#E2DCD0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#DDD4C3] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#173829]"></div>
              </label>
            </div>

            <p className="text-[#4A6857] leading-relaxed">
              {isAr
                ? 'أدخل عنوان IP المحلي لمستشعر ESP32 الميداني (مثال: http://192.168.1.100/data). إذا تعذر الوصول إليه، سيعود النظام بسلاسة إلى وضع المحاكاة الآمن.'
                : 'Connect live ESP32 DHT22 / DS18B20 microclimate sensor. If unreachable, gracefully falls back to deterministic simulation.'}
            </p>

            {isLiveMode && (
              <div className="space-y-2 pt-2 border-t border-[#E8E2D5]">
                <label className="block text-[11px] font-bold text-[#173829]">
                  {isAr ? 'رابط خادم ESP32' : 'ESP32 HTTP Endpoint URL'}
                </label>
                <input
                  type="url"
                  placeholder="http://192.168.4.1/data"
                  value={sensorUrl}
                  onChange={(e) => onSetSensorUrl(e.target.value)}
                  className="w-full bg-[#FAF8F3] border border-[#DDD4C3] rounded-xl px-3 py-2 text-xs font-mono text-[#173829] focus:outline-none focus:ring-2 focus:ring-[#173829]"
                />
                {sensorStatusMessage && (
                  <p className="text-[11px] text-[#4A6857] italic">{sensorStatusMessage}</p>
                )}
              </div>
            )}
          </div>

          {/* Section 2: 60-Second Heat Wave Scenario Ramp */}
          <div className="bg-white p-4 rounded-2xl border border-[#DDD4C3] space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 rtl:space-x-reverse font-bold text-sm text-[#173829]">
                <Flame className="w-4 h-4 text-[#C81D25]" />
                <span>{isAr ? 'سيناريو موجة الحر (60 ثانية)' : '60-Second Heat Wave Ramp'}</span>
              </div>
              {isHeatWaveRunning && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FEE2E2] text-[#991B1B] animate-pulse">
                  {heatWaveSecondsElapsed}s / 60s
                </span>
              )}
            </div>

            <p className="text-[#4A6857] leading-relaxed">
              {isAr
                ? 'محاكاة تصاعد سريع في درجات الحرارة والرطوبة الساحلية في دبي، للانتقال من المنطقة الآمنة إلى الدرجة الحرجة لاختبار استجابة النظام.'
                : 'Accelerated ramp from baseline 34°C up to 46°C / 72% humidity to demonstrate multi-tier alerts and TTS voice broadcast.'}
            </p>

            <div className="flex items-center space-x-2 rtl:space-x-reverse pt-2">
              {!isHeatWaveRunning ? (
                <button
                  onClick={onStartHeatWave}
                  className="flex-1 flex items-center justify-center space-x-1.5 rtl:space-x-reverse py-2.5 px-3 rounded-xl bg-[#173829] hover:bg-[#24533D] text-[#FAF8F3] font-bold shadow-xs transition-colors"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{isAr ? 'تشغيل سيناريو موجة الحر' : 'Start Heat Ramp'}</span>
                </button>
              ) : (
                <button
                  onClick={onStopHeatWave}
                  className="flex-1 flex items-center justify-center space-x-1.5 rtl:space-x-reverse py-2.5 px-3 rounded-xl bg-[#C81D25] hover:bg-[#991B1B] text-white font-bold shadow-xs transition-colors"
                >
                  <Square className="w-4 h-4 fill-current" />
                  <span>{isAr ? 'إيقاف المحاكاة' : 'Stop Ramp'}</span>
                </button>
              )}

              <button
                onClick={onResetToBaseline}
                title="Reset to safe baseline"
                className="p-2.5 rounded-xl bg-[#FAF8F3] hover:bg-[#EFE9DC] border border-[#DDD4C3] text-[#173829] transition-colors shadow-xs"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Section 3: Manual Environmental Overrides */}
          <div className="bg-white p-4 rounded-2xl border border-[#DDD4C3] space-y-4 shadow-xs">
            <h4 className="font-bold text-sm text-[#173829] flex items-center space-x-2 rtl:space-x-reverse">
              <Thermometer className="w-4 h-4 text-[#173829]" />
              <span>{isAr ? 'التحكم اليدوي بالمؤشرات البيئية' : 'Environmental Sliders'}</span>
            </h4>

            {/* Air Temp Slider */}
            <div className="space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-[#4A6857]">{isAr ? 'درجة حرارة الهواء' : 'Air Temp'}:</span>
                <span className="font-mono text-[#173829]">{airTemp}°C</span>
              </div>
              <input
                type="range"
                min="26"
                max="52"
                step="0.5"
                value={airTemp}
                onChange={(e) => onAirTempChange(parseFloat(e.target.value))}
                className="w-full accent-[#173829] cursor-pointer"
              />
            </div>

            {/* Humidity Slider */}
            <div className="space-y-1">
              <div className="flex justify-between font-bold">
                <span className="text-[#4A6857]">{isAr ? 'الرطوبة النسبية (دبي الساحلية)' : 'Relative Humidity'}:</span>
                <span className="font-mono text-[#173829]">{humidity}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="95"
                step="1"
                value={humidity}
                onChange={(e) => onHumidityChange(parseInt(e.target.value))}
                className="w-full accent-[#173829] cursor-pointer"
              />
            </div>

            {/* Solar Radiation / Sun Exposure */}
            <div className="space-y-1.5 pt-2 border-t border-[#E8E2D5]">
              <label className="font-bold text-[#173829] block">
                {isAr ? 'التعرض لأشعة الشمس' : 'Solar Exposure'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['shade', 'partial', 'full'] as SunExposure[]).map((exp) => (
                  <button
                    key={exp}
                    onClick={() => onSunExposureChange(exp)}
                    className={`py-1.5 px-2 rounded-xl text-center font-bold capitalize transition-all border ${
                      sunExposure === exp
                        ? 'bg-[#173829] text-[#FAF8F3] border-[#173829] shadow-xs'
                        : 'bg-[#FAF8F3] border-[#DDD4C3] text-[#4A6857] hover:bg-[#EFE9DC]'
                    }`}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>

            {/* Workload Level */}
            <div className="space-y-1.5 pt-2 border-t border-[#E8E2D5]">
              <label className="font-bold text-[#173829] block">
                {isAr ? 'مستوى المجهود البدني' : 'Metabolic Workload'}
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['Rest', 'Light', 'Moderate', 'Heavy'] as WorkloadLevel[]).map((w) => (
                  <button
                    key={w}
                    onClick={() => onWorkloadChange(w)}
                    className={`py-1.5 px-1 rounded-xl text-center font-bold transition-all border text-[11px] ${
                      workload === w
                        ? 'bg-[#173829] text-[#FAF8F3] border-[#173829] shadow-xs'
                        : 'bg-[#FAF8F3] border-[#DDD4C3] text-[#4A6857] hover:bg-[#EFE9DC]'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Modifiers Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-[#E8E2D5]">
              <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer">
                <input
                  type="checkbox"
                  checked={heavyPPE}
                  onChange={(e) => onHeavyPPEChange(e.target.checked)}
                  className="rounded text-[#173829] focus:ring-[#173829] w-4 h-4"
                />
                <span className="font-medium text-[#173829]">
                  {isAr ? 'ملابس وقاية غير منفذة / ثقيلة (+2°C WBGT)' : 'Heavy Impermeable Coveralls (+2°C)'}
                </span>
              </label>

              <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer">
                <input
                  type="checkbox"
                  checked={!acclimatized}
                  onChange={(e) => onAcclimatizedChange(!e.target.checked)}
                  className="rounded text-[#173829] focus:ring-[#173829] w-4 h-4"
                />
                <span className="font-medium text-[#173829]">
                  {isAr ? 'عامل غير متأقلم / جديد (عتبة مخفضة)' : 'Unacclimatized Worker (Strict Threshold)'}
                </span>
              </label>

              <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer">
                <input
                  type="checkbox"
                  checked={isMiddayBanSimulated}
                  onChange={(e) => onToggleMiddayBan(e.target.checked)}
                  className="rounded text-[#C81D25] focus:ring-[#C81D25] w-4 h-4"
                />
                <span className="font-bold text-[#C81D25]">
                  {isAr ? 'محاكاة فترة حظر الظهيرة (12:30 - 15:00)' : 'Simulate UAE Midday Ban Window (12:30-15:00)'}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[#E8E2D5] bg-[#FAF8F3] sticky bottom-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#173829] hover:bg-[#24533D] text-[#FAF8F3] font-bold text-xs shadow-xs transition-colors"
          >
            {isAr ? 'تطبيق وإغلاق' : 'Apply & Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
