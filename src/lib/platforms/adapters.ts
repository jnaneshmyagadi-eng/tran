/**
 * Platform adapters — honest support levels.
 */

export type PlatformSupport = "supported" | "partially_supported" | "unsupported";

export interface PlatformAdapter {
  id: string;
  name: string;
  support: PlatformSupport;
  shareTarget: boolean;
  webPlayer: boolean;
  notes: string;
  detectUrl(url: string): boolean;
}

export const PLATFORM_ADAPTERS: PlatformAdapter[] = [
  {
    id: "youtube",
    name: "YouTube",
    support: "partially_supported",
    shareTarget: true,
    webPlayer: false,
    notes: "Share → TRAN works. Native app injection is impossible from a website.",
    detectUrl: (url) => /youtube\.com|youtu\.be/i.test(url),
  },
  {
    id: "web_video",
    name: "Web video / audio",
    support: "partially_supported",
    shareTarget: true,
    webPlayer: true,
    notes: "Direct media URLs and TRAN player samples.",
    detectUrl: (url) => /\.(mp3|mp4|m4a|wav|webm|ogg)(\?|$)/i.test(url),
  },
  {
    id: "podcast",
    name: "Podcasts",
    support: "partially_supported",
    shareTarget: true,
    webPlayer: true,
    notes: "Audio URL share + pipeline.",
    detectUrl: (url) => /podcast|anchor\.fm|spotify\.com/i.test(url),
  },
  {
    id: "instagram",
    name: "Instagram",
    support: "unsupported",
    shareTarget: true,
    webPlayer: false,
    notes: "Share URL handoff only.",
    detectUrl: (url) => /instagram\.com/i.test(url),
  },
  {
    id: "tiktok",
    name: "TikTok",
    support: "unsupported",
    shareTarget: true,
    webPlayer: false,
    notes: "Share URL handoff only.",
    detectUrl: (url) => /tiktok\.com/i.test(url),
  },
  {
    id: "x",
    name: "X (Twitter)",
    support: "unsupported",
    shareTarget: true,
    webPlayer: false,
    notes: "Share URL handoff only.",
    detectUrl: (url) => /twitter\.com|x\.com/i.test(url),
  },
];

export function detectPlatform(url: string): PlatformAdapter | null {
  for (const a of PLATFORM_ADAPTERS) {
    if (a.detectUrl(url)) return a;
  }
  return null;
}

export function listPlatforms() {
  return PLATFORM_ADAPTERS.map((a) => ({
    id: a.id,
    name: a.name,
    support: a.support,
    shareTarget: a.shareTarget,
    webPlayer: a.webPlayer,
    notes: a.notes,
  }));
}
