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
      {new Date(attributes.createTime).getTime() !==
        new Date(attributes.updateTime).getTime() && (
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
