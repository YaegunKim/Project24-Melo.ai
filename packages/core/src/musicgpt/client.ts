export interface MusicGenerateRequest {
  prompt: string;
  duration: number;
  format?: 'mp3' | 'wav';
}

export interface MusicGenerateResponse {
  audioUrl: string;
  taskId: string;
  status: 'completed';
}

const POLL_INTERVAL_MS = 5000;
const POLL_TIMEOUT_MS = 5 * 60 * 1000; // 5분

/**
 * Next.js API Route를 통해 MusicGPT API를 호출하고,
 * 생성이 완료될 때까지 폴링 후 audioUrl을 반환합니다.
 */
export async function generateMusic(
  request: MusicGenerateRequest,
  onEta?: (etaSeconds: number) => void
): Promise<MusicGenerateResponse> {
  // 1. 생성 요청
  const initRes = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!initRes.ok) {
    throw new Error(`Music generation failed: ${initRes.status}`);
  }

  const initData = await initRes.json() as {
    taskId: string;
    conversionId: string;
    eta: number;
    status: string;
  };

  const { taskId, conversionId } = initData;

  if (!conversionId) {
    throw new Error(`No conversionId returned from generate API: ${JSON.stringify(initData)}`);
  }

  if (initData.eta && onEta) {
    onEta(initData.eta);
  }

  // 2. 완료될 때까지 폴링
  const deadline = Date.now() + POLL_TIMEOUT_MS;

  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));

    const statusRes = await fetch(`/api/status?conversionId=${encodeURIComponent(conversionId)}`);
    if (!statusRes.ok) {
      throw new Error(`Status check failed: ${statusRes.status}`);
    }

    const { status, audioUrl } = await statusRes.json() as {
      status: 'processing' | 'completed' | 'failed';
      audioUrl?: string;
    };

    if (status === 'completed' && audioUrl) {
      return { audioUrl, taskId, status: 'completed' };
    }

    if (status === 'failed') {
      throw new Error('Music generation failed on server');
    }
  }

  throw new Error('Music generation timed out');
}
