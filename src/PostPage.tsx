import { ComponentType } from "react";
import { ArticleAttributes } from "./types/ArticleAttributes";

export interface PostPageProps {
  attributes: ArticleAttributes;
  MDXContent: ComponentType;
  slug: string;
}

export function PostPage({ attributes, MDXContent }: PostPageProps) {
  return (
    <main className="post-main">
      <h1>{attributes.title}</h1>
      <MDXContent />
    </main>
  );
}
