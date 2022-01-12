import { useContext } from "react";
import { AppContext } from "src/context/AppContext";

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) throw new Error("useAppContext must be inside an AuthProvider");

  return context;
};
