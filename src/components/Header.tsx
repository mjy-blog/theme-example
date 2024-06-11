import { ThemeModeButton } from './ThemeModeButton';

export function Header() {
  return (
    <>
      <div className="fixed z-50 top-0 left-0 right-0 bg-red-400 h-[48px]">
        <ThemeModeButton />
      </div>
      <div className="h-[48px]" />
    </>
  );
}
