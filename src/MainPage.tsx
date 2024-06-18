import { HierarchyTop } from './components/hierarchy/HierarchyTop';

export function MainPage() {
  return (
    <div className="relative flex mx-auto w-full box-border p-[24px] max-w-[1600px]">
      <div className="relative hidden desktop:block w-[25%]" />
      <HierarchyTop />
      <div className="hidden tablet:block tablet:w-[30%] desktop:w-[25%]" />
    </div>
  );
}
