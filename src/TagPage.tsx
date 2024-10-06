'use client';

import { Button } from '@mjy-blog/theme-example-ui-library/components/ui/button';
import { cn } from '@mjy-blog/theme-example-ui-library/lib/utils';
import { TagPageProps } from '@mjy-blog/theme-lib';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MenuIcon,
  RssIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

import { HierarchyTop } from './components/hierarchy/HierarchyTop';
import { PostCard } from './components/PostCard';
import { CustomPostAttribute } from './CustomPostAttribute';
import { useBlog } from './stores/blog/useBlog';

export function TagPage({
  tag,
  relatedCategories,
  relatedTags,
  posts,
}: TagPageProps<CustomPostAttribute>) {
  const categoryPageMobileExpandedSection = useBlog(
    ({ categoryPageMobileExpandedSection }) =>
      categoryPageMobileExpandedSection,
  );
  const leftAsideExpanded = useBlog(
    ({ leftAsideExpanded }) => leftAsideExpanded,
  );
  const rightAsideExpanded = useBlog(
    ({ rightAsideExpanded }) => rightAsideExpanded,
  );
  const toggleCategoryPageMobilePostList = useBlog(
    ({ toggleCategoryPageMobilePostList }) => toggleCategoryPageMobilePostList,
  );
  const toggleCategoryPageMobileCategoryInfo = useBlog(
    ({ toggleCategoryPageMobileCategoryInfo }) =>
      toggleCategoryPageMobileCategoryInfo,
  );
  const toggleLeftAsideExpanded = useBlog(
    ({ toggleLeftAsideExpanded }) => toggleLeftAsideExpanded,
  );
  const toggleRightAsideExpanded = useBlog(
    ({ toggleRightAsideExpanded }) => toggleRightAsideExpanded,
  );

  useEffect(() => {
    if (categoryPageMobileExpandedSection) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [categoryPageMobileExpandedSection]);

  return (
    <>
      {/* Sticky Mobile and Tablet Post List and TOC Container */}
      <div
        className={cn(
          'lg:hidden sticky flex flex-col top-14 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
          categoryPageMobileExpandedSection && 'h-[calc(100vh-3.5rem)]',
        )}
      >
        {/* Mobile Post List collapsed */}
        <div className="md:hidden border-b h-10">
          <div className="container mx-auto px-4">
            <button
              type="button"
              className="w-full py-2 flex items-center justify-between"
              onClick={toggleCategoryPageMobilePostList}
              aria-expanded={categoryPageMobileExpandedSection === 'postList'}
              aria-controls="mobile-post-list"
            >
              <span className="font-medium">Posts</span>
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform ${
                  categoryPageMobileExpandedSection === 'postList'
                    ? 'transform rotate-180'
                    : ''
                }`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* Mobile Post List expanded */}
        {categoryPageMobileExpandedSection === 'postList' && (
          <div
            id="mobile-post-list"
            className="md:hidden border-b flex-1 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-y-auto"
          >
            <div className="container mx-auto px-4 py-2">
              {/* <Tabs defaultValue={categories[0].name}>
                <TabsList>
                  {categories.map((category) => (
                    <TabsTrigger key={category.name} value={category.name}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {categories.map((category) => (
                  <TabsContent key={category.name} value={category.name}>
                    <PostTree category={category} isRoot />
                  </TabsContent>
                ))}
              </Tabs> */}
              <HierarchyTop />
            </div>
          </div>
        )}

        {/* Mobile and Tablet Tag Information collapsed */}
        <div className="border-b h-10">
          <div className="container mx-auto px-4">
            <button
              type="button"
              className="w-full py-2 flex items-center justify-between"
              onClick={toggleCategoryPageMobileCategoryInfo}
              aria-expanded={
                categoryPageMobileExpandedSection === 'categoryInfo'
              }
              aria-controls="mobile-tag-information"
            >
              <span className="font-medium">Tag Information</span>
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform ${
                  categoryPageMobileExpandedSection === 'categoryInfo'
                    ? 'transform rotate-180'
                    : ''
                }`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* Mobile and Tablet Tag Information expanded */}
        {categoryPageMobileExpandedSection === 'categoryInfo' && (
          <div
            id="mobile-tag-information"
            className="lg:hidden flex-1 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-y-auto"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-2">
                <Link
                  href={`/rss/${tag}/`}
                  className="flex items-center space-x-2 text-primary hover:underline"
                >
                  <RssIcon className="h-4 w-4" />
                  <span>RSS Feed</span>
                </Link>
              </nav>
              <h3 className="mt-6 mb-2 text-md font-semibold">
                Related Categories
              </h3>
              <nav>
                {relatedCategories.length > 0 ? (
                  relatedCategories.map(([category, score], i) => (
                    <div key={i} className="flex flex-wrap gap-2">
                      <Link
                        href={`/categories${category
                          .map((segment) => '/' + segment)
                          .join('')}/`}
                      >
                        {category.join(' / ')} - (
                        {Math.round(score * 1000) / 10}%)
                      </Link>
                    </div>
                  ))
                ) : (
                  <p>This tag has no related categories.</p>
                )}
              </nav>
              <h3 className="mt-6 mb-2 text-md font-semibold">Related Tags</h3>
              <nav className="space-y-2">
                {relatedTags.map(([tag, score]) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}/`}
                    className="block hover:underline"
                  >
                    {tag} - ({Math.round(score * 1000) / 10}%)
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 flex-1 items-start md:grid md:grid-cols-[auto_minmax(0,1fr)] md:gap-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-10">
        {/* Left Sidebar for larger screens */}
        <aside
          className={cn(
            'hidden md:block sticky top-14 z-30 h-[calc(100vh-3.5rem)] shrink-0 transition-all duration-300',
            leftAsideExpanded
              ? 'w-[280px] overflow-y-auto'
              : 'w-[40px] overflow-hidden',
          )}
        >
          <div className="py-6 pr-6 lg:py-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2
                className={cn(
                  'text-lg font-semibold',
                  !leftAsideExpanded && 'sr-only',
                )}
              >
                Posts
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLeftAsideExpanded}
                aria-label={
                  leftAsideExpanded
                    ? 'Collapse left sidebar'
                    : 'Expand left sidebar'
                }
              >
                {leftAsideExpanded ? (
                  <ChevronLeftIcon className="h-4 w-4" />
                ) : (
                  <MenuIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
            {leftAsideExpanded && (
              // <Tabs defaultValue={categories[0].name} className="flex-grow">
              //   <TabsList>
              //     {categories.map((category) => (
              //       <TabsTrigger key={category.name} value={category.name}>
              //         {category.name}
              //       </TabsTrigger>
              //     ))}
              //   </TabsList>
              //   {categories.map((category) => (
              //     <TabsContent key={category.name} value={category.name}>
              //       <PostTree category={category} isRoot />
              //     </TabsContent>
              //   ))}
              // </Tabs>
              <HierarchyTop />
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex w-full flex-col overflow-hidden py-6">
          <article className="prose dark:prose-invert max-w-none">
            <h1 className="text-3xl font-bold mb-4">Tag: {tag}</h1>

            <h2 id="posts" className="text-2xl font-semibold mt-6 mb-4">
              Posts
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </article>

          {/* Comments Section */}
          {/* <section className="mt-8">
            <h2 id="comments" className="text-2xl font-bold mb-4">
              Comments
            </h2>
            // TODO: add comment for category
          </section> */}
        </main>

        {/* Right Sidebar for larger screens */}
        <aside
          className={cn(
            'hidden lg:block sticky top-14 self-start h-[calc(100vh-3.5rem)] transition-all duration-300',
            rightAsideExpanded
              ? 'w-[250px] overflow-y-auto'
              : 'w-[40px] overflow-hidden',
          )}
        >
          <div className="py-6 pl-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2
                className={cn(
                  'text-lg font-semibold',
                  !rightAsideExpanded && 'sr-only',
                )}
              >
                Tag Information
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleRightAsideExpanded}
                aria-label={
                  rightAsideExpanded
                    ? 'Collapse right sidebar'
                    : 'Expand right sidebar'
                }
              >
                {rightAsideExpanded ? (
                  <ChevronRightIcon className="h-4 w-4" />
                ) : (
                  <MenuIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
            {rightAsideExpanded && (
              <>
                <nav className="space-y-2">
                  <Link
                    href={`/rss/${tag}/`}
                    className="flex items-center space-x-2 text-primary hover:underline"
                  >
                    <RssIcon className="h-4 w-4" />
                    <span>RSS Feed</span>
                  </Link>
                </nav>
                <h3 className="mt-6 mb-2 text-md font-semibold">
                  Related Categories
                </h3>
                <nav>
                  {relatedCategories.length > 0 ? (
                    relatedCategories.map(([category, score], i) => (
                      <div key={i} className="flex flex-wrap gap-2">
                        <Link
                          href={`/categories${category
                            .map((segment) => '/' + segment)
                            .join('')}/`}
                        >
                          {category.join(' / ')} - (
                          {Math.round(score * 1000) / 10}%)
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p>This tag has no related categories.</p>
                  )}
                </nav>
                <h3 className="mt-6 mb-2 text-md font-semibold">
                  Related Tags
                </h3>
                <nav className="space-y-2">
                  {relatedTags.map(([tag, score]) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag}/`}
                      className="block hover:underline"
                    >
                      {tag} - ({Math.round(score * 1000) / 10}%)
                    </Link>
                  ))}
                </nav>
              </>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
