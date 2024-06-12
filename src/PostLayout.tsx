import { PropsWithChildren } from 'react';

import { CategoryNavigation } from './components/CategoryNavigation';

export function PostLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex mx-auto w-full box-border p-[24px] max-w-[1600px]">
      <div className="relative hidden desktop:block w-[25%]">
        <CategoryNavigation />
      </div>
      {children}
    </div>
  );
}
