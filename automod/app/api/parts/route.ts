import { NextRequest, NextResponse } from 'next/server';
import catalog from '@/lib/catalog/parts.json';
import type { Part, SectionId } from '@/lib/types';

export async function GET(req: NextRequest) {
  const section = req.nextUrl.searchParams.get('section') as SectionId | null;
  const parts = catalog.parts as Part[];
  const filtered = section ? parts.filter(p => p.section === section) : parts;
  return NextResponse.json(filtered);
}
