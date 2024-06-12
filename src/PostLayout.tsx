import { PropsWithChildren } from 'react';

import { HierarchyTop } from './components/hierarchy/HierarchyTop';

export function PostLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex mx-auto w-full box-border p-[24px] max-w-[1600px]">
      <nav className="hidden desktop:block w-[25%]">
        <HierarchyTop />
      </nav>
      {children}
    </div>
  );
}
