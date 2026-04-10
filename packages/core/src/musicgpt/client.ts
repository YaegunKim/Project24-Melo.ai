export interface MusicGenerateRequest {
  prompt: string;
  duration: number;
  format?: 'mp3' | 'wav';
}

export interface MusicGenerateResponse {
  audioUrl: string;
  taskId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

/**
 * Next.js API Route(/api/generate)를 통해 MusicGPT API를 호출합니다.
 * 실제 API 엔드포인트는 서버 사이드 환경 변수(MUSICGPT_API_URL)로 구성합니다.
 */
export async function generateMusic(
  request: MusicGenerateRequest
): Promise<MusicGenerateResponse> {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    throw new Error(`Music generation failed: ${res.status}`);
  }

  return res.json() as Promise<MusicGenerateResponse>;
}
