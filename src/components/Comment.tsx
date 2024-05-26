'use client';

import { useContext } from 'react';

import { ModeContext } from '@-ft/mode-next';
import Giscus from '@giscus/react';

export interface CommentProps {
  slug: string;
}

export function Comment({ slug }: CommentProps) {
  const { theme } = useContext(ModeContext);
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
      theme={theme}
      lang="ko"
      loading="lazy"
    />
  );
}
