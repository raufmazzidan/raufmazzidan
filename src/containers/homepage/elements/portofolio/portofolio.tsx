"use client";

// import Slide1 from "@/components/project-slides/mycarrier-internal/slide-1";
import OverviewSlide from "@/components/project-slides/common-slides/overview-slide";
import ShowcaseSlide from "@/components/project-slides/common-slides/showcase-slide";
import Slides from "@/components/section/slides";
import Popup, { IPopupProps } from "@/components/ui/popup";
import PortofolioCard from "@/components/ui/portofolio-card";
import { useState } from "react";
import { IPortofolio } from "./portofolio.types";
import { PORTOFOLIO_DATA } from "./portofolio.utils";

const Portofolio = () => {
  const [popupProps, setPopupProps] = useState<Omit<IPopupProps, "onClose">>({
    isOpen: false,
    position: undefined,
  });

  const openPopup = (data: IPortofolio) => (e: any) => {
    const overviewProps = {
      logo: data.logo,
      projectName: data.title,
      features: data.features,
      overview: data.longDescription,
      stack: data.stack,
      images: data.overviewImage,
    };

    const slides = [
      {
        id: "1",
        content: <OverviewSlide {...overviewProps} />,
      },
      {
        id: "2",
        content: <ShowcaseSlide images={data.projectShowcase} />,
      },
    ];

    const { clientX, clientY } = e;
    setPopupProps({
      position: { x: clientX, y: clientY },
      isOpen: true,
      content: slides ? (
        <Slides
          onClose={() => setPopupProps({ position: undefined, isOpen: false })}
          slides={slides}
        />
      ) : undefined,
    });
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
