import { HierarchyNode } from '@mjy-blog/theme-lib';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { Hierarchy } from './Hierarchy';

export interface CategoryNodeProps {
  current: string[];
  name: string;
  sub?: HierarchyNode[];
}

export function CategoryNode({ current, name, sub }: CategoryNodeProps) {
  const [opened, setOpened] = useState(false);

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
            .join('')}/${name}`}
        >
          {name}
        </Link>
      </p>
      {opened &&
        (sub ? (
          <Hierarchy current={current} name={name} sub={sub} />
        ) : (
          <span>loading...</span>
        ))}
    </li>
  );
}
