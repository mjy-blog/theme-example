'use client';

import { useDateTimeRepresentation } from '../hooks/useDateTimeRepresentation';
import { ArticleAttributes } from '../types/ArticleAttributes';

export interface PostAttributesProps {
  attributes: ArticleAttributes;
}

export function PostAttributes({ attributes }: PostAttributesProps) {
  return (
    <div className="flex gap-2 text-gray-500">
      <span>{useDateTimeRepresentation(new Date(attributes.createTime))}</span>
      {attributes.createTime !== attributes.updateTime && (
        <>
          <span>|</span>
          <span>
            {useDateTimeRepresentation(new Date(attributes.updateTime))}
          </span>
        </>
      )}
    </div>
  );
}
