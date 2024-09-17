import { useContext } from "react";
import { ModalsContext } from "../../providers/modalsProvider";

export function useModals() {
  const context = useContext(ModalsContext);
  if (context === undefined) throw new Error("useModals must be used within a ModalsProvider");
  return context;
}
