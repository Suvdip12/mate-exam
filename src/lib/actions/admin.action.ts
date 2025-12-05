"use server";

import { validateRequest } from "@/auth";
import { prisma } from "../prisma";

export async function approveUser(userId: string, role: string) {
  const { session } = await validateRequest();
  if (session?.user.role !== "super-admin") {
    throw new Error("You are not authorized to perform this action.");
  }
  await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  return {
    success: true,
    message: `User ${userId} approved as ${role}`,
  };
}

export async function rejectUser(userId: string) {
  const { session } = await validateRequest();
  if (session?.user.role !== "super-admin") {
    throw new Error("You are not authorized to perform this action.");
  }
  await prisma.user.delete({
    where: { id: userId },
  });
  return {
    success: true,
    message: `User ${userId} rejected`,
  };
}
