"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FC } from "react";

interface OverviewSlideProps {
  logo: {
    alt: string;
    src: string;
  };
  projectName: string;
  overview: string;
  features: string[];
  stack: string[];
  images: {
    front: {
      alt: string;
      src: string;
    };
    back: {
      alt: string;
      src: string;
    };
  };
}

const OverviewSlide: FC<OverviewSlideProps> = (props) => {
  const { logo, overview, features, stack, projectName, images } = props;
  return (
    <div className="px-12 h-screen w-full items-center grid lg:grid-cols-2 gap-8 overflow-auto">
      <div className="p-8">
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
        >
          <Image
            {...logo}
            height={64}
            width={800}
            className="w-auto max-h-16 drop-shadow-[4px_3px_0px_rgb(255,255,255)]"
          />
        </motion.div>
        <motion.h1
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.4,
          }}
          className="font-normal text-2xl mt-10"
        >
          {projectName}
        </motion.h1>
        <motion.p
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.5,
          }}
          className="font-light text-lg mt-2"
        >
          {overview}
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.6,
          }}
          className="font-light text-lg mt-2"
        >
          <p>
            <strong>Key Feature:</strong>
          </p>
          <ol className="list-disc ml-6">
            {features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ol>
        </motion.div>
        <motion.p
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.7,
          }}
          className="font-light text-lg mt-2"
        >
          <strong>Tech Stack:</strong> {stack.join(", ")}
        </motion.p>
      </div>
      <div className="relative pl-8 h-full">
        <motion.div
          initial={{
            scale: 0,
            opacity: 0,
            top: "30%",
          }}
          animate={{
            scale: 1,
            opacity: 1,
            rotate: 12,
            top: "30%",
          }}
          transition={{
            delay: 0.3,
          }}
          className="absolute h-auto"
        >
          <Image
            {...images.back}
            height={400}
            width={800}
            className="w-auto max-h-96 shadow rounded-lg bg-[#f5f7fa]"
          />
        </motion.div>
        <motion.div
          initial={{
            scale: 0,
            opacity: 0,
            top: "15%",
          }}
          animate={{
            scale: 1,
            opacity: 1,
            rotate: -6,
            top: "15%",
          }}
          transition={{
            delay: 0.5,
          }}
          className="absolute h-auto"
        >
          <Image
            {...images.front}
            height={400}
            width={800}
            className="w-auto max-h-96 shadow rounded-lg bg-[#f5f7fa]"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default OverviewSlide;
