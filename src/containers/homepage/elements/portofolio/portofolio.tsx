import Tags from "@/components/tags";
import Image from "next/image";
import { PORTOFOLIO_DATA } from "./portofolio.utils";
import Link from "next/link";

const Portofolio = () => {
  return (
    <section className="my-40">
      <div className="max-w-4xl m-auto flex flex-col items-center justify-center gap-20 px-8">
        {PORTOFOLIO_DATA.map((porto, i) => (
          <Link href={porto.url} key={i} target="_blank">
            <div className="bg-[#eceff1] hover:bg-[#f6f6f6] hover:scale-[1.02] hover:shadow-portofolio transition ease-out duration-200 rounded-3xl w-full min-h-96 grid grid-cols-2 overflow-hidden">
              <div className="lg:p-16 p-8 lg:!pr-0 lg:col-span-1 col-span-2">
                <Image
                  src={porto.logo.src}
                  alt={porto.logo.alt}
                  height={24}
                  width={105}
                  className="!h-6 w-auto max-w-[105px]"
                />

                <h2 className="text-3xl font-medium mt-5">{porto.title}</h2>
                <div className="flex items-center gap-1 mt-2 flex-wrap">
                  {porto.stack.map((stack) => (
                    <Tags key={stack}>{stack}</Tags>
                  ))}
                </div>
                <p className="mt-4 text-sm font-light">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
              <div className="relative w-full col-span-2 lg:col-span-1">
                <Image
                  src="/assets/porto-mycarrier-internal.webp"
                  width={960}
                  height={800}
                  alt="myc-intenral"
                  className="lg:h-auto lg:w-auto w-full lg:absolute right-0 bottom-0"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Portofolio;
