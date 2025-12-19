import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "고객센터",
};

export default function Support() {
  return redirect("/support/faqs");
}
