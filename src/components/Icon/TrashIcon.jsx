import { cn } from "@/lib/cn";

export default function TrashIcon({ variant = "default" }) {
  const fillClass =
    variant === "hover"
      ? "fill-[#1A1B22]"
      : "fill-[#B6BCBF]";

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 3H9V5H3V7H21V5H15V3ZM5 9V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V9H17V20H7V9H5ZM9 9L9 18H11L11 9H9ZM13 9V18H15V9H13Z"
        className={cn(fillClass, "transition-colors duration-300")}
      />
    </svg>
  );
}
