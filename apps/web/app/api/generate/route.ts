import { NextRequest, NextResponse } from 'next/server';

interface MusicGPTInitResponse {
  success: boolean;
  message?: string;
  task_id: string;
  conversion_id_1: string;
  conversion_id_2: string;
  eta: number;
  credit_estimate: number;
}

export async function POST(request: NextRequest) {
  const body = await request.json() as { prompt: string; duration: number; format?: string };
  const { prompt, duration } = body;

  const apiUrl = process.env.MUSICGPT_API_URL;
  const apiKey = process.env.MUSICGPT_API_KEY;

  if (!apiUrl || !apiKey) {
    await new Promise((r) => setTimeout(r, 2000));
    return NextResponse.json({
      taskId: `mock-${Date.now()}`,
      conversionId: `mock-conv-${Date.now()}`,
      eta: 0,
      status: 'mock',
    });
  }

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        prompt,
        make_instrumental: true,
        output_length: duration,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[/api/generate] MusicGPT error:', res.status, errText);
      return NextResponse.json(
        { error: 'Failed to initiate music generation', detail: errText, musicgptStatus: res.status },
        { status: 502 }
      );
    }

    const data = await res.json() as MusicGPTInitResponse;

    return NextResponse.json({
      taskId: data.task_id,
      conversionId: data.conversion_id_1,
      eta: data.eta,
      status: 'pending',
    });
  } catch (err) {
    console.error('[/api/generate]', err);
    return NextResponse.json({ error: 'Failed to generate music' }, { status: 500 });
  }
}
