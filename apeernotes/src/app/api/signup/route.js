import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'; // 1. Import bcrypt

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    // 2. Hash the password (10 is the "salt rounds" - the complexity)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword, // 3. Save the scrambled version
      },
    });

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "User already exists or DB error" }, { status: 400 });
  }
}