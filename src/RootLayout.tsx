import { PropsWithChildren } from 'react';

import { Providers } from './components/Providers';
import { ThemeModeButton } from './components/ThemeModeButton';

export function RootLayout({ children }: PropsWithChildren) {
  return (
    <Providers>
      <div className="fixed top-0 left-0 right-0 bg-red-400 h-[48px]">
        <ThemeModeButton />
      </div>
      <div className="h-[48px]" />
      {children}
    </Providers>
  );
}
