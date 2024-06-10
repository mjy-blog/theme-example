import { createStore } from 'zustand';

import { HierarchyNode } from './HierarchyState';
import { HierarchyStore } from './HierarchyStore';
import { mergeHierarchyNodes } from './mergeHierarchyNodes';

export function createHierarchyStore() {
  return createStore<HierarchyStore>((set) => ({
    nodes: [],
    addNodes: (newNodes: HierarchyNode[]) =>
      set(({ nodes }) => ({
        nodes: mergeHierarchyNodes(nodes, newNodes),
      })),
  }));
}
