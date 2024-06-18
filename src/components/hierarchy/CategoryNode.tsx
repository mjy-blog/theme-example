import { HierarchyNode } from '@mjy-blog/theme-lib';
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
    <li>
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
        <div className="pl-4">
          {sub ? (
            <Hierarchy current={current} name={name} sub={sub} />
          ) : (
            <HierarchyDynamicLoader current={current} name={name} />
          )}
        </div>
      )}
    </li>
  );
}
