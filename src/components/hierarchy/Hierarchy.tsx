import { HierarchyNode } from '@mjy-blog/theme-lib';
import { useMemo } from 'react';

import { HierarchyGatewayNode } from './HierarchyGatewayNode';

export interface HierarchyProps {
  current: string[];
  name: string;
  sub: HierarchyNode[];
}

export function Hierarchy({ current, name, sub }: HierarchyProps) {
  const next = useMemo(() => [...current, name], [current, name]);

  return (
    <ul>
      {sub.map((node) => (
        <HierarchyGatewayNode key={node[0]} current={next} node={node} />
      ))}
    </ul>
  );
}
