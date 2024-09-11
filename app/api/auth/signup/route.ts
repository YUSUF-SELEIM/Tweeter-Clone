import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
        return NextResponse.json({ error: 'Username, email, and password are required' }, { status: 400 });
    }

    // Check if the email or username already exists
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { email },
                { username },
            ],
        },
    });

    if (existingUser) {
        if (existingUser.email === email) {
            return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
        }
        if (existingUser.username === username) {
            return NextResponse.json({ error: 'Username already in use' }, { status: 400 });
        }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
        data: { username, email, password: hashedPassword },
    });
    if (!newUser) {
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
    }

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
}
