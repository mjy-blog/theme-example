'use client';

import { Badge } from '@mjy-blog/theme-example-ui-library/components/ui/badge';
import { Button } from '@mjy-blog/theme-example-ui-library/components/ui/button';
import { cn } from '@mjy-blog/theme-example-ui-library/lib/utils';
import { PostPageProps } from '@mjy-blog/theme-lib';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MenuIcon,
} from 'lucide-react';
import Link from 'next/link';
import {
  KeyboardEvent,
  LegacyRef,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { CustomPostAttribute } from './CustomPostAttribute';
import { Comment } from './components/Comment';
import { PostAttributes } from './components/PostAttributes';
import { Breadcrumb } from './components/breadcrumb/Breadcrumb';
import { HierarchyTop } from './components/hierarchy/HierarchyTop';
import { LoadMermaid } from './components/util/LoadMermaid';
import { Visit } from './stores/blog/Visit';
import { useBlog } from './stores/blog/useBlog';
import { MergeHierarchy } from './stores/hierarchy/MergeHierarchy';

interface MDXContentWrapperProps {
  divRef: LegacyRef<HTMLDivElement>;
  MDXContext: ReactElement;
}

function MDXContentWrapper({ divRef, MDXContext }: MDXContentWrapperProps) {
  return (
    <div ref={divRef} className="mdx-content-container">
      {MDXContext}
    </div>
  );
}

export function PostPage({
  hierarchy,
  attributes,
  MDXContent,
  slug,
  tocItems,
}: PostPageProps<CustomPostAttribute>) {
  const postPageMobileExpandedSection = useBlog(
    ({ postPageMobileExpandedSection }) => postPageMobileExpandedSection,
  );
  const leftAsideExpanded = useBlog(
    ({ leftAsideExpanded }) => leftAsideExpanded,
  );
  const rightAsideExpanded = useBlog(
    ({ rightAsideExpanded }) => rightAsideExpanded,
  );
  const togglePostPageMobilePostList = useBlog(
    ({ togglePostPageMobilePostList }) => togglePostPageMobilePostList,
  );
  const togglePostPageMobileToc = useBlog(
    ({ togglePostPageMobileToc }) => togglePostPageMobileToc,
  );
  const toggleLeftAsideExpanded = useBlog(
    ({ toggleLeftAsideExpanded }) => toggleLeftAsideExpanded,
  );
  const toggleRightAsideExpanded = useBlog(
    ({ toggleRightAsideExpanded }) => toggleRightAsideExpanded,
  );
  const handlePostListKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      togglePostPageMobilePostList();
    }
  }, []);
  const handleTocKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      togglePostPageMobileToc();
    }
  }, []);

  const [activeSection, setActiveSection] = useState(tocItems[0]?.id);

  const [element, ref] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const map: Record<string, boolean> = {};
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          map[entry.target.id] = entry.isIntersecting;
        });

        const first = tocItems.findIndex(({ id }) => map[id]);
        if (first !== -1) {
          setActiveSection(tocItems[Math.max(first - 1, 0)].id);
        } else {
          setActiveSection(tocItems[tocItems.length - 1].id);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-100px 0px -30%',
      },
    );

    element?.querySelectorAll('h1[id],h2[id],h3[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [element]);

  useEffect(() => {
    if (postPageMobileExpandedSection) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [postPageMobileExpandedSection]);

  return (
    <>
      <Visit post={{ slug, attributes }} />
      <MergeHierarchy toMerge={hierarchy} />

      <div
        className={cn(
          'lg:hidden sticky flex flex-col top-14 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
          postPageMobileExpandedSection && 'h-[calc(100vh-3.5rem)]',
        )}
      >
        {/* Mobile Post List collapsed */}
        <div className="md:hidden border-b h-10">
          <div className="container mx-auto px-4">
            <div
              className="py-2 flex items-center justify-between cursor-pointer"
              onClick={togglePostPageMobilePostList}
              role="button"
              tabIndex={0}
              onKeyDown={handlePostListKeyDown}
              aria-expanded={postPageMobileExpandedSection === 'postList'}
              aria-controls="mobile-post-list"
            >
              <span className="font-medium">Posts</span>
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform ${
                  postPageMobileExpandedSection === 'postList'
                    ? 'transform rotate-180'
                    : ''
                }`}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Mobile Post List expanded */}
        {postPageMobileExpandedSection === 'postList' && (
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

        {/* Mobile and Tablet TOC collapsed */}
        <div className="border-b h-10">
          <div className="container mx-auto px-4">
            <div
              className="py-2 flex items-center justify-between cursor-pointer"
              onClick={togglePostPageMobileToc}
              role="button"
              tabIndex={0}
              onKeyDown={handleTocKeyDown}
              aria-expanded={postPageMobileExpandedSection === 'toc'}
              aria-controls="mobile-toc"
            >
              <span className="font-medium">
                {tocItems.find((item) => item.id === activeSection)?.title}
              </span>
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform ${
                  postPageMobileExpandedSection === 'toc'
                    ? 'transform rotate-180'
                    : ''
                }`}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Mobile and Tablet TOC expanded */}
        {postPageMobileExpandedSection === 'toc' && (
          <div
            id="mobile-toc"
            className="lg:hidden flex-1 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-y-auto"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-2">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block py-2 ${
                      activeSection === item.id ? 'font-semibold' : ''
                    }`}
                    onClick={togglePostPageMobileToc}
                  >
                    {item.title}
                  </a>
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
            <Breadcrumb categories={attributes.categories} />
            <h1 className="text-3xl font-bold mb-4">{attributes.title}</h1>
            <PostAttributes attributes={attributes} />
            <MDXContentWrapper divRef={ref} MDXContext={MDXContent} />
            {attributes.tags.map((tag) => (
              <Link href={`/tags/${tag}/`} key={tag}>
                <Badge>{tag}</Badge>
              </Link>
            ))}
          </article>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            <Comment slug={slug} />
          </section>
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
                Table of Contents
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
              <nav className="space-y-2">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block hover:underline ${
                      activeSection === item.id ? 'font-semibold' : ''
                    }`}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </aside>
      </div>

      <LoadMermaid />
    </>
  );
}
