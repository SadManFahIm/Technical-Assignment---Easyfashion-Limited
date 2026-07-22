# AI-Checker — Architecture Documentation

**Version:** 1.1  
**Updated:** July 2026  
**Author:** Sadman Fahim  

---

## Table of Contents

- [1. System Overview](#1-system-overview)
- [2. High-Level Architecture](#2-high-level-architecture)
- [3. Request Lifecycle](#3-request-lifecycle)
- [4. Provider Abstraction Layer](#4-provider-abstraction-layer)
- [5. Fallback Orchestration](#5-fallback-orchestration)
- [6. Video Processing Pipeline](#6-video-processing-pipeline)
- [7. Frontend Architecture](#7-frontend-architecture)
- [8. Data Flow](#8-data-flow)
- [9. Error Handling Strategy](#9-error-handling-strategy)
- [10. Security Considerations](#10-security-considerations)
- [11. Performance Characteristics](#11-performance-characteristics)
- [12. Scalability Path](#12-scalability-path)

---

## 1. System Overview

AI-Checker is a web application that answers one question: "Was this content made by AI?" It handles four types of input — text, images, audio, and video — and gives back a percentage score with a human-readable verdict for each.

We don't run any models on our own server. All the heavy lifting happens at third-party APIs (Sapling handles text, Sightengine handles images, audio, and video). What makes this more than a wrapper is the fallback chain: if one provider goes down or hits a rate limit, the system quietly tries the next one. The user just sees a result.

The stack is Next.js 16 with TypeScript and Tailwind CSS. Everything ships as a single unit — no microservices, no separate backend, no infrastructure to manage beyond a Node.js server.

---

## 2. High-Level Architecture

Three layers. Browser handles the UI. Next.js server validates and orchestrates. External APIs do detection.

```
Browser (React 19 + Tailwind + Framer Motion)
  └─ POST /api/check/{text|image|audio|video}
        │
Next.js API Routes (Node.js runtime)
  └─ detectWithFallback(providers[], input)
        │
        ├─ Provider 1 (primary) ─── success → return
        │     fail ↓
        ├─ Provider 2 (fallback) ── success → return
        │     fail ↓
        └─ Provider 3 (stub) ───── success → return
              fail ↓
              HTTP 503 → client shows toast
        │
External APIs
  Text:  Sapling → GPTZero → ZeroGPT (stubbed)
  Image: Sightengine → AI or Not (stubbed)
  Audio: Sightengine → AI or Not (stubbed)
  Video: Sightengine per frame → AI or Not (stubbed)
```

The server is intentionally thin. No database, no sessions, no state. Every request is independent. That keeps things simple and makes it easy to reason about what's happening.

---

## 3. Request Lifecycle

### 3.1 Text

User types or pastes text (needs at least 20 characters). Client sends a JSON POST to `/api/check/text`. The route handler checks the length, then hands it to the fallback orchestrator with the text provider list. Sapling processes it and returns a score between 0 and 1. The route multiplies by 100, picks a verdict bucket, and sends back JSON. The client animates the result card into view.

### 3.2 Image

User drops a JPG or PNG onto the upload zone (10MB max, enforced both client-side and server-side). Client sends it as multipart form data. The route reads the file into a Buffer and passes it through the image provider chain. Sightengine's `genai` model returns `type.ai_generated` as a 0–1 score.

### 3.3 Audio

Same flow as image, but with audio files. We accept MP3, WAV, M4A, OGG, FLAC, and WEBM — up to 20MB. The route sends the file to Sightengine's audio endpoint (`/1.0/audio/check.json` with `models=genai`). This covers both AI-generated music (Suno, Udio-style) and synthetic speech (ElevenLabs, OpenAI TTS).

One nice thing here: we didn't need any new API credentials. Sightengine uses the same user/secret pair for audio that we already had configured for images. So adding audio detection was mostly a matter of writing the provider file and the UI panel — the infrastructure was already in place.

### 3.4 Video

This one's more involved. The user uploads an MP4 (20MB max). We write it to a temp file, then use FFmpeg to pull out 8 evenly-spaced JPEG frames. Each frame goes through the image detection chain — all 8 in parallel via `Promise.all`. We average the scores for the overall percentage and also return the per-frame array so the frontend can draw a timeline chart. Temp files get cleaned up in a `finally` block.

---

## 4. Provider Abstraction Layer

Every provider — whether it's calling Sapling's text endpoint or Sightengine's audio endpoint — implements the same interface:

```typescript
interface Provider {
  name: string;
  detect(input: ProviderInput): Promise<DetectionResult>;
}

interface DetectionResult {
  aiProbability: number;   // 0 to 1, normalized across providers
  providerName: string;    // shows up as "via sapling" in the UI
  raw?: unknown;           // original response kept for debugging
}

type ProviderInput =
  | { kind: "text"; text: string }
  | { kind: "image"; buffer: Buffer; mimeType: string }
  | { kind: "audio"; buffer: Buffer; mimeType: string }
  | { kind: "video-frame"; buffer: Buffer; mimeType: string };
```

The `ProviderUnavailableError` class is how a provider says "I can't do this right now, try someone else." The orchestrator catches it and moves on.

This design made adding audio trivial. I wrote `lib/providers/audio/sightengine.ts`, pointed it at the audio endpoint, had it extract the score from the response, and added it to the route's provider array. Everything else — the timeout logic, the retry behavior, the error handling — came for free from the existing orchestrator.

---

## 5. Fallback Orchestration

The orchestrator is small — roughly 30 lines — but it's the most important piece of the system. Here's what it does:

1. Takes an ordered list of providers and an input
2. Calls the first provider with an 8-second timeout (using `Promise.race`)
3. If it succeeds, returns the result immediately
4. If it fails (for any reason), logs the failure and tries the next
5. If every provider fails, throws an error that becomes a 503

Every failure gets logged with `console.warn`. You can watch the server output during a demo and see the fallback happening in real time: `[fallback] sapling failed: quota exceeded. Trying next provider...` That's useful for credibility — it shows the system doing exactly what the architecture promises.

---

## 6. Video Processing Pipeline

We can't send a whole video to Sightengine's free tier, so we sample frames. FFmpeg extracts 8 JPEG screenshots at evenly-spaced timestamps. Each frame gets analyzed as an image through the same provider chain.

Why 8? It's enough to catch patterns across the video without burning too many API credits. Each frame costs one Sightengine operation, so a single video analysis uses 8 of the 2,000 monthly free-tier ops. The parallel execution means wall-clock time is roughly 1x frame latency, not 8x.

The per-frame scores feed a recharts line chart in the UI, so users can see which parts of the video look more or less synthetic. That granularity is more useful than a single aggregate number.

---

## 7. Frontend Architecture

It's a single page with four tabs. Each tab has its own panel component that manages its own state.

```
page.tsx
├── ThemeToggle
├── Hero Section (title, badge, description)
├── TabSwitcher (Text | Image | Audio | Video)
└── Active Panel:
    ├── TextCheckPanel → ResultCard
    ├── ImageCheckPanel → ResultCard
    ├── AudioCheckPanel → ResultCard
    └── VideoCheckPanel → ResultCard + FrameTimelineChart
```

No global state. Each panel has `useState` for the input, loading state, and result. That's the right level of complexity for what this app does.

The ResultCard layout puts the percentage on the left and the verdict badge on the right, with a gradient progress bar below and attribution + disclaimer in the footer. The percentage animates from 0 to the final value. The bar color transitions from green (low AI probability) through amber (uncertain) to red (high probability).

Theme switching supports light and dark modes. The system preference is detected on load, the user can toggle manually, and the choice persists via a cookie.

---

## 8. Data Flow

**Happy path:** User submits input → client validates → POST to API → route validates → orchestrator calls Provider 1 → success → convert to percentage + verdict → return JSON → client shows animated result card.

**Fallback path:** Same as above, but Provider 1 returns 429 → orchestrator logs "quota exceeded" → tries Provider 2 → success → user gets result, never knew anything went wrong.

**All-fail path:** Every provider in the chain throws → orchestrator collects all errors → route handler returns 503 → client shows a toast notification: "Detection is temporarily unavailable. Please try again shortly."

---

## 9. Error Handling Strategy

Four layers, each with a specific job:

- **Provider files** catch API-specific errors and throw `ProviderUnavailableError`
- **Orchestrator** catches those, logs them, tries the next provider
- **Route handlers** catch the final failure, return 400 (bad input) or 503 (all providers down) with a clean message
- **Frontend** catches HTTP errors and shows toast notifications — never raw errors

The user never sees a stack trace or a provider name in an error message. The worst they see is "Detection is temporarily unavailable."

---

## 10. Security Considerations

API keys are in `.env.local` (gitignored). They're read through `process.env` on the server — none of them have the `NEXT_PUBLIC_` prefix that would leak them into the client bundle. That's an easy mistake to make with Next.js, so I'm calling it out explicitly.

File uploads get validated for type and size on both sides (client for UX speed, server for actual security). Temp files from video processing are deleted in `finally` blocks. Provider responses are validated before we use them — we don't just trust whatever JSON comes back from a third-party API.

---

## 11. Performance Characteristics

| What | How long | Why |
|---|---|---|
| Text check | 1–3 seconds | Network round-trip to Sapling |
| Image check | 2–5 seconds | File upload + Sightengine processing |
| Audio check | 3–8 seconds | File upload + audio analysis time |
| Video check | 10–30 seconds | FFmpeg extraction + 8 parallel image checks |
| Each fallback hop | +1–8 seconds | Timeout wait before trying next provider |

Video is the slowest path because of the frame extraction step. But the `Promise.all` parallelization means we don't pay the per-frame latency eight times — just once, plus overhead.

---

## 12. Scalability Path

This works for a POC with light usage. For production, here's what I'd change:

| Area | Current | Production path |
|---|---|---|
| Provider routing | Static ordered array | Dynamic selection based on quota/latency metrics |
| Video processing | In-process FFmpeg | Background job queue (Bull/BullMQ) |
| File storage | Temp local disk | S3 with signed upload URLs |
| Rate limiting | Provider-side only | App-level limits per user or IP |
| Caching | None | Hash-based cache to skip duplicate analyses |
| Monitoring | `console.warn` | Structured logging with alerting (Sentry, Datadog) |
| Multi-provider scoring | First success wins | Average multiple providers for higher confidence |

The core architecture wouldn't need to change. The provider interface and fallback pattern scale just fine — they'd just get smarter wrappers around them.

---

*Sadman Fahim — NeoNexor Software, July 2026*
