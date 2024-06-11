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
    <div className="relative flex mx-auto w-full box-border p-[24px] max-w-[1600px]">
      <main className="mx-auto max-w-[740px] min-w-0 w-full">
        <h1 className="text-5xl my-8">태그: {tag}</h1>
        <h2 className="text-3xl mt-14 mb-4">관련 포스트</h2>
        <ul>
          {posts.map(({ attributes: { title }, slug }) => (
            <SubPostNode key={slug} title={title} slug={slug} />
          ))}
        </ul>
        <h2 className="text-3xl mt-14 mb-4">관련 카테고리</h2>
        <ul>
          {relatedCategories.map(([category, score]) => (
            <RelatedCategory
              key={category.join('/')}
              category={category}
              score={score}
              maxScore={relatedCategories[0][1]}
            />
          ))}
        </ul>
        <h2 className="text-3xl mt-14 mb-4">관련 태그</h2>
        <ul className="flex flex-wrap gap-2">
          {relatedTags.map(([tag, score]) => (
            <RelatedTag
              key={tag}
              tag={tag}
              score={score}
              maxScore={relatedTags[0][1]}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

interface SubPostNodeProps {
  slug: string;
  title: string;
}

function SubPostNode({ slug, title }: SubPostNodeProps) {
  return (
    <li>
      <Link href={`/posts/${slug}/`}>{title}</Link>
    </li>
  );
}

interface RelatedCategoryProps {
  category: string[];
  score: number;
  maxScore: number;
}

function RelatedCategory({ category, score, maxScore }: RelatedCategoryProps) {
  const hot = score / maxScore;
  return (
    <li>
      <Link
        href={`/categories${category
          .map((segment) => '/' + segment)
          .join('')}/`}
        style={{
          color: `rgb(${hot * 255}, 0, ${(1 - hot) * 255})`,
        }}
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
  const hot = score / maxScore;
  return (
    <li
      className="inline-block rounded-md p-1 text-white"
      style={{
        background: `rgb(${hot * 255}, 0, ${(1 - hot) * 255})`,
      }}
    >
      <Link href={`/tags/${tag}/`}>{tag}</Link>
    </li>
  );
}
