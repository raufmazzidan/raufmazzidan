"use client";

import { IPlayground } from "@/containers/homepage/elements/playground/playground.types";
import { ArrowUpRight, SquareArrowOutUpRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { FC, useState } from "react";
import { Badge } from "./badge";

interface IPlaygroundCard {
  data: IPlayground;
}

const PlaygroundCard: FC<IPlaygroundCard> = ({ data }) => {
  const [isHover, setIsHover] = useState(false);
  const Icon = data.icon;

  const allLinks = [data.primaryLink, ...(data.secondaryLinks ?? [])];

  const handleCardClick = () => {
    window.open(data.primaryLink.url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      role="link"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="transition select-none rounded border-accent-foreground hover:border-foreground/20 border w-full relative cursor-pointer overflow-hidden min-h-[171px] focus-visible:outline-none focus-visible:border-accent"
    >
      {/* Background tilted icon watermark (matches PortofolioCard hover feel) */}
      <motion.div
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: isHover ? 1 : 0.5,
          opacity: isHover ? 0.08 : 0,
        }}
        transition={{
          scale: {
            type: "spring",
            damping: 30,
            stiffness: 800,
          },
        }}
        className="pointer-events-none absolute inset-0 flex items-center justify-end pr-4"
      >
        <Icon size={160} strokeWidth={1} className="rotate-15" />
      </motion.div>

      {/* Top-right external link indicator */}
      <motion.div
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: isHover ? 1 : 0.5,
          opacity: isHover ? 1 : 0,
          y: isHover ? 0 : 40,
          x: isHover ? 0 : -40,
        }}
        transition={{
          scale: {
            delay: 0.3,
            type: "spring",
            damping: 30,
            stiffness: 800,
          },
        }}
        className="pointer-events-none absolute top-3 right-3"
      >
        <ArrowUpRight className="text-accent" size={24} strokeWidth={2} />
      </motion.div>

      <div className="p-4 relative flex flex-col h-full">
        <div className="h-6 inline-flex items-center text-accent">
          <Icon size={22} strokeWidth={1.75} />
        </div>

        <h2 className="text-2xl mt-3">{data.title}</h2>

        <div className="min-h-5 flex flex-col items-start gap-0.5 mt-0.5">
          {allLinks.map((link) => (
            <Link
              key={link.url}
              onClick={(e) => {
                e.stopPropagation();
              }}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex text-zinc-400 dark:text-zinc-600 decoration-foreground font-extralight text-sm cursor-pointer hover:underline items-center gap-1"
            >
              {link.label}
              <SquareArrowOutUpRight
                size={14}
                strokeWidth={1.5}
                className="hidden group-hover:block text-foreground"
              />
            </Link>
          ))}
        </div>

        <p className="text-xs font-light text-zinc-500 dark:text-zinc-400 mt-2.5 leading-relaxed">
          {data.description}
        </p>

        <div className="flex items-center gap-1 mt-auto pt-3 flex-wrap">
          {data.stack.map((stack) => (
            <Badge key={stack}>{stack}</Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PlaygroundCard;
