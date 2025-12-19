"use server";

import { db } from "@/lib/db";
import { getIsAdmin } from "@/lib/is-admin";

export async function deleteUser(userId: string) {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) throw new Error("Unauthorized");

  await db.user.delete({
    where: { id: userId },
  });
}
