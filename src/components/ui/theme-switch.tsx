"use client";

import { useTheme } from "@/helper/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { motion, AnimatePresence } from "framer-motion";

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      className="shadow transition h-9 w-9 p-0 relative overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, color: "#eab308" }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.3,
              color: { delay: 0.2 },
              ease: "easeInOut",
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun size={24} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon size={24} />
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
};

export default ThemeSwitch;
