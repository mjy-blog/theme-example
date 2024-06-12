import { TestBanner } from './TestBanner';
import { UnderConstructionBanner } from './UnderConstructionBanner';

export function Banners() {
  return (
    <>
      <UnderConstructionBanner />
      <TestBanner />
    </>
  );
}
