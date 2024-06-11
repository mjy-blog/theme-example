import { TagPageProps } from '@mjy-blog/theme-lib';
import Link from 'next/link';
import { CustomPostAttribute } from './CustomPostAttribute';

export function TagPage({
  tag,
  relatedCategories,
  relatedTags,
  posts,
}: TagPageProps<CustomPostAttribute>) {
  return (
    <>
      <main>
        하위 포스트:
        <ul>
          {posts.map(({ attributes: { title }, slug }) => (
            <SubPostNode title={title} slug={slug} />
          ))}
        </ul>
        관련 카테고리:
        <ul>
          {relatedCategories.map(([category, score]) => (
            <RelatedCategory
              category={category}
              score={score}
              maxScore={relatedCategories[0][1]}
            />
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

interface RelatedCategoryProps {
  category: string[];
  score: number;
  maxScore: number;
}

function RelatedCategory({ category, score, maxScore }: RelatedCategoryProps) {
  return (
    <li>
      <Link
        href={`/categories/${category.join('/')}`}
        style={{ color: `rgb(${score / maxScore}, 0, 1)` }}
      >
        {category.join(' / ')}
      </Link>
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
