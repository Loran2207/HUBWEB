import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "blue" | "ghost";
type Size = "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-lime text-on-lime hover:bg-lime-600",
  blue: "bg-blue text-white hover:brightness-95",
  ghost: "border-[0.5px] border-white/10 bg-white/5 text-fg hover:bg-white/10",
};

const SIZES: Record<Size, string> = {
  md: "px-5 py-3 text-[15px]",
  lg: "px-6 py-3.5 text-base",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  leftIcon?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  full,
  leftIcon,
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-btn font-display font-bold transition-all",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-lime/35",
        VARIANTS[variant],
        SIZES[size],
        full && "w-full",
        className,
      )}
      {...rest}
    >
      {leftIcon}
      {children}
    </button>
  );
}
