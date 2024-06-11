import { CategoryPageProps } from '@mjy-blog/theme-lib';
import Link from 'next/link';

import { CustomPostAttribute } from './CustomPostAttribute';
import { MergeHierarchy } from './stores/hierarchy/MergeHierarchy';

export function CategoryPage({
  category,
  hierarchy,
  sub,
  relatedTags,
  posts,
}: CategoryPageProps<CustomPostAttribute>) {
  const subCategories = sub.filter((a) => a[1] === 'category');
  return (
    <div className="relative flex mx-auto w-full box-border p-[24px] max-w-[1600px]">
      <MergeHierarchy toMerge={hierarchy} />
      <main className="mx-auto max-w-[740px] min-w-0 w-full">
        <h1 className="text-5xl my-8">카테고리: {category.join(' / ')}</h1>
        {'상위 카테고리: '}
        <Link
          href={`/categories${category
            .slice(0, category.length - 1)
            .map((segment) => '/' + segment)
            .join('')}/`}
        >
          {category.slice(0, category.length - 1).join(' / ')}
        </Link>
        <h2 className="text-3xl mt-14 mb-4">하위 카테고리</h2>
        <ul>
          {subCategories.map(([name]) => (
            <SubCategoryNode key={name} category={category} name={name} />
          ))}
        </ul>
        <h2 className="text-3xl mt-14 mb-4">하위 포스트</h2>
        <ul>
          {posts.map(({ attributes: { title }, slug }) => (
            <SubPostNode key={slug} title={title} slug={slug} />
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

interface SubCategoryNodeProps {
  name: string;
  category: string[];
}

function SubCategoryNode({ name, category }: SubCategoryNodeProps) {
  return (
    <li>
      <Link
        href={`/categories${category
          .map((segment) => '/' + segment)
          .join('')}/${name}/`}
      >
        {name}
      </Link>
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
      <Link href={`/posts/${slug}/`}>{title}</Link>
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
