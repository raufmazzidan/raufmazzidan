import Checkered from "@/components/ui/checkered";
import Greetings from "@/components/ui/greetings";
import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { getGreeting } from "./banner.utils";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SOCIAL = [
  {
    Icon: Linkedin,
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/raufmazzidan/",
  },
  { Icon: Mail, label: "Email", url: "mailto:raufmazzidan@gmail.com" },
  { Icon: Github, label: "Github", url: "https://github.com/raufmazzidan" },
  {
    Icon: FileText,
    label: "Resume",
    url: "mailto:raufmazzidan@gmail.com?subject=Request%20for%20Resume&body=Hello%20Rauf,%0A%0AI%20came%20across%20your%20portfolio%20and%20I'm%20interested%20in%20learning%20more%20about%20your%20experience.%20Could%20you%20please%20share%20your%20resume%20with%20me%3F%0A%0AThank%20you!",
  },
];

const Banner = () => {
  return (
    <section id="home" data-section>
      <Greetings
        mainClassName="my-8"
        texts={getGreeting()}
        staggerFrom={"center"}
        initial={{ y: "-100%" }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        staggerDuration={0.025}
        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1 text-2xl"
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        rotationInterval={4000}
      />
      <Checkered width={720} size={21} />
      <h1 className="text-4xl font-roboto-slab mt-10">Rauf Mazzidan</h1>
      <p className="text-sm font-light">Front End Developer</p>
      <div className="mt-4 inline-flex gap-2">
        {SOCIAL.map(({ Icon, url, label }) => (
          <TooltipProvider key={url}>
            <Tooltip delayDuration={0.5}>
              <TooltipTrigger asChild>
                <Link
                  target="_blank"
                  href={url}
                  className="transition bg-accent-foreground hover:bg-accent-foreground/70 border border-accent-foreground/10 hover:border-accent rounded p-1.5 inline-flex items-center justify-center"
                >
                  <Icon size={16} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-light text-xs">{label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </section>
  );
};

export default Banner;
