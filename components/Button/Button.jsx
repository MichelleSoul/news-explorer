import { cn } from "@/lib/cn";

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "blue",
  className
}) {
  const baseClasses = "w-full h-16 rounded-full font-inter font-medium text-lg transition-colors duration-300 focus:outline-none";

  const variantClasses = () => {
    if (disabled) {
      return "bg-[#E6E8EB] text-[#B6BCBF] cursor-not-allowed border-none";
    }

    switch (variant) {
      case "blue":
        return "bg-[#2F71E5] shadow-xl text-white hover:bg-[#347EFF] active:bg-[#2A65CC] border-none";
      case "white":
        return "bg-white text-black hover:bg-[#D3D3D3] active:bg-[#D3D3D3] border-none";
      case "outline":
        return "bg-transparent text-white border border-white hover:bg-white/10 active:bg-white/20";
      case "outline-dark":
        return "bg-transparent text-black border border-black hover:bg-white/10 active:bg-white/20";
      default:
        return "bg-[#2F71E5] shadow-xl text-white hover:bg-[#347EFF] active:bg-[#2A65CC] border-none";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, variantClasses(), className)}
    >
      {children}
    </button>
  );
}
