import { NextRequest, NextResponse } from 'next/server';

async function imageUrlToBase64(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch image');
  }
  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  return base64;
}

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, imageUrl, text } = await req.json();

    if ((!imageBase64 && !imageUrl) || !text) {
      return NextResponse.json({ error: 'Missing required fields (imageBase64 or imageUrl, and text)' }, { status: 400 });
    }

    // Convert imageUrl to base64 if provided
    let base64Image = imageBase64;
    if (imageUrl && !imageBase64) {
      base64Image = await imageUrlToBase64(imageUrl);
    }

    const response = await fetch('https://rf-model-embed.vercel.app/api/infer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workflow_url: 'https://serverless.roboflow.com/blog-embeds/workflows/model-segment-anything-3',
        imageBase64: base64Image,
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
