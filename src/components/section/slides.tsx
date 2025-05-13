"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Maximize, Minimize } from "lucide-react";
import { FC, useEffect, useState } from "react";

const variants = {
  enter: () => ({
    opacity: 0,
  }),
  center: {
    opacity: 1,
  },
  exit: () => ({
    opacity: 0,
  }),
};

interface ISldes {
  slides: {
    id: string;
    content: JSX.Element;
  }[];
  onClose: () => void;
}

const Slides: FC<ISldes> = ({ slides, onClose }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const onNext = () => {
    setActiveSlide((prev) => {
      const nextSlide = prev + 1;
      return nextSlide > slides.length - 1 ? 0 : nextSlide;
    });
  };

  const onPrev = () => {
    setActiveSlide((prev) => {
      const prevSlide = prev - 1;
      return prevSlide < 0 ? slides.length - 1 : prevSlide;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        onNext();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [showHelper, setShowHelper] = useState(true);

  return (
    <>
      <div className="relative h-full w-full">
        <AnimatePresence custom={activeSlide}>
          <motion.div
            key={slides[activeSlide].id}
            custom={activeSlide}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="absolute w-full h-full top-0 flex items-center justify-center text-xl font-semibold"
          >
            <div className="h-full w-full">{slides[activeSlide].content}</div>
          </motion.div>
        </AnimatePresence>
        <div className="flex gap-2 absolute bottom-4 left-4">
          {slides.map(({ id }, index) => (
            <button
              key={id}
              onClick={() => {
                const section = document.getElementById(id);
                if (section) {
                  const yOffset =
                    section.getBoundingClientRect().top + window.scrollY - 120;
                  window.scrollTo({ top: yOffset, behavior: "smooth" });
                }
                setActiveSlide(index);
              }}
              className="relative w-9 h-0.5 bg-foreground z-10"
            >
              {activeSlide === index && (
                <motion.div
                  layoutId="bg"
                  className="absolute bottom-0 left-0 right-0 w-full h-full bg-accent z-50"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        <motion.div
          key="show"
          initial={{ y: 400, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            width: showHelper ? 200 : 40,
            height: showHelper ? 180 : 40,
          }}
          exit={{ y: 400, opacity: 0 }}
          className={cn(
            "fixed bottom-4 right-4 bg-foreground rounded shadow-lg text-accent z-50 flex flex-col items-center justify-center max-w-[calc(100vw-32px)]",
            {
              "p-4 justify-start items-start": showHelper,
            }
          )}
        >
          {showHelper ? (
            <>
              <div className="flex items-center justify-between w-full">
                <p className="font-normal text">Navigations</p>
                <motion.button
                  onClick={() => setShowHelper((h) => !h)}
                  className="hover:text-teal-400"
                  whileHover={{
                    scale: 1.1,
                  }}
                >
                  <Minimize />
                </motion.button>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm font-light">
                  <button
                    onClick={onClose}
                    className="border border-accent rounded p-2 shadow hover:bg-accent min-w-10 flex items-center justify-center min-h-[30px] hover:text-white"
                  >
                    <p className="text-xs leading-none">esc</p>
                  </button>
                  <p>For close popup</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-light">
                  <button
                    onClick={onNext}
                    className="border border-accent rounded p-2 shadow hover:bg-accent min-w-10 flex items-center justify-center hover:text-white"
                  >
                    <ArrowRight strokeWidth={1.5} size={12} />
                  </button>
                  <p>For next slide</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-light">
                  <button
                    onClick={onPrev}
                    className="border border-accent rounded p-2 shadow hover:bg-accent min-w-10 flex items-center justify-center hover:text-white"
                  >
                    <ArrowLeft strokeWidth={1.5} size={12} />
                  </button>
                  <p>For previous slide</p>
                </div>
              </div>
            </>
          ) : (
            <motion.button
              onClick={() => setShowHelper((h) => !h)}
              className="hover:text-teal-400 m-auto"
              whileHover={{
                scale: 1.1,
              }}
            >
              <Maximize />
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Slides;
