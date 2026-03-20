"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

export async function syncUser() {
  try {
    const user = await currentUser();
    if (!user) return;

    const existingUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
    if (existingUser) return existingUser;

    const dbUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        phone: user.phoneNumbers[0]?.phoneNumber,
      },
    });

    return dbUser;
  } catch (error) {
    console.log("Error in syncUser server action", error);
  }
}

export async function updateUserBio(bio: string) {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    const updatedUser = await prisma.user.update({
      where: { clerkId: user.id },
      data: { bio },
    });

    return updatedUser;
  } catch (error) {
    console.log("Error in updateUserBio", error);
    throw error;
  }
}

export async function updateUserTheme(theme: string) {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    const updatedUser = await prisma.user.update({
      where: { clerkId: user.id },
      data: { chatTheme: theme },
    });

    return updatedUser;
  } catch (error) {
    console.log("Error in updateUserTheme", error);
    throw error;
  }
}

export async function getUserById(id: string) {
  try {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        bio: true,
        clerkId: true,
      },
    });
  } catch (error) {
    console.log("Error in getUserById", error);
  }
}
