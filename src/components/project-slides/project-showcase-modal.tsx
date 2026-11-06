"use client";

import { Badge } from "@/components/ui/badge";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IPortofolio } from "@/containers/homepage/elements/portofolio/portofolio.types";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Maximize,
  SquareArrowOutUpRight,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";

interface ShowcaseItem {
  src: string;
  alt: string;
  originalIndex: number;
}

interface WalkingColumnProps {
  items: ShowcaseItem[];
  direction: "up" | "down";
  speed: number;
  isSlowed: boolean;
  isPaused: boolean;
  onSelectImage: (originalIndex: number) => void;
  className?: string;
}

const WalkingColumn: FC<WalkingColumnProps> = ({
  items,
  direction,
  speed,
  isSlowed,
  isPaused,
  onSelectImage,
  className,
}) => {
  const firstCopyRef = useRef<HTMLDivElement>(null);
  const trackHeightRef = useRef(0);
  const offsetRef = useRef(0);
  const velocityRef = useRef(speed);
  const initializedDownRef = useRef(false);
  const y = useMotionValue(0);

  useEffect(() => {
    const el = firstCopyRef.current;
    if (!el) return;

    const updateHeight = () => {
      const height = el.offsetHeight;
      trackHeightRef.current = height;
      if (direction === "down" && !initializedDownRef.current && height > 0) {
        initializedDownRef.current = true;
        y.set(-height);
      }
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);

    return () => observer.disconnect();
  }, [direction, y, items]);

  useAnimationFrame((_, delta) => {
    const height = trackHeightRef.current;
    if (height <= 0) return;

    const targetSpeed = isPaused ? 0 : isSlowed ? speed * 0.22 : speed;
    velocityRef.current +=
      (targetSpeed - velocityRef.current) * Math.min(1, delta / 180);

    const dt = Math.min(delta, 50) / 1000;
    offsetRef.current = (offsetRef.current + velocityRef.current * dt) % height;

    if (direction === "up") {
      y.set(-offsetRef.current);
    } else {
      y.set(-height + offsetRef.current);
    }
  });

  const renderCards = (copyKey: string) =>
    items.map((item, idx) => (
      <button
        key={`${copyKey}-${item.originalIndex}-${idx}`}
        type="button"
        onClick={() => onSelectImage(item.originalIndex)}
        className="group relative w-full text-left rounded border border-foreground/10 hover:border-accent bg-background p-1.5 transition cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:border-accent"
      >
        <div className="relative overflow-hidden rounded-xs bg-[#f5f7fa]">
          <Image
            src={item.src}
            alt={item.alt}
            width={1024}
            height={640}
            className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          />
        </div>

        <div className="absolute top-3 right-3 rounded bg-background/90 border border-foreground/10 p-1.5 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
          <Maximize className="text-accent" size={16} strokeWidth={2} />
        </div>

        <span className="absolute bottom-3 left-3 rounded bg-background/90 border border-foreground/10 px-1.5 py-0.5 text-[10px] font-extralight text-zinc-500 dark:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {String(item.originalIndex + 1).padStart(2, "0")}
        </span>
      </button>
    ));

  return (
    <div className={cn("overflow-hidden h-full", className)}>
      <motion.div style={{ y }} className="will-change-transform">
        <div ref={firstCopyRef} className="flex flex-col gap-4 pb-4">
          {renderCards("a")}
        </div>
        <div aria-hidden="true" className="flex flex-col gap-4 pb-4">
          {renderCards("b")}
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectShowcaseModalProps {
  project: IPortofolio;
  onClose: () => void;
}

const contentContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.06,
    },
  },
};

const contentItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 26,
    },
  },
};

const keycapClass = (isActive: boolean) =>
  cn(
    "border border-foreground/10 border-b-2 transition-all duration-100",
    isActive && "bg-accent text-white border-accent translate-y-px",
  );

const ProjectShowcaseModal: FC<ProjectShowcaseModalProps> = ({
  project,
  onClose,
}) => {
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const keyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const images = project.projectShowcase;
  const totalScreens = images.length;

  const flashKey = useCallback((key: string) => {
    setActiveKey(key);
    if (keyTimeoutRef.current) clearTimeout(keyTimeoutRef.current);
    keyTimeoutRef.current = setTimeout(() => {
      setActiveKey(null);
    }, 200);
  }, []);

  useEffect(() => {
    return () => {
      if (keyTimeoutRef.current) clearTimeout(keyTimeoutRef.current);
    };
  }, []);

  const columnItems = useMemo(() => {
    const indexed: ShowcaseItem[] = images.map((img, i) => ({
      ...img,
      originalIndex: i,
    }));

    if (indexed.length === 0) return [];

    const result: ShowcaseItem[] = [];
    while (result.length < 4) {
      result.push(...indexed);
    }
    return result;
  }, [images]);

  const handleNextLightbox = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % totalScreens));
  }, [totalScreens]);

  const handlePrevLightbox = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? 0 : (prev - 1 + totalScreens) % totalScreens,
    );
  }, [totalScreens]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex !== null) {
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
          flashKey("Escape");
          setSelectedIndex(null);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          flashKey("ArrowRight");
          handleNextLightbox();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          flashKey("ArrowLeft");
          handlePrevLightbox();
        }
        return;
      }

      if (totalScreens > 0 && e.code === "Space") {
        if (
          e.target instanceof HTMLElement &&
          e.target.closest("button, a, input, textarea")
        ) {
          return;
        }
        e.preventDefault();
        flashKey("Space");
        setIsManualPaused((prev) => !prev);
      } else if (totalScreens > 0 && e.key === "ArrowRight") {
        e.preventDefault();
        flashKey("ArrowRight");
        setSelectedIndex(0);
      } else if (totalScreens > 0 && e.key === "ArrowLeft") {
        e.preventDefault();
        flashKey("ArrowLeft");
        setSelectedIndex(totalScreens - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [
    selectedIndex,
    totalScreens,
    handleNextLightbox,
    handlePrevLightbox,
    flashKey,
  ]);

  return (
    <TooltipProvider delay={150}>
      <div className="relative h-screen w-screen overflow-y-auto lg:overflow-hidden bg-accent-foreground text-foreground flex flex-col lg:flex-row">
        {/* Top-right close button with Kbd inside Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="fixed top-5 right-5 z-40"
        >
          <Tooltip>
            <TooltipTrigger
              render={
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close popup"
                  className="transition bg-background hover:bg-background/70 border border-foreground/10 hover:border-accent rounded p-1.5 inline-flex items-center justify-center cursor-pointer"
                />
              }
            >
              <X size={16} />
            </TooltipTrigger>
            <TooltipContent side="left">
              Close <Kbd>Esc</Kbd>
            </TooltipContent>
          </Tooltip>
        </motion.div>

        {/* LEFT SECTION: Single-Column Walking Showcase */}
        {totalScreens > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            onMouseEnter={() => setIsGalleryHovered(true)}
            onMouseLeave={() => setIsGalleryHovered(false)}
            className="relative w-full lg:w-[50%] h-80 sm:h-105 lg:h-screen shrink-0 px-4 sm:px-8 lg:px-10 overflow-hidden"
          >
            <div className="relative z-10 h-full w-full max-w-2xl mx-auto mask-[linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)]">
              <WalkingColumn
                items={columnItems}
                direction="up"
                speed={38}
                isSlowed={isGalleryHovered}
                isPaused={selectedIndex !== null || isManualPaused}
                onSelectImage={setSelectedIndex}
              />
            </div>

            {/* Minimal status caption */}
            <div className="hidden sm:inline-flex items-center gap-2 pointer-events-none absolute bottom-4 left-4 z-20 rounded bg-background/90 border border-foreground/10 px-2.5 py-1 text-xs font-extralight text-zinc-500 dark:text-zinc-400">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-[1px] transition-colors",
                  isManualPaused ? "bg-zinc-400" : "bg-accent",
                )}
              />
              <span>
                {isManualPaused
                  ? "paused"
                  : isGalleryHovered
                    ? "click any image to expand"
                    : `${totalScreens} screens · hover to slow`}
              </span>
            </div>
          </motion.div>
        )}

        {/* RIGHT SECTION: Project Explanation */}
        <div className="relative w-full lg:h-screen lg:overflow-y-auto overflow-x-hidden">
          <motion.div
            variants={contentContainerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-3xl mx-auto px-6 pt-8 pb-16 sm:px-10 lg:px-10 lg:py-20 flex flex-col justify-center min-h-full"
          >
            {/* Logo */}
            <motion.div variants={contentItemVariants}>
              <Image
                src={project.logo.src}
                alt={project.logo.alt}
                height={28}
                width={130}
                className="w-auto max-h-7 max-w-32.5"
              />
            </motion.div>

            {/* Title & Redirect */}
            <motion.div variants={contentItemVariants} className="mt-4">
              <h1 className="text-2xl sm:text-3xl font-normal">
                {project.title}
              </h1>
              {project.redirect && (
                <div className="min-h-5 mt-0.5">
                  <Link
                    href={project.redirect.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex text-zinc-400 dark:text-zinc-500 decoration-foreground font-extralight text-sm cursor-pointer hover:underline items-center gap-1"
                  >
                    {project.redirect.label}
                    <SquareArrowOutUpRight
                      size={14}
                      strokeWidth={1.5}
                      className="hidden group-hover:block text-foreground"
                    />
                  </Link>
                </div>
              )}
            </motion.div>

            <motion.div variants={contentItemVariants}>
              <Separator className="my-5 bg-foreground/10" />
            </motion.div>

            {/* Overview */}
            <motion.div variants={contentItemVariants}>
              <p className="text-sm font-light leading-relaxed text-foreground/90">
                {project.longDescription}
              </p>
            </motion.div>

            {/* Key Features */}
            <motion.div variants={contentItemVariants} className="mt-6">
              <h2 className="text-xs font-normal text-zinc-400 dark:text-zinc-500">
                Key Features
              </h2>
              <ul className="mt-2 space-y-1.5">
                {project.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2.5 text-sm font-light text-foreground/90"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-[1px] bg-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tech Stack */}
            <motion.div variants={contentItemVariants} className="mt-6">
              <h2 className="text-xs font-normal text-zinc-400 dark:text-zinc-500">
                Tech Stack
              </h2>
              <div className="flex items-center gap-1 mt-2 flex-wrap">
                {project.stack.map((tech) => (
                  <Badge
                    key={tech}
                    className="bg-background text-[11px] px-2 py-0.5 border border-foreground/5 hover:border-accent transition"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* View Gallery Button with Tooltip */}
            {totalScreens > 0 && (
              <motion.div variants={contentItemVariants} className="mt-7">
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <button
                        type="button"
                        onClick={() => setSelectedIndex(0)}
                        className="group transition bg-background hover:bg-background/70 border border-foreground/10 hover:border-accent rounded px-3 py-1.5 inline-flex items-center gap-2 text-xs font-light cursor-pointer"
                      />
                    }
                  >
                    <Maximize
                      size={13}
                      className="text-accent"
                      strokeWidth={2}
                    />
                    <span>View all screens ({totalScreens})</span>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Browse screens{" "}
                    <KbdGroup>
                      <Kbd>
                        <ArrowLeft />
                      </Kbd>
                      <Kbd>
                        <ArrowRight />
                      </Kbd>
                    </KbdGroup>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* UNIFIED FLOATING SHORTCUT DOCK (Raycast / Linear style) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          onClick={(e) => e.stopPropagation()}
          className="hidden sm:inline-flex fixed bottom-4 right-5 z-55 items-center gap-3 rounded bg-background/90 backdrop-blur-md border border-foreground/10 px-3 py-1.5 text-xs font-extralight text-zinc-500 dark:text-zinc-400 select-none shadow-xs"
        >
          {selectedIndex === null ? (
            <>
              {totalScreens > 0 && (
                <>
                  <div
                    onClick={() => setIsManualPaused((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"
                  >
                    <Kbd
                      className={keycapClass(
                        activeKey === "Space" || isManualPaused,
                      )}
                    >
                      Space
                    </Kbd>
                    <span>{isManualPaused ? "resume" : "pause"}</span>
                  </div>

                  <Separator
                    orientation="vertical"
                    className="h-3 self-center m-auto bg-foreground/10"
                  />

                  <div
                    onClick={() => setSelectedIndex(0)}
                    className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"
                  >
                    <KbdGroup>
                      <Kbd className={keycapClass(activeKey === "ArrowLeft")}>
                        <ArrowLeft />
                      </Kbd>
                      <Kbd className={keycapClass(activeKey === "ArrowRight")}>
                        <ArrowRight />
                      </Kbd>
                    </KbdGroup>
                    <span>screens</span>
                  </div>

                  <Separator
                    orientation="vertical"
                    className="h-3 self-center m-auto bg-foreground/10"
                  />
                </>
              )}
              <div
                onClick={onClose}
                className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"
              >
                <Kbd className={keycapClass(activeKey === "Escape")}>Esc</Kbd>
                <span>close</span>
              </div>
            </>
          ) : (
            <>
              {totalScreens > 1 && (
                <>
                  <div className="inline-flex items-center gap-1.5">
                    <KbdGroup>
                      <Kbd
                        onClick={handlePrevLightbox}
                        className={cn(
                          keycapClass(activeKey === "ArrowLeft"),
                          "pointer-events-auto cursor-pointer",
                        )}
                      >
                        <ArrowLeft />
                      </Kbd>
                      <Kbd
                        onClick={handleNextLightbox}
                        className={cn(
                          keycapClass(activeKey === "ArrowRight"),
                          "pointer-events-auto cursor-pointer",
                        )}
                      >
                        <ArrowRight />
                      </Kbd>
                    </KbdGroup>
                    <span>navigate</span>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="h-3 self-center m-auto bg-foreground/10"
                  />
                </>
              )}
              <div
                onClick={() => setSelectedIndex(null)}
                className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"
              >
                <Kbd className={keycapClass(activeKey === "Escape")}>Esc</Kbd>
                <span>back</span>
              </div>
            </>
          )}
        </motion.div>

        {/* CLICK-TO-ZOOM LIGHTBOX OVERLAY */}
        <AnimatePresence>
          {selectedIndex !== null && images[selectedIndex] && (
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedIndex(null)}
              className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col items-center justify-between p-5"
            >
              {/* Lightbox Header */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-5xl flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2 text-xs font-light">
                  <span className="rounded bg-accent-foreground border border-foreground/10 px-2 py-0.5 text-accent">
                    {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                    {String(totalScreens).padStart(2, "0")}
                  </span>
                  <span className="text-zinc-400 dark:text-zinc-500 font-extralight truncate">
                    {project.title}
                  </span>
                </div>

                <Tooltip>
                  <TooltipTrigger
                    render={
                      <button
                        type="button"
                        onClick={() => setSelectedIndex(null)}
                        aria-label="Close screen viewer"
                        className="transition bg-accent-foreground hover:bg-accent-foreground/70 border border-foreground/10 hover:border-accent rounded p-1.5 inline-flex items-center justify-center cursor-pointer"
                      />
                    }
                  >
                    <X size={16} />
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    Back <Kbd>Esc</Kbd>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Lightbox Main Stage */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-3 min-h-0"
              >
                {totalScreens > 1 && (
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <button
                          type="button"
                          onClick={handlePrevLightbox}
                          aria-label="Previous screen"
                          className="absolute left-0 sm:left-2 z-10 transition bg-accent-foreground hover:bg-accent hover:text-white border border-foreground/10 hover:border-accent rounded p-2 inline-flex items-center justify-center cursor-pointer"
                        />
                      }
                    >
                      <ArrowLeft size={16} strokeWidth={1.5} />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      Previous{" "}
                      <Kbd>
                        <ArrowLeft />
                      </Kbd>
                    </TooltipContent>
                  </Tooltip>
                )}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedIndex}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="max-h-full max-w-full flex items-center justify-center rounded border border-foreground/10 bg-accent-foreground p-1.5"
                  >
                    <Image
                      src={images[selectedIndex].src}
                      alt={images[selectedIndex].alt}
                      width={1400}
                      height={900}
                      className="max-h-[75vh] w-auto max-w-[86vw] sm:max-w-220 object-contain rounded-xs bg-[#f5f7fa]"
                    />
                  </motion.div>
                </AnimatePresence>

                {totalScreens > 1 && (
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <button
                          type="button"
                          onClick={handleNextLightbox}
                          aria-label="Next screen"
                          className="absolute right-0 sm:right-2 z-10 transition bg-accent-foreground hover:bg-accent hover:text-white border border-foreground/10 hover:border-accent rounded p-2 inline-flex items-center justify-center cursor-pointer"
                        />
                      }
                    >
                      <ArrowRight size={16} strokeWidth={1.5} />
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      Next{" "}
                      <Kbd>
                        <ArrowRight />
                      </Kbd>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>

              {/* Lightbox Progress Bars */}
              {totalScreens > 1 ? (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 pb-1"
                >
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Go to screen ${idx + 1}`}
                      onClick={() => setSelectedIndex(idx)}
                      className={cn(
                        "h-0.5 transition-all cursor-pointer",
                        selectedIndex === idx
                          ? "w-9 bg-accent"
                          : "w-5 bg-foreground/20 hover:bg-foreground/40",
                      )}
                    />
                  ))}
                </div>
              ) : (
                <div className="pb-1" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  );
};

export default ProjectShowcaseModal;
