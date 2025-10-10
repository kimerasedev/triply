import Image from "next/image";

interface CommunityCardProps {
  flag: string;
  content: string;
  variant?: "primary" | "secondary"; // 배경색 타입
}

export default function CommunityCard({
  flag,
  content,
  variant = "secondary",
}: CommunityCardProps) {
  const isPrimary = variant === "primary";

  // 배경색 & 폰트색 반대로
  const bgClass = isPrimary ? "bg-primary" : "bg-secondary";
  const textClass = isPrimary ? "text-secondary" : "text-primary";

  return (
    <div
      className={`w-[260px] h-[320px] rounded-2xl p-7 transition-colors duration-300 ${bgClass}`}
    >
      <Image
        src={`/icons/flags/${flag}.svg`}
        alt={flag}
        width={50}
        height={50}
      />

      <p className={`${textClass} text-sm mt-8 leading-snug`}>{content}</p>
    </div>
  );
}
