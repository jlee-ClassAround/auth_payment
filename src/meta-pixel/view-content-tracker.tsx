"use client";

import { useEffect } from "react";
import { fbqTrack } from "./meta-pixel-event";

interface Props {
  contentId: string;
  contentName: string;
}

export default function ViewContentTracker({ contentId, contentName }: Props) {
  useEffect(() => {
    // fbqTrack({
    //   eventName: "ViewContent",
    //   options: {
    //     content_type: "course",
    //     content_ids: [contentId],
    //     content_name: contentName,
    //   },
    // });
  }, [contentId, contentName]);

  return null;
}
