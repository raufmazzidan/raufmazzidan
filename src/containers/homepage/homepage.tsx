import ThemeSwitch from "@/components/theme-switch";
import Banner from "./elements/banner";
import Portofolio from "./elements/portofolio";

const Homepage = () => {
  return (
    <>
      <ThemeSwitch />
      <Banner />
      <Portofolio />
    </>
  );
};

export default Homepage;
