import { getCachedSingleEbook } from "@/actions/ebooks/get-single-ebook";
import { notFound } from "next/navigation";
import { DefaultEbook } from "./_components/default-ebook/default-ebook";
import { getCachedSiteSetting } from "@/queries/global/site-setting";

interface Props {
  params: Promise<{ [key: string]: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { ebookId } = await params;
  const ebook = await getCachedSingleEbook(ebookId);
  return {
    title: `${ebook?.title ?? "전자책"}`,
    description: ebook?.description ?? "",
  };
}

export default async function EbookPage({ params }: Props) {
  const { ebookId } = await params;
  const ebook = await getCachedSingleEbook(ebookId);
  if (!ebook) return notFound();

  const siteSetting = await getCachedSiteSetting();

  return (
    <>
      <DefaultEbook ebook={ebook} siteSetting={siteSetting} />
    </>
  );
}
