"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const OPTIONS = ["Home", "Works", "Playground"];

const Tabs = () => {
  const [value, onChange] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      let currentTab = "Home";

      for (const tab of OPTIONS) {
        const section = document.getElementById(tab.toLowerCase());
        if (section) {
          const { top } = section.getBoundingClientRect();
          if (top <= 240) {
            currentTab = tab;
          }
        }
      }

      const isAtBottom =
        window.scrollY > 0 &&
        window.innerHeight + Math.ceil(window.scrollY) >=
          document.documentElement.scrollHeight - 24;

      if (isAtBottom) {
        currentTab = OPTIONS[OPTIONS.length - 1];
      }

      onChange(currentTab);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full relative">
      <div className="flex gap-2">
        {OPTIONS.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              if (
                document.documentElement.scrollHeight <= window.innerHeight
              ) {
                onChange(tab);
              }
              const section = document.getElementById(tab.toLowerCase());
              if (section) {
                const yOffset =
                  section.getBoundingClientRect().top + window.scrollY - 120;
                window.scrollTo({ top: yOffset, behavior: "smooth" });
              }
            }}
            className="relative px-4 py-1.5 cursor-pointer"
          >
            <span
              className={cn("relative z-10 text-sm transition", {
                "text-accent": value === tab,
              })}
            >
              {tab}
            </span>
            {value === tab && (
              <motion.div
                layoutId="nav-tab-bg"
                className="absolute inset-0 rounded bg-accent-foreground z-0"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
