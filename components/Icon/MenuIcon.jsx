import { cn } from "../../src/lib/cn";

export default function MenuIcon({ open, variant }) {
  const fillClass = variant === "dark" ? "fill-[#1A1B22]" : "fill-white";

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      {/* Top bar */}
      <rect
        x="4"
        y="8"
        width="16"
        height="2"
        className={cn(
          fillClass,
          "transition-all duration-300 origin-[13px_12px]",
          open && "-translate-x-0.5 translate-y-0.75 rotate-45"
        )}
      />

      {/* Bottom bar */}
      <rect
        x="4"
        y="14"
        width="16"
        height="2"
        className={cn(
          fillClass,
          "transition-all duration-300 origin-[13px_12px]",
          open && "-translate-x-0.5 -translate-y-0.75 -rotate-45"
        )}
      />
    </svg>
  );
}
