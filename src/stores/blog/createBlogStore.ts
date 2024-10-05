import { createStore } from 'zustand';

import { BlogStore } from './BlogStore';

export function createBlogStore() {
  return createStore<BlogStore>((set) => ({
    currentPost: undefined,
    visit: (newPost) => set(() => ({ currentPost: newPost })),
    postPageMobileExpandedSection: undefined,
    leftAsideExpanded: true,
    rightAsideExpanded: true,
    togglePostPageMobilePostList: () =>
      set(({ postPageMobileExpandedSection }) => ({
        postPageMobileExpandedSection: postPageMobileExpandedSection
          ? 'postList'
          : undefined,
      })),
    togglePostPageMobileToc: () =>
      set(({ postPageMobileExpandedSection }) => ({
        postPageMobileExpandedSection: postPageMobileExpandedSection
          ? 'toc'
          : undefined,
      })),
    toggleLeftAsideExpanded: () =>
      set(({ leftAsideExpanded }) => ({
        leftAsideExpanded: !leftAsideExpanded,
      })),
    toggleRightAsideExpanded: () =>
      set(({ rightAsideExpanded }) => ({
        rightAsideExpanded: !rightAsideExpanded,
      })),
  }));
}
