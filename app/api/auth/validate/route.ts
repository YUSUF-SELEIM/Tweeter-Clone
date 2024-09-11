import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function POST(request: Request) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1]; // Extract Bearer token

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  const decoded = verifyToken(token); 
  if (!decoded) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }

  return NextResponse.json({ valid: true, userId: decoded.userId });
}
