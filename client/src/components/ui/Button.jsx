import clsx from "clsx";
import PropTypes from "prop-types";

export function Button({ variant, size, children, ...props }) {
  const variants = {
    colors: {
      primary: `bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500`,
      secondary: `border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`,
      success: `bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500`,
      danger: `bg-rose-600 hover:bg-rose-700 focus:ring-rose-500`,
      warning: `bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500`,
      dark: `bg-slate-600 hover:bg-slate-700 focus:ring-slate-500`,
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
    },
  };

  const buttonVariant =
    variants.colors[variant] ?? variants.colors["secondary"];
  const buttonSize = variants.size[size] ?? variants.size["sm"];

  const buttonStyles = clsx(
    "inline-flex items-center justify-center rounded-md text-white border border-transparent px-4 py-2 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto",
    buttonVariant,
    buttonSize
  );

  return (
    <button className={buttonStyles} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "dark",
  ]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
};
