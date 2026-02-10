import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const annotations = await req.json();

    const annotationsDir = path.join(process.cwd(), 'public', 'annotations');
    await mkdir(annotationsDir, { recursive: true });

    const filename = `annotation-${Date.now()}.json`;
    const filepath = path.join(annotationsDir, filename);
    
    await writeFile(filepath, JSON.stringify(annotations, null, 2));

    return NextResponse.json({
      success: true,
      filename,
      path: `/annotations/${filename}`
    });
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json({ error: 'Save failed' }, { status: 500 });
  }
}
