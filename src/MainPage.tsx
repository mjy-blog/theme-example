import { Badge } from '@mjy-blog/theme-example-ui-library/components/ui/badge';
import { Button } from '@mjy-blog/theme-example-ui-library/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@mjy-blog/theme-example-ui-library/components/ui/card';
import { MainPageProps } from '@mjy-blog/theme-lib';
import { ArrowRightIcon, BookOpenIcon, RssIcon, TagIcon } from 'lucide-react';
import Link from 'next/link';

import { HierarchyStaticLoader } from './components/hierarchy/HierarchyStaticLoader';
import { CustomPostAttribute } from './CustomPostAttribute';

export function MainPage({
  hierarchy: { nodes },
  recentPosts,
  recentCategories,
  recentTags,
}: MainPageProps<CustomPostAttribute>) {
  return (
    <>
      <HierarchyStaticLoader nodes={nodes} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="/placeholder.svg?height=400&width=800"
              alt="Featured post"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-6">
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome to TechBlog
              </h1>
              <p className="text-xl text-gray-200 mb-4">
                Explore the latest in web development, programming, and
                technology.
              </p>
              <Button asChild>
                <Link href="/posts">
                  Explore Posts <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <BookOpenIcon className="mr-2 h-8 w-8" />
            Recent Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`}>
                <Card>
                  <CardHeader>
                    <CardTitle>{post.attributes.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {post.attributes.excerpt}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Badge>{post.attributes.categories.join(' / ')}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {post.attributes.updateTime}
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Categories */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <TagIcon className="mr-2 h-8 w-8" />
            Recent Categories
          </h2>
          <div className="flex flex-wrap gap-4">
            {recentCategories.map((category, i) => (
              <Button key={i} variant="outline" asChild>
                <Link
                  href={`/categories${category
                    .map((segment) => '/' + segment)
                    .join('')}/`}
                >
                  {category}
                </Link>
              </Button>
            ))}
          </div>
        </section>

        {/* RSS */}
        <section className="mb-12 bg-muted p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4 flex items-center">
            <RssIcon className="mr-2 h-8 w-8" />
            Stay Updated with Our RSS Feed
          </h2>
          <p className="mb-4">
            Get instant updates on our latest articles and tech news directly in
            your favorite RSS reader.
          </p>
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="/rss/" className="flex items-center">
                <RssIcon className="mr-2 h-4 w-4" />
                Subscribe to RSS Feed
              </Link>
            </Button>
          </div>
        </section>

        {/* Recent Tags */}
        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <TagIcon className="mr-2 h-8 w-8" />
            Recent Tags
          </h2>
          <div className="flex flex-wrap gap-4">
            {recentTags.map((tag) => (
              <Link key={tag} href={`/tags/${tag}/`}>
                <Badge variant="secondary" className="text-lg py-1 px-3">
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
