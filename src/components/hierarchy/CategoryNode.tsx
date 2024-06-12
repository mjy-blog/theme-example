import { HierarchyNode, getCategory } from '@mjy-blog/theme-lib';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { useBlog } from '../../stores/blog/useBlog';
import { useHierarchy } from '../../stores/hierarchy/useHierarchy';
import { stringArrayComparator } from '../../util/stringArrayComparator';
import { Hierarchy } from './Hierarchy';

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
        <button onClick={handleClick}>{opened ? '⬇️' : '➡️'}</button>
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
            <Loader current={current} name={name} />
          )}
        </div>
      )}
    </li>
  );
}

interface LoaderProps {
  current: string[];
  name: string;
}

function Loader({ current, name }: LoaderProps) {
  const addNodes = useHierarchy(({ addNodes }) => addNodes);

  useEffect(() => {
    (async () => {
      const category = await getCategory([...current, name], 'hierarchy');
      addNodes(category.nodes);
    })();
  }, [current, name, addNodes]);

  return <span>loading...</span>;
}
