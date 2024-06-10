import { PropsWithChildren } from "react";

export function PostLayout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto w-full box-border p-[24px] max-w-[1600px] flex">
      <div className="hidden tablet:block flex-1 bg-orange-400">Hello</div>
      {children}
    </div>
  );
}
