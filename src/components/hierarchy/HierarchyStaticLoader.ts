'use client';

import { HierarchyNode } from '@mjy-blog/theme-lib';
import { useEffect } from 'react';
import { useHierarchy } from '../../stores/hierarchy/useHierarchy';

export interface HierarchyStaticLoaderProps {
  nodes: HierarchyNode[];
}

export function HierarchyStaticLoader({ nodes }: HierarchyStaticLoaderProps) {
  const addNodes = useHierarchy(({ addNodes }) => addNodes);

  useEffect(() => {
    addNodes(nodes);
  }, [nodes, addNodes]);

  return null;
}
