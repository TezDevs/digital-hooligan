import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants: Record<string, string> = {
    primary:
      "bg-[#FF3131] text-white hover:bg-[#ff5050] focus:ring-[#FF3131] focus:ring-offset-black",
    ghost:
      "border border-[#3C3C3C] text-white bg-transparent hover:bg-[#111111] focus:ring-[#1EFFCB] focus:ring-offset-black"
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
