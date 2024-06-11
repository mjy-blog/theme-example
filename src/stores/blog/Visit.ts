'use client';

import { Post } from '@mjy-blog/theme-lib';
import { useEffect } from 'react';

import { CustomPostAttribute } from '../../CustomPostAttribute';
import { useBlog } from './useBlog';

export interface VisitProps {
  post: Post<CustomPostAttribute>;
}

export function Visit({ post }: VisitProps) {
  const visit = useBlog(({ visit }) => visit);

  useEffect(() => {
    visit(post);
    return () => visit(undefined);
  }, [post, visit]);

  return null;
}
