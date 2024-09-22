import { ThemeToggle } from "../../../app/theme";

export const Header = () => {
  return (
    <div className="fixed top-0 w-full px-4 py-3 md:px-8 border-b border-b-primary flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src="/weatherly.svg" className="h-6 w-6" />
        <h2>Weatherly</h2>
      </div>
      <span>
        <ThemeToggle />
      </span>
    </div>
  );
};
