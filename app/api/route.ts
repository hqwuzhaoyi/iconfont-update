import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const branch = searchParams.get('branch');
  const code = searchParams.get('code');
  const project = searchParams.get('project');
  console.debug('branch', branch);
  console.debug('code', code);
  console.debug('project', project);

  return NextResponse.json({ a: 1 });
}
