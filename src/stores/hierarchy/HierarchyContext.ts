'use client';

import { createContext } from 'react';
import { StoreApi } from 'zustand';

import { HierarchyStore } from './HierarchyStore';

export const HierarchyContext = createContext<StoreApi<HierarchyStore> | null>(
  null,
);
