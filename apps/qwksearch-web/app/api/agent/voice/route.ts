import { createVoiceHandler } from "research-agent-ui/api";
import { getUserId } from "@/lib/auth/agent-session";
import { checkTTSRateLimit } from "@/lib/rate-limit/guestRateLimiter";
import { getCloudflareContext } from "@/lib/cloudflare/context";
import { generateSpeech } from "../../../../../../packages/use-voice-control/speech";
import { generateDeepgramSpeech } from "../../../../../../packages/use-voice-control/speech/core/deepgram";

export const runtime = "nodejs";

/** Workers AI binding, present only when running on the deployed Worker. */
function workersAI(): any {
  try {
    return getCloudflareContext().env?.AI ?? null;
  } catch {
    return null;
  }
}

/**
 * Kokoro runs through onnxruntime-node, which the Worker runtime can't load,
 * so on Cloudflare every request is served by Deepgram Aura on Workers AI.
 * A Kokoro voice id is mapped to an Aura voice of the same gender.
 */
async function speak(opts: { text: string; provider: string; voice: string }) {
  const ai = workersAI();
  if (!ai) return generateSpeech(opts as Parameters<typeof generateSpeech>[0]);

  let voice = opts.voice;
  if (opts.provider !== "deepgram") voice = /^[ab]m_/.test(voice) ? "orion" : "asteria";
  return generateDeepgramSpeech(opts.text, voice, ai);
}

const handler = createVoiceHandler({ getUserId, checkTTSRateLimit, generateSpeech: speak });
export const { POST } = handler;
