import Tabs from "../ui/navigation-tabs";
import ThemeSwitch from "../ui/theme-switch";

const Navigation = () => {
  return (
    <nav className="sticky top-0 bg-background z-50 py-10">
      <div className="max-w-3xl px-6 m-auto flex items-center justify-between">
        <Tabs />
        <ThemeSwitch />
      </div>
    </nav>
  );
};

export default Navigation;
