"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { FC, useState } from "react";

const OPTIONS = ["Home", "Works"];

const Tabs = () => {
  const [value, onChange] = useState("Home");

  return (
    <div className="w-full relative">
      <div className="flex space-x-2">
        {OPTIONS.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
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
