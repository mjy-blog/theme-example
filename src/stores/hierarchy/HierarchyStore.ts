import { HierarchyNode, HierarchyState } from './HierarchyState';

export interface HierarchyStore extends HierarchyState {
  addNodes: (newNodes: HierarchyNode[]) => void;
}
