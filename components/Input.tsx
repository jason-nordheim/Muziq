import { forwardRef, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, disabled, ...props }, ref) => {
    return (
      <input
        className={twMerge(
          `flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:font-medium placeholder:opacity-50 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none`,
          className
        )}
        ref={ref}
        type={type}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
