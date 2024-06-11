'use client';

import { useHierarchy } from '../../stores/hierarchy/useHierarchy';
import { HierarchyGatewayNode } from './HierarchyGatewayNode';

const emptyArray = [] as [];

export function HierarchyTop() {
  const nodes = useHierarchy(({ nodes }) => nodes);

  return (
    <ul>
      {nodes.map((node) => (
        <HierarchyGatewayNode key={node[0]} current={emptyArray} node={node} />
      ))}
    </ul>
  );
}
