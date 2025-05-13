"use client";

import { IPortofolio } from "@/containers/homepage/elements/portofolio/portofolio.types";
import { Maximize, SquareArrowOutUpRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { Badge } from "./badge";

interface IPortofolioCard {
  data: IPortofolio;
  onClick: (data: IPortofolio) => (e: any) => void;
}

const PortofolioCard: FC<IPortofolioCard> = (props) => {
  const { data, onClick } = props;

  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      onClick={onClick(data)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="transition select-none rounded border-accent-foreground hover:border-foreground/20 border w-full relative cursor-pointer overflow-hidden min-h-[171px]"
    >
      <motion.div
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: isHover ? 1 : 0.5,
          opacity: isHover ? 0.2 : 0,
        }}
        transition={{
          scale: {
            type: "spring",
            damping: 30,
            stiffness: 800,
          },
        }}
        className="absolute w-full min-h-[171px] h-full flex items-start justify-end"
      >
        <Image
          src={data.logo.src}
          alt={data.logo.alt}
          height={200}
          width={300}
          className="w-full mt-4 rotate-[15deg]"
        />
      </motion.div>
      <motion.div
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: isHover ? 1 : 0.5,
          opacity: isHover ? 1 : 0,
          y: isHover ? 0 : -40,
        }}
        transition={{
          scale: {
            delay: 0.3,
            type: "spring",
            damping: 30,
            stiffness: 800,
          },
        }}
        className="absolute top-3 right-3"
      >
        <Maximize className="text-accent" size={24} strokeWidth={2} />
      </motion.div>
      <div className="p-4 relative">
        <Image
          src={data.logo.src}
          alt={data.logo.alt}
          height={24}
          width={105}
          className="w-auto max-h-6 max-w-[100px]"
        />
        <h2 className="text-2xl mt-3">{data.title}</h2>
        <div className="min-h-5">
          {data.redirect && (
            <Link
              onClick={(e) => {
                e.stopPropagation();
              }}
              href={data.redirect.url}
              target="_blank"
              className="group inline-flex text-zinc-400 dark:text-zinc-600 decoration-foreground font-extralight text-sm cursor-pointer hover:underline items-center gap-1"
            >
              {data.redirect.label}
              <SquareArrowOutUpRight
                size={14}
                strokeWidth={1.5}
                className="hidden group-hover:block text-foreground"
              />
            </Link>
          )}
        </div>
        <div className="flex items-center gap-1 mt-3 flex-wrap">
          {data.stack.map((stack) => (
            <Badge key={stack}>{stack}</Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PortofolioCard;
