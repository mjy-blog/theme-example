'use client';

import { Button } from '@mjy-blog/theme-example-ui-library/components/ui/button';
import { X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCallback, useState } from 'react';

import { Banner } from './Banner';
import { UnderConstructionBanner } from './UnderConstructionBanner';

const banners: Banner[] = [UnderConstructionBanner];

export function Banners() {
  const [visibleBanners, setVisibleBanners] = useState(() =>
    banners.map((banner, index) => ({ ...banner, index })),
  );
  const closeBanner = useCallback((index: number) => {
    setVisibleBanners((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return visibleBanners.map((banner, index) => (
    <Banner
      key={banner.index}
      banner={banner}
      closeBanner={closeBanner}
      index={index}
    />
  ));
}

interface BannerProps {
  banner: Banner;
  closeBanner: (index: number) => void;
  index: number;
}

function Banner({ banner, closeBanner, index }: BannerProps) {
  const { theme } = useTheme();

  return (
    <div
      key={index}
      className="w-full py-2"
      style={{
        backgroundColor:
          theme === 'dark'
            ? banner.backgroundColorOnDarkTheme
            : banner.backgroundColorOnLightTheme,
      }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {banner.content}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => closeBanner(index)}
          aria-label="Close banner"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
