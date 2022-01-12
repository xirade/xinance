import { useAppContext } from "../hooks/useAppContext";
import modeIcon from "../assets/mode-icon.svg";

export default function ThemeSelector() {
  const { changeMode, mode } = useAppContext();

  const toggleMode = () => {
    changeMode(mode === "dark" ? "" : "dark");
  };

  return (
    <div className="container mx-auto mt-3">
      <img
        className="h-8 w-8"
        role="button"
        src={modeIcon}
        alt="dark/light toggle icon"
        onClick={toggleMode}
        style={{ filter: mode === "dark" ? "invert(1)" : "invert(0.2)" }}
      />
    </div>
  );
}
