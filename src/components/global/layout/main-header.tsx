import { firstNavs } from "@/constants/header-menus";
import { getIsAdmin } from "@/lib/is-admin";
import { getIsLoggedIn } from "@/lib/is-logged-in";
import { HeaderRowSecond } from "./header-row-second";
import { db } from "@/lib/db";
import { AdminButton } from "./admin-button";
import { ChannelTalkProvider } from "@/providers/channel-talk-provider";

export async function MainHeader() {
  const isLoggedIn = await getIsLoggedIn();
  const isAdmin = await getIsAdmin();
  const user = isLoggedIn
    ? await db.user.findUnique({
        where: {
          id: isLoggedIn.userId,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
          phone: true,
        },
      })
    : null;

  return (
    <>
      {isAdmin && <AdminButton />}
      <HeaderRowSecond
        firstNavs={firstNavs}
        isLoggedIn={isLoggedIn}
        username={user?.username || null}
        avatar={user?.avatar || null}
      />
      <ChannelTalkProvider
        user={user}
        pluginKey="eb40acc1-ce7c-42ef-87dc-5825e1e4d4d6"
      />
    </>
  );
}
