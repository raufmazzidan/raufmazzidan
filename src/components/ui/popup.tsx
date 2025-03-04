"use client";

import { AnimatePresence, motion } from "motion/react";
import { FC, useEffect } from "react";

export interface IPopupProps {
  isOpen: boolean;
  position?: {
    x: number;
    y: number;
  };
  onClose: () => void;
}

const Popup: FC<IPopupProps> = (props) => {
  const { isOpen, position = { x: 0, y: 0 }, onClose } = props;
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-teal-50 flex z-50"
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
          onClick={onClose}
        >
          <div className="bg-zinc-200 dark:bg-zinc-900 w-full h-full flex items-center flex-col gap-1 justify-center font-light text-sm">
            <p>click anywhere to close / press esc</p>
            <p className="text-xs text-accent">still in work 🚧</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
