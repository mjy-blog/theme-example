import { HierarchyNode } from '@mjy-blog/theme-lib';

import { HierarchyState } from './HierarchyState';

export interface HierarchyStore extends HierarchyState {
  addNodes: (newNodes: HierarchyNode[]) => void;
}
