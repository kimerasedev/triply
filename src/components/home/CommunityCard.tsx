import Image from "next/image";

interface CommunityCardProps {
  flag: string;
  content: string;
  variant?: "primary" | "secondary";
}

export default function CommunityCard({
  flag,
  content,
  variant = "secondary",
}: CommunityCardProps) {
  const isPrimary = variant === "primary";
  const bgClass = isPrimary ? "bg-primary" : "bg-secondary";
  const textClass = isPrimary ? "text-secondary" : "text-primary";

  return (
    <div
      className={`
        rounded-2xl p-6 md:p-7 transition-colors duration-300 ${bgClass}
        w-[220px] h-[280px] sm:w-[240px] sm:h-[300px] md:w-[260px] md:h-[320px]
        shrink-0
      `}
    >
      <Image
        src={`/icons/flags/${flag}.svg`}
        alt={flag}
        width={48}
        height={48}
        className="sm:w-[50px] sm:h-[50px]"
      />
      <p
        className={`${textClass} mt-6 md:mt-8 text-[13px] sm:text-sm leading-snug`}
      >
        {content}
      </p>
    </div>
  );
}
