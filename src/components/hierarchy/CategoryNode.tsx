import { HierarchyNode } from '@mjy-blog/theme-lib';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { KeyboardEvent, useCallback, useEffect, useState } from 'react';

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
  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setOpened((opened) => !opened);
    }
  }, []);

  return (
    <div>
      <div className="flex py-1 items-center">
        <div
          className="cursor-pointer p-1"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-expanded={opened}
          aria-label={`Expand ${name} category`}
        >
          <ChevronRightIcon
            className={`h-4 w-4 transition-transform ${
              opened ? 'transform rotate-90' : ''
            }`}
            aria-hidden="true"
          />
        </div>
        <Link
          href={`/categories/${name}`}
          className="ml-1 cursor-pointer flex-grow"
        >
          {name}
        </Link>
      </div>
      <p>
        <button onClick={handleClick}>
          <span
            className={`border-8 border-transparent border-t-current inline-block w-0 h-0 transform ${
              opened ? 'rotate-0 translate-y-1' : '-rotate-90 translate-x-1'
            } transition-transform duration-200 ease-in-out`}
          />
          <span className="sr-only">{opened ? 'Collapse' : 'Expand'}</span>
        </button>
        <Link
          href={`/categories${current
            .map((segment) => '/' + segment)
            .join('')}/${name}/`}
        >
          {name}
        </Link>
      </p>
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
