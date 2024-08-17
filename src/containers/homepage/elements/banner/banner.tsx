import { Icon } from "@iconify/react";

const Banner = () => {
  return (
    <section className="pt-64 text-gray-typo">
      <div className="text-center max-w-xl m-auto flex flex-col items-center justify-center gap-6 lg:gap-8 px-8">
        <h1 className="font-medium text-6xl lg:text-7xl bg-gradient-to-r from-[#969699] to-[#1e1e22] inline-block text-transparent bg-clip-text">
          Hi, I&apos;m Rauf.
        </h1>
        <div className="flex items-center gap-1 m-auto">
          <Icon
            icon="ic:outline-place"
            className="text-[20px] lg:text-[24px]"
          />
          <p className="text-base lg:text-lg font-light">Jakarta, Indonesia</p>
        </div>
        <p className="lg:text-lg font-light">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever.
        </p>
      </div>
    </section>
  );
};

export default Banner;
