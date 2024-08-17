import classFusion from "@/helper/class-fusion";
import { FC } from "react";

const Tags: FC<React.HTMLProps<HTMLDivElement>> = (props) => {
  return (
    <div
      {...props}
      className={classFusion(
        "text-[10px] font-light bg-slate-300 px-1 py-[1px] rounded inline-block",
        props.className
      )}
    />
  );
};

export default Tags;
