"use server";

import { db } from "@/lib/db";
import { getIsAdmin } from "@/lib/is-admin";

export async function deleteUsers(userIds: string[]) {
  const isAdmin = await getIsAdmin();
  if (!isAdmin) throw new Error("Unauthorized");

  await db.user.deleteMany({
    where: { id: { in: userIds } },
  });
}
