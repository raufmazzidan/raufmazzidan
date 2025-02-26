import Image from "next/image";
import { PORTOFOLIO_DATA } from "./portofolio.utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const Portofolio = () => {
  return (
    <section className="my-20 flex flex-col items-center justify-center gap-20">
      {PORTOFOLIO_DATA.map((porto, i) => (
        <Link href={porto.url} key={i} target="_blank">
          <div className="bg-[#eceff1] dark:bg-[#393E46] hover:bg-[#f6f6f6] dark:text-slate-300 hover:scale-[1.02] hover:shadow-portofolio transition ease-out duration-200 rounded-lg w-full min-h-96 grid grid-cols-2 overflow-hidden">
            <div className="lg:p-16 p-8 lg:!pr-0 lg:col-span-1 col-span-2">
              <Image
                src={porto.logo.src}
                alt={porto.logo.alt}
                height={24}
                width={105}
                className="!h-6 w-auto max-w-[150px]"
              />

              <h2 className="text-3xl font-medium mt-5">{porto.title}</h2>
              <div className="flex items-center gap-1 mt-2 flex-wrap">
                {porto.stack.map((stack) => (
                  <Badge key={stack}>{stack}</Badge>
                ))}
              </div>
              <p className="mt-4 text-sm font-light">{porto.description}</p>
            </div>
            <div className="relative w-full col-span-2 lg:col-span-1">
              <Image
                src={porto.preview.src}
                width={960}
                height={800}
                alt={porto.preview.alt}
                className="lg:h-auto lg:w-auto w-full lg:absolute right-0 bottom-0"
              />
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default Portofolio;
