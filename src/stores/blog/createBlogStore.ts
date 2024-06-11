import { createStore } from 'zustand';

import { BlogStore } from './BlogStore';

export function createBlogStore() {
  return createStore<BlogStore>((set) => ({
    currentPost: undefined,
    visit: (newPost) => set(() => ({ currentPost: newPost })),
  }));
}
