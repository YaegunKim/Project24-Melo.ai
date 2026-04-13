import { NextRequest, NextResponse } from 'next/server';

const MUSICGPT_BY_ID_URL = 'https://api.musicgpt.com/api/public/v1/byId';

interface MusicGPTConversion {
  task_id: string;
  conversion_id_1: string;
  conversion_id_2: string;
  status: string;
  message: string;
  conversion_path_1: string;
  conversion_path_2: string;
  conversion_path_wav_1: string;
  conversion_path_wav_2: string;
  title_1: string;
  title_2: string;
  createdAt: string;
  updatedAt: string;
}

interface MusicGPTStatusResponse {
  success: boolean;
  message?: string;
  conversion: MusicGPTConversion;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const conversionId = searchParams.get('conversionId');

  if (!conversionId) {
    return NextResponse.json({ error: 'conversionId is required' }, { status: 400 });
  }

  const apiKey = process.env.MUSICGPT_API_KEY;

  // mock 모드
  if (!apiKey || conversionId.startsWith('mock-')) {
    return NextResponse.json({
      status: 'completed',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    });
  }

  try {
    const url = `${MUSICGPT_BY_ID_URL}?conversionType=MUSIC_AI&conversion_id=${encodeURIComponent(conversionId)}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[/api/status] MusicGPT error:', res.status, errText);
      return NextResponse.json({ error: 'Failed to fetch status' }, { status: 502 });
    }

    const data = await res.json() as MusicGPTStatusResponse;
    const conversion = data.conversion;

    const normalizedStatus = conversion.status?.toUpperCase();

    if (normalizedStatus === 'COMPLETED') {
      return NextResponse.json({
        status: 'completed',
        audioUrl: conversion.conversion_path_1,
      });
    }

    if (normalizedStatus === 'FAILED') {
      return NextResponse.json({ status: 'failed' });
    }

    return NextResponse.json({ status: 'processing', _debug_rawStatus: conversion.status });
  } catch (err) {
    console.error('[/api/status]', err);
    return NextResponse.json({ error: 'Failed to fetch status' }, { status: 500 });
  }
}
