'use client';

import mermaid from 'mermaid';
import { useEffect } from 'react';

export function LoadMermaid() {
  useEffect(() => mermaid.contentLoaded(), []);
  return null;
}
