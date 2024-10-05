'use client';

import { ThemeSwitcher } from '@mjy-blog/theme-example-ui-library/components/theme-switcher';
import { HomeIcon } from 'lucide-react';
import Link from 'next/link';

import { Banners } from './banners/Banners';

export function Header() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <HomeIcon className="h-6 w-6" />
            <span className="font-bold">Blog</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/about">About</Link>
            <Link href="/posts">Posts</Link>
            <Link href="/contact">Contact</Link>
            <ThemeSwitcher />
          </nav>
        </div>
      </header>
      <Banners />
    </>
  );
}
