'use client';

import { useCallback, useState } from 'react';

export function UnderConstructionBanner() {
  const [show, setShow] = useState(true);
  const handleClick = useCallback(() => setShow(false), []);

  return (
    show && (
      <div className="box-border flex p-4 items-start bg-purple-500">
        <div className="flex-1 text-white text-4xl">
          개발중인 미완성 페이지로, 일부 기능이 동작하지 않을 수 있습니다.
        </div>
        <button className="text-white bg-black px-2" onClick={handleClick}>
          x
        </button>
      </div>
    )
  );
}
