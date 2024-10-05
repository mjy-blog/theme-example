import { PropsWithChildren } from 'react';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Providers } from './components/Providers';

export function RootLayout({ children }: PropsWithChildren) {
  return (
    <Providers>
      <div className="flex flex-col min-h-screen">
        <Header />
        {children}
        <Footer />
      </div>
    </Providers>
  );
}
