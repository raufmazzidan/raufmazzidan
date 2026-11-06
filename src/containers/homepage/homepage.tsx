import { Separator } from "@/components/ui/separator";
import Banner from "./elements/banner";
import Playground from "./elements/playground";
import Portofolio from "./elements/portofolio";

const Homepage = () => {
  return (
    <>
      <Banner />
      <Portofolio />
      <Separator className="bg-accent-foreground" />
      <Playground />
    </>
  );
};

export default Homepage;
