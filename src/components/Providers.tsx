import { ThemeProvider } from '@mjy-blog/theme-example-ui-library/theme-provider';
import { PropsWithChildren } from 'react';

import { BlogProvider } from '../stores/blog/BlogProvider';
import { HierarchyProvider } from '../stores/hierarchy/HierarchyProvider';

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <BlogProvider>
        <HierarchyProvider>{children}</HierarchyProvider>
      </BlogProvider>
    </ThemeProvider>
  );
}
