import { SupportedLanguage } from '../types';

const LANG_CODE_MAP: Record<SupportedLanguage, string[]> = {
  en: ['en-US', 'en-GB', 'en-AU', 'en'],
  hi: ['hi-IN', 'hi'],
  ml: ['ml-IN', 'ml'],
  kn: ['kn-IN', 'kn'],
  ar: ['ar-AE', 'ar-SA', 'ar-EG', 'ar'],
  ur: ['ur-PK', 'ur-IN', 'ur'],
};

/**
 * Play a short alert chime using the browser Web Audio API as an immediate audio feedback.
 */
export function playAlertChime(urgency: 'low' | 'moderate' | 'high' | 'critical' = 'moderate') {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const freq = urgency === 'critical' ? 880 : urgency === 'high' ? 660 : 440;
    osc.type = urgency === 'critical' ? 'sawtooth' : 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {
    // AudioContext blocked or not supported
  }
}

/**
 * Speaks the text aloud using browser SpeechSynthesis API.
 */
export function speakAlertText(
  text: string,
  lang: SupportedLanguage,
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  if (!('speechSynthesis' in window)) {
    playAlertChime('high');
    return false;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    const targetCodes = LANG_CODE_MAP[lang] || ['en-US'];

    // Try finding matching voice
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = voices.find((v) =>
      targetCodes.some((code) => v.lang.toLowerCase().startsWith(code.toLowerCase()))
    );

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    } else {
      utterance.lang = targetCodes[0];
    }

    utterance.rate = 0.95; // Slightly slower for clarity under noisy outdoor conditions
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      onEnd?.();
    };

    utterance.onerror = () => {
      playAlertChime('high');
      onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    playAlertChime('high');
    onEnd?.();
    return false;
  }
}
