"use client";

import { useTheme } from "@/helper/hooks/useTheme";
import { Icon } from "@iconify/react";

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="rounded bg-slate-800 dark:bg-white p-2 border shadow transition fixed right-6 top-6"
    >
      <Icon
        icon="tabler:sun"
        className="text-[24px] text-yellow-500 lg:text-[24px] dark:block hidden"
      />
      <Icon
        icon="tabler:moon"
        className="text-[24px] text-white lg:text-[24px] block dark:hidden"
      />
    </button>
  );
};

export default ThemeSwitch;
