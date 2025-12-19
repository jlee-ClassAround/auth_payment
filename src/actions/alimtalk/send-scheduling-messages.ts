"use server";

import { dateTimeFormat } from "@/utils/formats";
import {
  ALIMTALK_PROFILE_ID,
  ALIMTALK_SCHEDULING_API_ENDPOINT,
} from "./constants";

interface Props {
  phone: string;
  username: string;
  courseName: string;
  courseDate: Date;
  productTime: Date;
  roomLink: string;
  roomCode: string;
}

export const sendSchedulingMessages = async ({
  phone,
  username,
  courseName,
  courseDate,
  productTime,
  roomLink,
  roomCode,
}: Props) => {
  try {
    const koreanTime = new Date(courseDate.getTime() + 9 * 60 * 60 * 1000);

    // console.log("koreanTime", koreanTime);
    const response = await fetch(ALIMTALK_SCHEDULING_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "#{lecture}": courseName,
        "#{phone}": phone,
        "#{productTime}": productTime.toISOString().split("T")[0],
        "#{profile}": ALIMTALK_PROFILE_ID,
        "#{고객명}": username,
        "#{강좌명}": courseName,
        "#{강의시간}": dateTimeFormat(koreanTime),
        "#{입장코드}": roomCode,
        "#{링크명}": roomLink,
      }),
    });
    if (!response.ok) {
      console.log(response);
      return {
        success: false,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
};
