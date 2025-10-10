import Image, { StaticImageData } from "next/image";

interface ServiceIntroItemProps {
  icon: StaticImageData; // 아이콘 import
  title: string;
  subtitle: string;
}

export default function ServiceIntroItem({
  icon,
  title,
  subtitle,
}: ServiceIntroItemProps) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-3">
      <div className="border border-[#DEDEDE] rounded-full w-11 h-11 flex items-center justify-center">
        <Image src={icon} alt={title} width={32} height={32} />
      </div>
      <h2 className="text-lg text-text-primary">{title}</h2>
      <p className="font-light text-sm text-text-secondary whitespace-nowrap">
        {subtitle}
      </p>
    </div>
  );
}
