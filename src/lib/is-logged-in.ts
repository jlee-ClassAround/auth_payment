import { getSession } from "./session";

export const getIsLoggedIn = async () => {
  const session = await getSession();
  if (session.id) {
    return {
      userId: session.id,
    };
  } else {
    return false;
  }
};
