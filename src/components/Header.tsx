'use client';

import Link from 'next/link';

import { ThemeModeButton } from './ThemeModeButton';
import { Banners } from './banners/Banners';

export function Header() {
  return (
    <>
      <div className="fixed z-50 top-0 left-0 right-0 bg-slate-400 dark:bg-slate-800 h-[48px] flex px-4 items-center">
        <div className="flex-1">
          <b>
            <Link href="/">mjy-blog</Link>
          </b>
        </div>
        <div>
          <ThemeModeButton />
        </div>
      </div>
      <div className="h-[48px]" />
      <Banners />
    </>
  );
}
