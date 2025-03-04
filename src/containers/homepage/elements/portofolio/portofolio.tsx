"use client";

import Popup, { IPopupProps } from "@/components/ui/popup";
import PortofolioCard from "@/components/ui/portofolio-card";
import { useState } from "react";
import { PORTOFOLIO_DATA } from "./portofolio.utils";

const Portofolio = () => {
  const [popupProps, setPopupProps] = useState<Omit<IPopupProps, "onClose">>({
    isOpen: false,
    position: undefined,
  });

  const openPopup = (e: any) => {
    const { clientX, clientY } = e;
    setPopupProps({ position: { x: clientX, y: clientY }, isOpen: true });
  };
  return (
    <section
      data-section
      className="my-12 grid grid-cols-1 md:grid-cols-2 gap-3"
      id="works"
    >
      {PORTOFOLIO_DATA.map((porto, i) => (
        <PortofolioCard onClick={openPopup} data={porto} key={i} />
      ))}
      <Popup
        {...popupProps}
        onClose={() => {
          setPopupProps({ position: undefined, isOpen: false });
        }}
      />
    </section>
  );
};

export default Portofolio;
