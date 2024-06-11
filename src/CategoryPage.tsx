import {
  CategorySubNode,
  Hierarchy,
  Post,
  PostAttribute,
} from '@mjy-blog/theme-lib';
import Link from 'next/link';
import { MergeHierarchy } from './stores/hierarchy/MergeHierarchy';

export interface CategoryPageProps {
  category: string[];
  hierarchy: Hierarchy;
  sub: CategorySubNode[];
  relatedTags: [tag: string, score: number][];
  posts: Post<PostAttribute>[];
}

export function CategoryPage({
  category,
  hierarchy,
  sub,
  relatedTags,
  posts,
}: CategoryPageProps) {
  return (
    <>
      <MergeHierarchy toMerge={hierarchy} />
      <main>
        하위 카테고리:
        <ul>
          {sub
            .filter((a) => a[1] === 'category')
            .map(([name]) => (
              <SubCategoryNode category={category} name={name} />
            ))}
        </ul>
        하위 포스트:
        <ul>
          {posts.map(({ attributes: { title }, slug }) => (
            <SubPostNode title={title} slug={slug} />
          ))}
        </ul>
        관련 태그:
        <ul>
          {relatedTags.map(([tag, score]) => (
            <RelatedTag tag={tag} score={score} maxScore={relatedTags[0][1]} />
          ))}
        </ul>
      </main>
    </>
  );
}

interface SubCategoryNodeProps {
  name: string;
  category: string[];
}

function SubCategoryNode({ name, category }: SubCategoryNodeProps) {
  return (
    <li>
      <Link href={`/categories/${category.join('/')}/${name}`}>{name}</Link>
    </li>
  );
}

interface SubPostNodeProps {
  slug: string;
  title: string;
}

function SubPostNode({ slug, title }: SubPostNodeProps) {
  return (
    <li>
      <Link href={`/posts/${slug}`}>{title}</Link>
    </li>
  );
}

interface RelatedTagProps {
  tag: string;
  score: number;
  maxScore: number;
}

function RelatedTag({ tag, score, maxScore }: RelatedTagProps) {
  return (
    <li>
      <Link
        href={`/tags/${tag}`}
        style={{ color: `rgb(${score / maxScore}, 0, 1)` }}
      >
        {tag}
      </Link>
    </li>
  );
}
