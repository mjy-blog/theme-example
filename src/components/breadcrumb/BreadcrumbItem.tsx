import Link from 'next/link';
import { useMemo } from 'react';

export interface BreadcrumbItemProps {
  categories: string[];
  index: number;
}

export function BreadcrumbItem({ categories, index }: BreadcrumbItemProps) {
  const to = useMemo(
    () =>
      `/categories/${categories
        .slice(0, index + 1)
        .map((segment) => '/' + segment)
        .join('')}/`,
    [categories, index],
  );

  return (
    <li className="inline list-none">
      <Link href={to}>{categories[index]}</Link>
      <span> / </span>
    </li>
  );
}
