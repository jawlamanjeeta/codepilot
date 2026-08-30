import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "danger";
}

export function Badge({ className = "", variant = "default", children, ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors";

  const variantStyles = {
    default: "bg-blue-900/40 text-blue-300 border border-blue-800/60",
    secondary: "bg-zinc-800 text-zinc-300 border border-zinc-700",
    outline: "text-zinc-300 border border-zinc-700",
    success: "bg-emerald-950/50 text-emerald-300 border border-emerald-800/60",
    warning: "bg-amber-950/50 text-amber-300 border border-amber-800/60",
    danger: "bg-rose-950/50 text-rose-300 border border-rose-800/60",
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}
