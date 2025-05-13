"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FC, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  ArrowDownCircle,
  ArrowRight,
  ArrowRightCircle,
  ArrowUpCircle,
} from "lucide-react";
import { delay } from "motion";

export interface ShowcaseSlideProps {
  images: {
    src: string;
    alt: string;
  }[];
}

const ShowcaseSlide: FC<ShowcaseSlideProps> = (props) => {
  const { images } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      axis: "y",
      loop: true,
    },
    [
      AutoScroll({
        playOnInit: true,
        stopOnInteraction: false,
      }),
    ]
  );

  const onButtonAutoplayClick = useCallback(
    (callback: () => void) => {
      const autoScroll = emblaApi?.plugins()?.autoScroll;
      if (!autoScroll) return;

      const resetOrStop =
        autoScroll.options.stopOnInteraction === false
          ? autoScroll.reset
          : autoScroll.stop;

      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  const onPrevButtonClick = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <div className="h-full w-full relative">
      <div className="z-50 absolute w-full h-full top-0 left-0 flex flex-col lg:flex-row items-center p-10 gap-8">
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
          className="font-normal text-2xl"
        >
          Overview of Features
        </motion.h1>
        <div className="flex flex-col justify-center items-center gap-2">
          <motion.button
            onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
              scale: {
                delay: 0,
              },
            }}
            whileHover={{
              scale: 1.1,
            }}
          >
            <ArrowUpCircle
              className="text-accent"
              size={40}
              strokeWidth={1.5}
            />
          </motion.button>
          <motion.button
            onClick={() => onButtonAutoplayClick(onNextButtonClick)}
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
              scale: {
                delay: 0,
              },
            }}
            whileHover={{
              scale: 1.1,
            }}
          >
            <ArrowDownCircle
              className="text-accent"
              size={40}
              strokeWidth={1.5}
            />
          </motion.button>
        </div>
        <div className="grow">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.3,
            }}
          >
            <div className="overflow-y-hidden" ref={emblaRef}>
              <div className="flex flex-col touch-pan-x touch-pinch-zoom mt-[-1rem] h-[656px]">
                {images.map((i, index) => (
                  <div
                    key={index}
                    className="w-fit transform-gpu h-[640px] flex-[0_0_100%] min-h-0 pt-4"
                  >
                    <Image
                      {...i}
                      height={640}
                      width={1024}
                      className="w-full h-auto aspect-auto rounded-lg bg-[#f5f7fa]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Image
        src={"/assets/logo-mycarrier.svg"}
        alt={"Logo MyCarrier Internal"}
        height={100}
        width={800}
        className="w-auto max-h-40 h-40 opacity-15 absolute top-5 right-0 rotate-12 z-10"
      />
    </div>
  );
};

export default ShowcaseSlide;
