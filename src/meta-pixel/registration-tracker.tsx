import { useEffect } from "react";
import { fbqTrack } from "./meta-pixel-event";

interface Props {
  userId: string;
}

export function registrationTracker({ userId }: Props) {
  useEffect(() => {
    // fbqTrack({
    //   eventName: "CompleteRegistration",
    //   options: {
    //     user_id: userId,
    //   },
    // });
  }, [userId]);
}
