import { PropsWithChildren } from 'react';

import { BlogProvider } from '../stores/blog/BlogProvider';
import { HierarchyProvider } from '../stores/hierarchy/HierarchyProvider';

export function Providers({ children }: PropsWithChildren) {
  return (
    <BlogProvider>
      <HierarchyProvider>{children}</HierarchyProvider>
    </BlogProvider>
  );
}
