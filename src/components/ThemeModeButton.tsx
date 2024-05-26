'use client';

import { Mode, ModeContext } from '@-ft/mode-next';
import { ChangeEvent, useCallback, useContext } from 'react';

export function ThemeModeButton() {
  const { mode, setMode } = useContext(ModeContext);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) =>
      setMode(event.target.value as Mode),
    [setMode],
  );

  return (
    <select onChange={handleChange} value={mode ?? 'system'}>
      <option value="system">시스템</option>
      <option value="dark">다크모드</option>
      <option value="light">라이트모드</option>
    </select>
  );
}
