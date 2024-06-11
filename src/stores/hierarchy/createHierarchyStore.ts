import { HierarchyNode } from '@mjy-blog/theme-lib';
import { createStore } from 'zustand';

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
