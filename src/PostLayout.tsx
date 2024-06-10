import { PropsWithChildren } from 'react';

export function PostLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex mx-auto w-full box-border p-[24px] max-w-[1600px]">
      <div className="hidden desktop:block tablet:w-[20%]">
        // TODO: add hierarchy
      </div>
      {children}
    </div>
  );
}
