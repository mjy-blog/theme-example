import { createStore } from 'zustand';

import { HierarchyStore } from './HierarchyStore';
import { mergeHierarchyNodes } from './mergeHierarchyNodes';

export function createHierarchyStore() {
  return createStore<HierarchyStore>((set) => ({
    nodes: [],
    addNodes: (newNodes) =>
      set(({ nodes }) => ({ nodes: mergeHierarchyNodes(nodes, newNodes) })),
  }));
}
