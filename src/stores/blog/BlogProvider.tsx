'use client';

import { PropsWithChildren, useRef } from 'react';
import { StoreApi } from 'zustand';

import { BlogContext } from './BlogContext';
import { BlogStore } from './BlogStore';
import { createBlogStore } from './createBlogStore';

export const BlogProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<StoreApi<BlogStore>>();
  if (!storeRef.current) {
    storeRef.current = createBlogStore();
  }

  return (
    <BlogContext.Provider value={storeRef.current}>
      {children}
    </BlogContext.Provider>
  );
};
