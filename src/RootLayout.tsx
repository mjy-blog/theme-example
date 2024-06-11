import { PropsWithChildren } from 'react';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Providers } from './components/Providers';

export function RootLayout({ children }: PropsWithChildren) {
  return (
    <Providers>
      <Header />
      {children}
      <Footer />
    </Providers>
  );
}
