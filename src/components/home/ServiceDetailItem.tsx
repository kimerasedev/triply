interface ServiceDetailItemProps {
  order: string; // 01, 02, 03
  title: string;
  description: string;
}

export default function ServiceDetailItem({
  order,
  title,
  description,
}: ServiceDetailItemProps) {
  return (
    <div className="relative w-full max-w-[560px]">
      <span className="absolute -top-6 -left-1 text-7xl sm:text-8xl lg:text-9xl leading-none font-bold text-primary/10 select-none">
        {order}
      </span>

      <div className="relative z-10 mt-8 sm:mt-10 ml-6 sm:ml-8">
        <h3
          className="text-text-primary font-bold leading-snug whitespace-pre-line
                       text-2xl md:text-3xl lg:text-4xl"
        >
          {title}
        </h3>
        <p className="mt-3 text-sm md:text-base text-text-secondary whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  );
}
