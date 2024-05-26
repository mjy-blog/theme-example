import { PropsWithChildren } from 'react';
import { ThemeModeButton } from './components/ThemeModeButton';

export function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div>
        <ThemeModeButton />
      </div>
      {children}
    </>
  );
}
