"use client";

import * as ChannelService from "@channel.io/channel-web-sdk-loader";
import { useState } from "react";
import { useEffect } from "react";

interface Props {
  user: {
    id: string;
    username: string | null;
    phone: string | null;
  } | null;
  pluginKey: string;
}

export function ChannelTalkProvider({ user, pluginKey }: Props) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  ChannelService.loadScript();
  ChannelService.boot({
    pluginKey,
    memberId: user?.id,
    profile: {
      name: user?.username || "",
      mobileNumber: user?.phone || "",
    },
  });

  return null;
}
