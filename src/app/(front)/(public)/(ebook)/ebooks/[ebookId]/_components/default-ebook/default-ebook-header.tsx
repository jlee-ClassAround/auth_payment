import Image from "next/image";

interface Props {
  image: string;
}

export function DefaultEbookHeader({ image }: Props) {
  return (
    <div className="relative aspect-video">
      <Image
        fill
        src={image}
        alt="전자책 대표이미지"
        className="object-cover md:rounded-xl md:border border-[#4E4E4E] shadow-sm"
      />
    </div>
  );
}
