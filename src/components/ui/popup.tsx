"use client";

import { AnimatePresence, motion } from "motion/react";
import { FC, ReactNode, useEffect } from "react";
import { Kbd } from "./kbd";

export interface IPopupProps {
  isOpen: boolean;
  position?: {
    x: number;
    y: number;
  };
  onClose: () => void;
  content?: ReactNode;
}

const Popup: FC<IPopupProps> = (props) => {
  const { isOpen, position = { x: 0, y: 0 }, onClose, content } = props;
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !e.defaultPrevented) {
        onClose();
      }
    };

    if (isOpen) {
      window.document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 w-full h-full bg-accent-foreground flex z-[60]"
          initial={{
            clipPath: `circle(0px at ${position.x}px ${position.y}px)`,
          }}
          animate={{
            clipPath: "circle(150% at 50% 50%)",
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
          exit={{
            clipPath: `circle(0px at ${position.x}px ${position.y}px)`,
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
        >
          {content ? (
            <>{content}</>
          ) : (
            <div className="w-full h-full flex items-center flex-col gap-1 justify-center font-light text-sm">
              <p className="inline-flex items-center gap-1.5">
                click anywhere to close / press <Kbd>Esc</Kbd>
              </p>
              <p className="text-xs text-accent">still in work 🚧</p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
