import { db } from "./db";
import { getSession } from "./session";

export const getIsAdmin = async () => {
  try {
    const session = await getSession();
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        roleId: true,
      },
    });

    return Boolean(user?.roleId === "admin");
  } catch {
    return false;
  }
};
