import { ComponentType } from 'react';

import { Comment } from './components/Comment';
import { PostAttributes } from './components/PostAttributes';
import { Breadcrumb } from './components/breadcrumb/Breadcrumb';
import { ArticleAttributes } from './types/ArticleAttributes';

export interface PostPageProps {
  attributes: ArticleAttributes;
  MDXContent: ComponentType;
  slug: string;
}

export function PostPage({ attributes, MDXContent, slug }: PostPageProps) {
  return (
    <>
      <main className="post-main mx-auto max-w-[740px] min-w-0">
        <Breadcrumb categories={attributes.categories} />
        <h1>{attributes.title}</h1>
        <PostAttributes attributes={attributes} />
        <MDXContent />
        <Comment slug={slug} />
      </main>
      <div className="hidden tablet:block tablet:w-[30%] desktop:w-[20%]">
        // TODO: add TOC
      </div>
    </>
  );
}
