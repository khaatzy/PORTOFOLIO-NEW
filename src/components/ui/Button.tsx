"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  external?: boolean;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  icon,
  external,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 relative group overflow-hidden cursor-pointer select-none active:scale-[0.98]";

  const sizeStyles = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-3 gap-2",
    lg: "text-base px-8 py-4 gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-royal hover:bg-sky text-snow shadow-[0_0_20px_rgba(30,94,255,0.4)] hover:shadow-[0_0_30px_rgba(77,163,255,0.7)] border border-sky/30",
    secondary:
      "bg-navy/70 hover:bg-navy/95 text-snow border border-deep/80 hover:border-royal/60 backdrop-blur-md shadow-sm",
    outline:
      "border border-deep hover:border-royal/80 text-snow hover:text-sky bg-transparent backdrop-blur-sm",
    ghost: "text-mist hover:text-snow hover:bg-navy/30",
  };

  const combinedClassName = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
      </span>
      {variant === "primary" && (
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-snow/20 to-transparent transition-transform" />
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClassName}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {content}
    </button>
  );
}
