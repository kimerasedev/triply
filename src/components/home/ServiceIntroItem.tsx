import Image, { StaticImageData } from "next/image";

interface ServiceIntroItemProps {
  icon: StaticImageData;
  title: string;
  subtitle: string;
}

export default function ServiceIntroItem({
  icon,
  title,
  subtitle,
}: ServiceIntroItemProps) {
  return (
    <div
      className="
        w-full max-w-[320px]
        flex flex-col items-center text-center
        gap-3 max-[1280px]:gap-2.5
      "
    >
      <div
        className="
          border border-[#DEDEDE] rounded-full
          w-11 h-11 max-[1280px]:w-10 max-[1280px]:h-10
          flex items-center justify-center
        "
      >
        <Image
          src={icon}
          alt={title}
          width={24}
          height={24}
          className="max-[1280px]:w-5 max-[1280px]:h-5"
        />
      </div>

      <h3
        className="
          text-lg max-[1280px]:text-base
          text-text-primary font-medium
        "
      >
        {title}
      </h3>

      <p
        className="
          font-light
          text-sm max-[1280px]:text-[13px]
          text-text-secondary leading-relaxed
        "
      >
        {subtitle}
      </p>
    </div>
  );
}
