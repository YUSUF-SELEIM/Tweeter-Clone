import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcrypt';
import { generateToken } from '@/lib/auth';


export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  const token = generateToken(user.id);

  return NextResponse.json({ token });
}
