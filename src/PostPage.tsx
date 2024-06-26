import { PostPageProps } from '@mjy-blog/theme-lib';

import Link from 'next/link';
import { CustomPostAttribute } from './CustomPostAttribute';
import { Comment } from './components/Comment';
import { PostAttributes } from './components/PostAttributes';
import { Breadcrumb } from './components/breadcrumb/Breadcrumb';
import { LoadMermaid } from './components/util/LoadMermaid';
import { Visit } from './stores/blog/Visit';
import { MergeHierarchy } from './stores/hierarchy/MergeHierarchy';

export async function PostPage({
  hierarchy,
  attributes,
  MDXContent,
  slug,
}: PostPageProps<CustomPostAttribute>) {
  return (
    <>
      <Visit post={{ slug, attributes }} />
      <MergeHierarchy toMerge={hierarchy} />
      <main className="post-main mx-auto max-w-[740px] min-w-0 px-4 box-content">
        <Breadcrumb categories={attributes.categories} />
        <h1>{attributes.title}</h1>
        <PostAttributes attributes={attributes} />
        <MDXContent />
        <div className="flex flex-wrap gap-1 mb-6">
          <p>{'tags:'}</p>
          {attributes.tags.map((tag) => (
            <Link href={`/tags/${tag}/`} key={tag}>
              {tag}
            </Link>
          ))}
        </div>
        <Comment slug={slug} />
      </main>
      <div className="hidden tablet:block tablet:w-[30%] desktop:w-[25%]">
        // TODO: add TOC
      </div>
      <LoadMermaid />
    </>
  );
}
