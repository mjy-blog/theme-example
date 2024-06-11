'use client';

import { HierarchyNode } from '@mjy-blog/theme-lib';

export function mergeHierarchyNodes(
  nodes: HierarchyNode[],
  newHierarchyNodes: HierarchyNode[],
): HierarchyNode[] {
  const result = new Map(nodes);
  newHierarchyNodes.forEach(([name, value]) => {
    const current = result.get(name);
    if (current) {
      if (current.type === 'category' && value.type === 'category') {
        current.sub =
          current.sub && value.sub
            ? mergeHierarchyNodes(current.sub, value.sub)
            : current.sub ?? value.sub;
      }
    } else {
      result.set(name, value);
    }
  });
  return Object.entries(Object.fromEntries(result.entries())).sort(([a], [b]) =>
    a.localeCompare(b),
  );
}
