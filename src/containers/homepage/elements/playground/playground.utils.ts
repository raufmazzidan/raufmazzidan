import { Blocks, Palette, Stamp } from "lucide-react";
import { IPlayground } from "./playground.types";

export const PLAYGROUND_DATA: IPlayground[] = [
  {
    id: "chicane-ui",
    title: "Chicane UI",
    description:
      "Reusable React UI component library and interactive documentation playground published on npm.",
    icon: Blocks,
    primaryLink: {
      url: "https://chicane-ui.raufmazzidan.com/",
      label: "chicane-ui.raufmazzidan.com",
    },
    stack: ["UI Library", "NPM Package", "TypeScript", "React", "Tailwind CSS"],
  },
  {
    id: "watermark-tool",
    title: "Watermark Tool",
    description:
      "Browser-based utility to apply customizable watermarks to images quickly and privately.",
    icon: Stamp,
    primaryLink: {
      url: "https://watermark.raufmazzidan.com/",
      label: "watermark.raufmazzidan.com",
    },
    stack: ["Javascript", "Web Tool", "Client-Side", "Canvas"],
  },
  {
    id: "color-translator",
    title: "Color Translator",
    description:
      "Interactive utility to convert and inspect color values seamlessly across HEX, RGB, HSL, and OKLCH formats.",
    icon: Palette,
    primaryLink: {
      url: "https://color-translator.raufmazzidan.com/",
      label: "color-translator.raufmazzidan.com",
    },
    stack: ["Web Tool", "Color Space", "TypeScript", "CSS"],
  },
];
