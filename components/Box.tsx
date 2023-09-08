import { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

/** pre-styled box that supports additional tailwind classes  */
const Box: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  return <div className={twMerge(className, `bg-neutral-900 rounded-lg h-fit w-full`)}>{children}</div>;
};

export default Box;
