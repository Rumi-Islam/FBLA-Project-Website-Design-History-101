import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // 1. Import cookies
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    // 2. CREATE THE SESSION: Save the User's ID in a cookie
    const cookieStore = await cookies();
    cookieStore.set('userId', newUser.id.toString(), {
      httpOnly: true,     // Security: prevents hackers from stealing it via JS
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 60 * 60 * 24 * 7, // Stay logged in for 1 week
      path: '/',
    });

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "User already exists or DB error" }, { status: 400 });
  }
}