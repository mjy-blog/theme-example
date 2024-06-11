import Link from 'next/link';

export interface PostNodeProps {
  slug: string;
  title: string;
}

export function PostNode({ slug, title }: PostNodeProps) {
  return (
    <li>
      <Link href={`/posts/${slug}`}>{title}</Link>
    </li>
  );
}
