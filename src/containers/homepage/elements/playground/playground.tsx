"use client";

import PlaygroundCard from "@/components/ui/playground-card";
import { PLAYGROUND_DATA } from "./playground.utils";

const Playground = () => {
  return (
    <section
      data-section
      className="my-12 pb-16 grid grid-cols-1 md:grid-cols-2 gap-3"
      id="playground"
    >
      {PLAYGROUND_DATA.map((item) => (
        <PlaygroundCard data={item} key={item.id} />
      ))}
    </section>
  );
};

export default Playground;
