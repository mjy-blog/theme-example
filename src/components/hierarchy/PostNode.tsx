import { DotIcon } from 'lucide-react';
import Link from 'next/link';

export interface PostNodeProps {
  slug: string;
  title: string;
}

export function PostNode({ slug, title }: PostNodeProps) {
  return (
    <Link
      key={slug}
      href={`/posts/${slug}`}
      className="flex py-1 text-muted-foreground hover:text-foreground items-center"
    >
      <DotIcon />
      {title}
    </Link>
  );
}
