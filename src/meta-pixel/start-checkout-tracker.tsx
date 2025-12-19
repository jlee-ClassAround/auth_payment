"use client";

import { useEffect } from "react";
import { fbqTrack } from "./meta-pixel-event";

interface Props {
  contentId: string;
  contentType: string;
  value: number;
}

export default function StartCheckoutTracker({
  contentId,
  value,
  contentType,
}: Props) {
  useEffect(() => {
    // fbqTrack({
    //   eventName: "InitiateCheckout",
    //   options: {
    //     value,
    //     currency: "KRW",
    //     content_ids: [contentId],
    //     content_type: contentType,
    //   },
    // });
  }, [contentId, contentType, value]);

  return null;
}
