interface ServiceDetailItemProps {
  order: string; // 01, 02, 03 표시용
  title: string;
  description: string;
}

export default function ServiceDetailItem({
  order,
  title,
  description,
}: ServiceDetailItemProps) {
  return (
    <div className="relative w-[500px] pt-10">
      {/* 순서 */}
      <span className="absolute -top-8 -left-2 text-9xl leading-none font-bold text-primary/6 select-none">
        {order}
      </span>

      <div className="relative z-10 mt-5 ml-10">
        {/* 타이틀 */}
        <h3 className="text-text-primary text-4xl font-bold whitespace-pre-line leading-snug ">
          {title}
        </h3>
        {/* 설명 */}
        <p className="text-text-secondary mt-3">{description}</p>
      </div>
    </div>
  );
}
