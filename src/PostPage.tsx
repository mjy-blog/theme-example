import { PostPageProps } from '@mjy-blog/theme-lib';

import Link from 'next/link';
import { CustomPostAttribute } from './CustomPostAttribute';
import { Comment } from './components/Comment';
import { PostAttributes } from './components/PostAttributes';
import { Breadcrumb } from './components/breadcrumb/Breadcrumb';
import { MergeHierarchy } from './stores/hierarchy/MergeHierarchy';

export function PostPage({
  hierarchy,
  attributes,
  MDXContent,
  slug,
}: PostPageProps<CustomPostAttribute>) {
  return (
    <>
      <MergeHierarchy toMerge={hierarchy} />
      <main className="post-main mx-auto max-w-[740px] min-w-0">
        <Breadcrumb categories={attributes.categories} />
        <h1>{attributes.title}</h1>
        <PostAttributes attributes={attributes} />
        <MDXContent />
        <p>
          {'tags:'}
          {attributes.tags.map((tag) => (
            <Link href={`/tags/${tag}`} key={tag}>
              {tag}
            </Link>
          ))}
        </p>
        <Comment slug={slug} />
      </main>
      <div className="hidden tablet:block tablet:w-[30%] desktop:w-[20%]">
        // TODO: add TOC
      </div>
    </>
  );
}
