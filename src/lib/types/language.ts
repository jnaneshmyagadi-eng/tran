/**
 * Universal language types for TRAN.
 * Any supported language → any supported language.
 * No product-level default target language.
 */

export type LanguageCode = string;

export type CapabilityLevel =
  | "FULL" // STT + translation + TTS
  | "SUBTITLE_ONLY" // translation + subtitles, no voice
  | "TRANSLATION_ONLY" // text translation only
  | "NOT_SUPPORTED";

export interface VoiceOption {
  id: string;
  label: string;
  gender: "male" | "female" | "neutral";
  provider: string;
}

export interface Language {
  code: LanguageCode;
  /** Native script name e.g. ಕನ್ನಡ */
  native_name: string;
  /** English name e.g. Kannada */
  english_name: string;
  /** Optional region hint (not a country flag requirement) */
  region?: string;
  rtl?: boolean;
  /** Capabilities — set from registry + provider metadata */
  speech_to_text_supported: boolean;
  translation_supported: boolean;
  text_to_speech_supported: boolean;
  subtitle_supported: boolean;
  voice_options: VoiceOption[];
  /** Which providers claim support (ids) */
  provider_support: {
    stt: string[];
    translation: string[];
    tts: string[];
  };
}

/** Legacy aliases used in older UI — map to native_name / english_name */
export type LanguageLegacy = Language & {
  name: string;
  nativeName: string;
  voiceAvailable: boolean;
  subtitleAvailable: boolean;
};

export interface LanguagePairCapability {
  source: LanguageCode | "auto";
  target: LanguageCode;
  level: CapabilityLevel;
  stt: boolean;
  translation: boolean;
  tts: boolean;
  subtitles: boolean;
  message?: string;
}

export interface UserLanguageMemory {
  preferred_language: LanguageCode | null;
  recent_languages: LanguageCode[];
  favorite_languages: LanguageCode[];
  voice_preference: string | null;
  translation_mode: string;
  subtitle_preference: boolean;
  voice_enabled: boolean;
}
