'use client';

import { useContext } from 'react';
import { useStore } from 'zustand';

import { BlogContext } from './BlogContext';
import { BlogStore } from './BlogStore';

export const useBlog = <T>(selector: (store: BlogStore) => T): T => {
  const BlogStoreContext = useContext(BlogContext)!;

  return useStore(BlogStoreContext, selector);
};
