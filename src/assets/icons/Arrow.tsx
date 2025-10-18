interface ArrowIconProps {
  className?: string; // Tailwind 색상 클래스 전달용
}
export default function ArrowIcon({ className = "" }: ArrowIconProps) {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.6291 0.829028L21.2001 9.40203C21.2813 9.47945 21.3459 9.57254 21.3901 9.67568C21.4343 9.77881 21.457 9.88983 21.457 10.002C21.457 10.1142 21.4343 10.2252 21.3901 10.3284C21.3459 10.4315 21.2813 10.5246 21.2001 10.602L12.6291 19.172L11.4291 17.972L18.5431 10.858L0.886081 10.858L0.886081 9.14303L18.5421 9.14303L11.4281 2.02903L12.6291 0.829028Z"
        fill="currentColor"
      />
    </svg>
  );
}
