# TRAN is universal

**Not** a Kannada-first product. Kannada is one language in the registry, useful for testing, never the product default.

## Principle

Any supported language → any supported language.

User A preferred: Japanese → Hindi content becomes Japanese  
User B preferred: English → same Hindi content becomes English  
User C preferred: Kannada → same content becomes Kannada  

## Architecture

- `LANGUAGE_REGISTRY` — expandable list with capability flags
- `getPairCapability(source, target)` — FULL | SUBTITLE_ONLY | TRANSLATION_ONLY | NOT_SUPPORTED
- Preferred language stored per user (localStorage + Supabase profiles)
- Source language defaults to **auto-detect**, not a fixed language
- Target is always the user's preferred language (or session override)

## Do not

- Hardcode `target = "kn"` in product flows
- Show a language as voice-capable if TTS provider does not support it
- Claim "all languages" beyond connected provider capabilities

## Test matrix (representative)

Hindi→English, English→Hindi, Hindi→Japanese, Japanese→English,  
Tamil→Telugu, Spanish→English, Arabic→Hindi, Korean→English, etc.

Only claim a pair works after a real provider response.
