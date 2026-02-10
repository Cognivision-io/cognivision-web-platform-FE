import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, text } = await req.json();

    if (!imageBase64 || !text) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const response = await fetch('https://rf-model-embed.vercel.app/api/infer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workflow_url: 'https://serverless.roboflow.com/blog-embeds/workflows/model-segment-anything-3',
        imageBase64,
        text
      })
    });

    if (!response.ok) {
      throw new Error('SAM-3 API request failed');
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Inference error:', error);
    return NextResponse.json({ error: 'Inference failed' }, { status: 500 });
  }
}
