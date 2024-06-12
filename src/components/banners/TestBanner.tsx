'use client';

import { useCallback, useState } from 'react';

export function TestBanner() {
  const [show, setShow] = useState(true);
  const handleClick = useCallback(() => setShow(false), []);

  return (
    show && (
      <div className="box-border flex p-4 items-start bg-gray-500">
        <div className="flex-1 text-white text-6xl">테스트 배너입니다.</div>
        <button className="text-white bg-black px-2" onClick={handleClick}>
          x
        </button>
      </div>
    )
  );
}
