console.log("this is route line 1")
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    console.log("HERE HERE HERE HERE HERE");
    const { username, email, password } = await request.json();

    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password, 
      },
    });

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ error: "Signup failed" }, { status: 400 });
  }
}