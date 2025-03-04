"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const OPTIONS = ["Home", "Works"];

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
              const section = document.getElementById(tab.toLowerCase());
              if (section) {
                const yOffset =
                  section.getBoundingClientRect().top + window.scrollY - 120;
                window.scrollTo({ top: yOffset, behavior: "smooth" });
              }
            }}
            className="relative px-4 py-1.5"
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
                layoutId="bg"
                className="absolute bottom-0 left-0 right-0 w-full h-full rounded bg-accent-foreground z-0"
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
