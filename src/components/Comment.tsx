'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export interface CommentProps {
  slug: string;
}

export function Comment({ slug }: CommentProps) {
  const { resolvedTheme } = useTheme();
  return (
    <Giscus
      id="comments"
      repo={process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`}
      repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID!}
      category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY}
      categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID}
      mapping="specific"
      term={slug}
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={resolvedTheme}
      lang="ko"
      loading="lazy"
    />
  );
}
