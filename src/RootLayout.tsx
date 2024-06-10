import { PropsWithChildren } from "react";
import { ThemeModeButton } from "./components/ThemeModeButton";
import { HierarchyProvider } from "./stores/hierarchy/HierarchyProvider";

export function RootLayout({ children }: PropsWithChildren) {
  return (
    <HierarchyProvider>
      <div className="fixed top-0 left-0 right-0 bg-red-400 h-[48px]">
        <ThemeModeButton />
      </div>
      <div className="h-[48px]" />
      {children}
    </HierarchyProvider>
  );
}
