'use client';

import { RefObject, useLayoutEffect, useRef, useState } from 'react';
import { HierarchyTop } from './hierarchy/HierarchyTop';

// TODO: make it more smooth!

export function CategoryNavigation() {
  const ref = useRef<HTMLDivElement>(null);
  const [top, bottom] = useNavigationPosition(ref, 72, 24);

  return (
    <div ref={ref} className="h-full">
      <nav
        className="absolute overflow-y-auto left-0 right-0"
        style={{ top, bottom }}
      >
        <HierarchyTop />
      </nav>
    </div>
  );
}

function useNavigationPosition(
  ref: RefObject<HTMLDivElement>,
  minimumTop: number,
  minimumBottom: number,
): [top: number, bottom: number] {
  const [result, setResult] = useState<[top: number, bottom: number]>([0, 0]);

  useLayoutEffect(() => {
    const { current } = ref;
    if (!current) return;

    const listener = () => {
      const { top, bottom } = current.getBoundingClientRect();
      const { innerHeight } = window;
      setResult([
        Math.max(0, minimumTop - top),
        Math.max(0, bottom - innerHeight + minimumBottom),
      ]);
    };

    listener();
    window.addEventListener('scroll', listener);
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('scroll', listener);
      window.removeEventListener('resize', listener);
    };
  }, [ref, minimumTop, minimumBottom]);

  return result;
}
