'use client';

import { ModeContext } from '@-ft/mode-next';
import { TagPageProps } from '@mjy-blog/theme-lib';
import Link from 'next/link';
import { useContext } from 'react';
import { CustomPostAttribute } from './CustomPostAttribute';
import { heatmapColorDark } from './util/heatmapColorDark';
import { heatmapColorLight } from './util/heatmapColorLight';

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
              minScore={relatedCategories[relatedCategories.length - 1][1]}
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
              minScore={relatedTags[relatedTags.length - 1][1]}
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
  minScore: number;
}

function RelatedCategory({
  category,
  score,
  maxScore,
  minScore,
}: RelatedCategoryProps) {
  const { theme } = useContext(ModeContext);

  const hot =
    maxScore - minScore ? (score - minScore) / (maxScore - minScore) : 0.5;
  const [r, g, b] =
    theme === 'dark' ? heatmapColorLight(hot) : heatmapColorDark(hot);

  return (
    <li>
      <Link
        href={`/categories${category
          .map((segment) => '/' + segment)
          .join('')}/`}
        style={{
          color: `rgb(${r}, ${g}, ${b})`,
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
  minScore: number;
}

function RelatedTag({ tag, score, maxScore, minScore }: RelatedTagProps) {
  const { theme } = useContext(ModeContext);

  const hot =
    maxScore - minScore ? (score - minScore) / (maxScore - minScore) : 0.5;
  const [r, g, b] =
    theme === 'dark' ? heatmapColorLight(hot) : heatmapColorDark(hot);

  return (
    <li
      className="inline-block rounded-md p-1 text-white"
      style={{
        background: `rgb(${r}, ${g}, ${b})`,
      }}
    >
      <Link href={`/tags/${tag}/`}>{tag}</Link>
    </li>
  );
}
