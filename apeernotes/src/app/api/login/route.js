import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // 1. Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    // 2. If user doesn't exist, stop here
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // 3. Compare the typed password with the hashed password in the DB
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // 4. Success! 
		
    console.log("success?");
    return NextResponse.json({
      message: "Login successful", 
      user: { username: user.username, email: user.email } 
    }, { status: 200 });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}