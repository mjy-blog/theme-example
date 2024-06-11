'use client';

import { createContext } from 'react';
import { StoreApi } from 'zustand';

import { BlogStore } from './BlogStore';

export const BlogContext = createContext<StoreApi<BlogStore> | null>(null);
