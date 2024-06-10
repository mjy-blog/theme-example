import { BreadcrumbItem } from './BreadcrumbItem';

export interface BreadcrumbProps {
  categories: string[];
}

export function Breadcrumb({ categories }: BreadcrumbProps) {
  return (
    <nav>
      <ul className="inline list-none">
        {categories.map((key, i) => (
          <BreadcrumbItem key={key} categories={categories} index={i} />
        ))}
      </ul>
    </nav>
  );
}
