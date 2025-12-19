import { getIsAdmin } from "@/lib/is-admin";
import { sendKakaoAlimtalk } from "@/lib/solapi";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const isAdmin = await getIsAdmin();
    if (!isAdmin) {
      return new Response("Unauthorized", { status: 401 });
    }

    const {
      templateId,
      sendDatas,
    }: {
      templateId: string;
      sendDatas: {
        to: string;
        username?: string;
      }[];
    } = await req.json();

    sendKakaoAlimtalk({
      templateId,
      sendDatas,
    });

    return NextResponse.json({});
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
