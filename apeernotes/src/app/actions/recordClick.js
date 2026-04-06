'use server'

import prisma from '../../../lib/prisma'; 
import { cookies } from 'next/headers';

export async function recordClick(title, link) {
  try {
    const cookieStore = await cookies();
    const userIdString = cookieStore.get('userId')?.value;

    if (!userIdString) return { success: false, error: "No user" };

    const userId = parseInt(userIdString);

    await prisma.activity.create({
      data: {
        title: title,
        link: link,
        userId: userId,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Action Error:", error);
    return { success: false };
  }
}