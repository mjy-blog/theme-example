import { useContext } from "react";
import { useStore } from "zustand";
import { HierarchyContext } from "./HierarchyContext";
import { HierarchyStore } from "./HierarchyStore";

export const useHierarchy = <T>(selector: (store: HierarchyStore) => T): T => {
  const hierarchyStoreContext = useContext(HierarchyContext)!;

  return useStore(hierarchyStoreContext, selector);
};
