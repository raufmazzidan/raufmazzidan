"use client";

import ProjectShowcaseModal from "@/components/project-slides/project-showcase-modal";
import Popup, { IPopupProps } from "@/components/ui/popup";
import PortofolioCard from "@/components/ui/portofolio-card";
import { MouseEvent, useCallback, useState } from "react";
import { IPortofolio } from "./portofolio.types";
import { PORTOFOLIO_DATA } from "./portofolio.utils";

const Portofolio = () => {
  const [popupProps, setPopupProps] = useState<Omit<IPopupProps, "onClose">>({
    isOpen: false,
    position: undefined,
  });

  const closePopup = useCallback(() => {
    setPopupProps((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const openPopup = (data: IPortofolio) => (e: MouseEvent) => {
    const { clientX, clientY } = e;
    setPopupProps({
      position: { x: clientX, y: clientY },
      isOpen: true,
      content: (
        <ProjectShowcaseModal
          key={data.id}
          project={data}
          onClose={closePopup}
        />
      ),
    });
  };
  return (
    <section
      data-section
      className="my-12 grid grid-cols-1 md:grid-cols-2 gap-3"
      id="works"
    >
      {PORTOFOLIO_DATA.map((porto) => (
        <PortofolioCard onClick={openPopup} data={porto} key={porto.id} />
      ))}
      <Popup {...popupProps} onClose={closePopup} />
    </section>
  );
};

export default Portofolio;
