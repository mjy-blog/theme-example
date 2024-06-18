import { Hierarchy } from '@mjy-blog/theme-lib';
import { HierarchyStaticLoader } from './components/hierarchy/HierarchyStaticLoader';
import { HierarchyTop } from './components/hierarchy/HierarchyTop';

export interface MainPageProps {
  hierarchy: Hierarchy;
}

export function MainPage({ hierarchy: { nodes } }: MainPageProps) {
  return (
    <div className="relative flex mx-auto w-full box-border p-[24px] max-w-[1600px]">
      <div className="relative hidden desktop:block w-[25%]" />
      <div>
        <HierarchyTop />
        <HierarchyStaticLoader nodes={nodes} />
      </div>
      <div className="hidden tablet:block tablet:w-[30%] desktop:w-[25%]" />
    </div>
  );
}
