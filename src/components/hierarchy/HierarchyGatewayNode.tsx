import { HierarchyNode } from '@mjy-blog/theme-lib';

import { CategoryNode } from './CategoryNode';
import { PostNode } from './PostNode';

export interface HierarchyGatewayNodeProps {
  current: string[];
  node: HierarchyNode;
}

export function HierarchyGatewayNode({
  current,
  node,
}: HierarchyGatewayNodeProps) {
  const [name, value] = node;

  return value.type === 'category' ? (
    <CategoryNode current={current} name={name} sub={value.sub} />
  ) : (
    <PostNode slug={name} title={value.title} />
  );
}
