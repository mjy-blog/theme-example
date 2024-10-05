'use client';

import { Banner } from './Banner';

export const UnderConstructionBanner: Banner = {
  content: (
    <div className="text-white font-semibold">
      개발중인 미완성 페이지로, 일부 기능이 동작하지 않을 수 있습니다.
    </div>
  ),
  backgroundColorOnDarkTheme: '#440088',
  backgroundColorOnLightTheme: '#440088',
};
