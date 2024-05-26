import { ComponentType } from 'react';
import { Comment } from './components/Comment';
import { ArticleAttributes } from './types/ArticleAttributes';

export interface PostPageProps {
  attributes: ArticleAttributes;
  MDXContent: ComponentType;
  slug: string;
}

export function PostPage({ attributes, MDXContent, slug }: PostPageProps) {
  return (
    <main className="post-main">
      <h1>{attributes.title}</h1>
      <MDXContent />
      <Comment slug={slug} />
    </main>
  );
}
