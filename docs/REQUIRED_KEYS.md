# Required API keys for real translation

Without these, TRAN will **not** invent translations.

## Minimum for text translation

One of:

- `OPENAI_API_KEY` — used for GPT translation + Whisper STT + OpenAI TTS
- `GOOGLE_TRANSLATE_API_KEY` — text translation only

## For full pipeline (STT + translate + voice)

- `OPENAI_API_KEY` (required)

## Supabase / Auth

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Google OAuth configured in Supabase dashboard

## Without keys

UI shows provider-required message. Status will **not** show Live.
