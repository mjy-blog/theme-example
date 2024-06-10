"use client";

import { useEffect } from "react";
import { HierarchyState } from "./HierarchyState";
import { useHierarchy } from "./useHierarchy";

export interface MergeHierarchyProps {
  toMerge: HierarchyState;
}

export function MergeHierarchy({ toMerge }: MergeHierarchyProps) {
  const addNodes = useHierarchy(({ addNodes }) => addNodes);

  useEffect(() => {
    addNodes(toMerge.nodes);
  }, [addNodes, toMerge]);

  return null;
}
