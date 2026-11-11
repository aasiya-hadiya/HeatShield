import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Cpu,
  Copy,
  Check,
  ExternalLink,
  Radio,
} from 'lucide-react';
import { EVIDENCE_CITATIONS, ESP32_ARDUINO_SKETCH } from '../data/mockData';
import { AppLocale } from '../utils/i18n';

interface EvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale?: AppLocale;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  isOpen,
  onClose,
  locale = 'en',
}) => {
  const [activeTab, setActiveTab] = useState<'evidence' | 'hardware'>('evidence');
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const isAr = locale === 'ar';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(ESP32_ARDUINO_SKETCH);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Scientific Evidence & ESP32 Hardware Guide"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto"
    >
      <div className="bg-[#FAF8F3] border-2 border-[#DDD4C3] rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-5 border-b border-[#E8E2D5] flex items-center justify-between bg-[#FAF8F3] sticky top-0 z-10">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="p-2.5 rounded-xl bg-[#EBF5F0] text-[#173829]">
              {activeTab === 'evidence' ? (
                <BookOpen className="w-5 h-5" />
              ) : (
                <Cpu className="w-5 h-5 text-[#173829]" />
              )}
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#173829]">
                {activeTab === 'evidence'
                  ? isAr
                    ? 'الأدلة والبحوث العلمية المنشورة في الخليج'
                    : 'Scientific Evidence & Gulf Research Citations'
                  : isAr
                    ? 'دليل عتاد وشيفرة مستشعر ESP32 الميداني'
                    : 'ESP32 Microclimate Sensor Hardware Guide'}
              </h3>
              <p className="text-xs text-[#4A6857]">
                {isAr
                  ? 'توثيق الأوراق العلمية المحكمة وكود Arduino C++ الجاهز'
                  : 'Peer-reviewed studies, ISO 7243 standards, & turnkey C++ sketch'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close evidence modal"
            className="p-1.5 rounded-xl bg-white border border-[#DDD4C3] text-[#4A6857] hover:text-[#173829] hover:bg-[#EFE9DC] transition-colors shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#E8E2D5] bg-[#F4EFE6] px-5 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('evidence')}
            className={`pb-2.5 px-4 font-bold text-xs border-b-2 transition-all flex items-center space-x-1.5 rtl:space-x-reverse ${
              activeTab === 'evidence'
                ? 'border-[#173829] text-[#173829]'
                : 'border-transparent text-[#4A6857] hover:text-[#173829]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isAr ? 'الأوراق العلمية (3 دراسات خليجية)' : 'Evidence & Citations (3)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('hardware')}
            className={`pb-2.5 px-4 font-bold text-xs border-b-2 transition-all flex items-center space-x-1.5 rtl:space-x-reverse ${
              activeTab === 'hardware'
                ? 'border-[#173829] text-[#173829]'
                : 'border-transparent text-[#4A6857] hover:text-[#173829]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{isAr ? 'مخطط عتاد ESP32 وشيفرة Arduino' : 'ESP32 Hardware Guide'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-[#2D4D3C] flex-1">
          {activeTab === 'evidence' ? (
            <div className="space-y-4">
              {EVIDENCE_CITATIONS.map((cit, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-[#DDD4C3] space-y-2.5 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-sm text-[#173829] leading-snug">
                      {cit.title}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#EBF5F0] text-[#173829] border border-[#C5DFD0] shrink-0">
                      Peer-Reviewed
                    </span>
                  </div>

                  <p className="text-[11px] text-[#4A6857] font-medium">
                    {cit.authors} • <em className="italic">{cit.journal}</em>
                  </p>

                  <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#E8E2D5] space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#173829]">
                      Key Empirical Finding:
                    </span>
                    <p className="text-xs text-[#2D4D3C] leading-relaxed">
                      {cit.keyFinding}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-[#6C8D7B]">
                      Dubai & Gulf Workload Validation
                    </span>
                    <a
                      href={cit.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#173829] hover:underline font-bold flex items-center space-x-1 rtl:space-x-reverse"
                    >
                      <span>Read Publication</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-[#DDD4C3] space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse font-bold text-sm text-[#173829]">
                    <Radio className="w-4 h-4 text-[#173829]" />
                    <span>Turnkey ESP32 Arduino C++ Firmware</span>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-1.5 rounded-xl bg-[#173829] hover:bg-[#24533D] text-[#FAF8F3] text-xs font-bold transition-all shadow-xs"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-[#A3E5C1]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied!' : 'Copy Sketch'}</span>
                  </button>
                </div>

                <p className="text-[#4A6857] leading-relaxed">
                  Flash this sketch to an ESP32 with a DHT22 (temperature & humidity) and black globe sensor on GPIO 4. Connect to site Wi-Fi or run as AP (`192.168.4.1`) to stream real-time JSON to HeatShield AI.
                </p>

                <div className="relative rounded-xl overflow-hidden border border-[#E8E2D5]">
                  <pre className="p-4 bg-[#173829] text-[#EBF5F0] font-mono text-[11px] overflow-x-auto max-h-72 leading-relaxed">
                    {ESP32_ARDUINO_SKETCH}
                  </pre>
                </div>
              </div>

              {/* Hardware Bill of Materials */}
              <div className="bg-white p-5 rounded-2xl border border-[#DDD4C3] space-y-2.5 shadow-xs">
                <h4 className="font-bold text-sm text-[#173829]">Turnkey Site Hardware Kit ($38 USD)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#E8E2D5]">
                    <div className="font-bold text-[#173829]">ESP32 Dev Module</div>
                    <div className="text-[11px] text-[#4A6857] mt-0.5">Dual-core 240MHz, 2.4GHz Wi-Fi + BLE</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#E8E2D5]">
                    <div className="font-bold text-[#173829]">DHT22 (AM2302)</div>
                    <div className="text-[11px] text-[#4A6857] mt-0.5">±0.5°C accuracy, 0-100% RH capacitive</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#E8E2D5]">
                    <div className="font-bold text-[#173829]">Copper Globe + DS18B20</div>
                    <div className="text-[11px] text-[#4A6857] mt-0.5">Matt black 150mm sphere for solar load</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E8E2D5] bg-[#FAF8F3] flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-[#173829] hover:bg-[#24533D] text-[#FAF8F3] font-bold text-xs shadow-xs transition-colors"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
