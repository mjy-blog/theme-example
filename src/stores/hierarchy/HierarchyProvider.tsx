"use client";

import { PropsWithChildren, useRef } from "react";
import { StoreApi } from "zustand";

import { HierarchyContext } from "./HierarchyContext";
import { HierarchyStore } from "./HierarchyStore";
import { createHierarchyStore } from "./createHierarchyStore";

export const HierarchyProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<StoreApi<HierarchyStore>>();
  if (!storeRef.current) {
    storeRef.current = createHierarchyStore();
  }

  return (
    <HierarchyContext.Provider value={storeRef.current}>
      {children}
    </HierarchyContext.Provider>
  );
};
