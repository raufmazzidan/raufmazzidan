import { Separator } from "@/components/ui/separator";

const Banner = () => {
  return (
    <section className="">
      <h1 className="font-medium text-4xl font-roboto-slab mt-8">
        Rauf Mazzidan
      </h1>
      <p className="text-sm font-light">Front End Developer</p>
      <Separator className="w-8 my-4 bg-accent" />
      <p className="text-sm font-light text-justify">
        Passionate about crafting seamless, high-performance web experiences
        with JavaScript, TypeScript, React, and Next.js. Fast learner,
        detail-driven, and always up for a challenge. I thrive in dynamic teams,
        optimizing code quality while bringing innovative ideas to life.
      </p>
      {/* <div className="text-center max-w-4xl m-auto flex flex-col items-center justify-center gap-6 lg:gap-8 px-8">
        <div className="flex items-center flex-col gap-4">
          <h1 className="font-medium text-6xl lg:text-7xl bg-gradient-to-r from-[#969699] dark:to-white to-[#1e1e22] inline-block text-transparent bg-clip-text">
            Hi, I&apos;m Rauf Mazzidan.
          </h1>
          <div className="flex items-end gap-2">
            <p className="lg:text-lg font-light">🚀 Frontend Developer</p>
            <span className="lg:text-lg font-light">|</span>
            <p className="lg:text-lg font-light">5+ Years Experience</p>
            <span className="lg:text-lg font-light">|</span>
            <p className="lg:text-lg font-light">Jakarta, Indonesia</p>
          </div>
        </div>
        <p className="font-light text-lg">
          Passionate about crafting seamless, high-performance web experiences
          with JavaScript, TypeScript, React, and Next.js. Fast learner,
          detail-driven, and always up for a challenge. I thrive in dynamic
          teams, optimizing code quality while bringing innovative ideas to
          life.
        </p>
        <Button>
          HIT ME UP <Handshake />
        </Button>
      </div> */}
    </section>
  );
};

export default Banner;
