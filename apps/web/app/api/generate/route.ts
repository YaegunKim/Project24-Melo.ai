import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json() as { prompt: string; duration: number; format?: string };
  const { prompt, duration } = body;

  const apiUrl = process.env.MUSICGPT_API_URL;
  const apiKey = process.env.MUSICGPT_API_KEY;

  // API 미설정 시 개발용 placeholder 반환
  if (!apiUrl || !apiKey) {
    // 실제 환경에서는 제거하고 아래 API 호출 코드를 사용하세요
    await new Promise((r) => setTimeout(r, 2000)); // 생성 시뮬레이션
    return NextResponse.json({
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      taskId: `mock-${Date.now()}`,
      status: 'completed',
    });
  }

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, duration }),
    });

    if (!res.ok) {
      throw new Error(`MusicGPT API error: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('[/api/generate]', err);
    return NextResponse.json({ error: 'Failed to generate music' }, { status: 500 });
  }
}
