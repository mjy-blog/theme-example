'use client';

import { HierarchyNode, getCategory } from '@mjy-blog/theme-lib';
import { PropsWithChildren, useEffect, useState } from 'react';
import { HierarchyStaticLoader } from './HierarchyStaticLoader';

export interface HierarchyDynamicLoaderProps extends PropsWithChildren {
  current: string[];
  name: string;
}

export function HierarchyDynamicLoader({
  current,
  name,
  children,
}: HierarchyDynamicLoaderProps) {
  const [nodes, setNodes] = useState<HierarchyNode[]>();

  useEffect(() => {
    (async () => {
      const category = await getCategory([...current, name], 'hierarchy');
      setNodes(category.nodes);
    })();
  }, [current, name]);

  return (
    <>
      {children}
      {nodes && <HierarchyStaticLoader nodes={nodes} />}
    </>
  );
}
