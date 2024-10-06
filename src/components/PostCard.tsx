'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@mjy-blog/theme-example-ui-library/components/ui/card';
import { Post } from '@mjy-blog/theme-lib';
import Link from 'next/link';
import { useMemo } from 'react';

import { CustomPostAttribute } from '../CustomPostAttribute';
import { useDateTimeRepresentation } from '../hooks/useDateTimeRepresentation';

export interface PostCardProps {
  post: Post<CustomPostAttribute>;
}

export function PostCard({ post }: PostCardProps) {
  const updateTime = useDateTimeRepresentation(
    useMemo(
      () => new Date(post.attributes.updateTime),
      [post.attributes.updateTime],
    ),
  );
  return (
    <Link href={`/posts/${post.slug}`}>
      <Card>
        <CardHeader>
          <CardTitle>{post.attributes.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{post.attributes.excerpt}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span className="text-sm text-muted-foreground">{updateTime}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
