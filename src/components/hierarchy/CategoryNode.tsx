import { HierarchyNode } from '@mjy-blog/theme-lib';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { useBlog } from '../../stores/blog/useBlog';
import { stringArrayComparator } from '../../util/stringArrayComparator';
import { Hierarchy } from './Hierarchy';
import { HierarchyDynamicLoader } from './HierarchyDynamicLoader';

export interface CategoryNodeProps {
  current: string[];
  name: string;
  sub?: HierarchyNode[];
}

export function CategoryNode({ current, name, sub }: CategoryNodeProps) {
  const currentPost = useBlog(({ currentPost }) => currentPost);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const next = [...current, name];
    if (
      currentPost &&
      stringArrayComparator(
        currentPost.attributes.categories.slice(0, next.length),
        next,
      ) == 0
    ) {
      setOpened(true);
    }
  }, [current, currentPost]);

  const handleClick = useCallback(() => {
    setOpened((opened) => !opened);
  }, []);

  return (
    <div>
      <div className="flex py-1 items-center">
        <button
          className="block cursor-pointer p-1"
          onClick={handleClick}
          aria-expanded={opened}
          aria-label={`Expand ${name} category`}
        >
          <ChevronRightIcon
            className={`h-4 w-4 transition-transform ${
              opened ? 'transform rotate-90' : ''
            }`}
            aria-hidden="true"
          />
        </button>
        <Link
          href={`/categories${[...current, name]
            .map((segment) => '/' + segment)
            .join('')}/`}
          className="ml-1 cursor-pointer flex-grow"
        >
          {name}
        </Link>
      </div>
      {opened && (
        <div
          className="ml-4"
          role="group"
          aria-label={`${name} subcategories and posts`}
        >
          {sub ? (
            <Hierarchy current={current} name={name} sub={sub} />
          ) : (
            <HierarchyDynamicLoader current={current} name={name}>
              Loading...
            </HierarchyDynamicLoader>
          )}
        </div>
      )}
    </div>
  );
}
