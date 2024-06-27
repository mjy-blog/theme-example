'use client';

import { useEffect, useState } from 'react';

function representation(dateTime: Date) {
  return `${dateTime.getFullYear()}. ${
    dateTime.getMonth() + 1
  }. ${dateTime.getDate()}.`;
}

// TODO: replace it with enhanced, separate library

interface TimeoutHolder {
  timeout?: NodeJS.Timeout;
}

function startWork(dateTime: Date, setResult: (result: string) => void) {
  const timeoutHolder: TimeoutHolder = {};

  doWork(dateTime, setResult, timeoutHolder);

  return () => {
    if (timeoutHolder.timeout) {
      clearTimeout(timeoutHolder.timeout);
    }
  };
}

function doWork(
  dateTime: Date,
  setResult: (result: string) => void,
  timeoutHolder: TimeoutHolder,
) {
  timeoutHolder.timeout = undefined;
  function next(delayInMs: number) {
    timeoutHolder.timeout = setTimeout(
      () => doWork(dateTime, setResult, timeoutHolder),
      delayInMs,
    );
  }
  const elapsedTime = Date.now() - dateTime.getTime();

  // n초 전
  if (elapsedTime < 60000) {
    setResult(`${Math.floor(elapsedTime / 1000)}초 전`);
    next(1000);
    return;
  }

  // n분 전
  if (elapsedTime < 3600000) {
    setResult(`${Math.floor(elapsedTime / 60000)}분 전`);
    next(60000);
    return;
  }

  // n시간 전
  if (elapsedTime < 86400000) {
    setResult(`${Math.floor(elapsedTime / 3600000)}시간 전`);
    next(86400000);
    return;
  }

  setResult(representation(dateTime));
}

export function useDateTimeRepresentation(dateTime: Date): string {
  const [result, setResult] = useState<string>(() => representation(dateTime));

  useEffect(() => startWork(dateTime, setResult), [dateTime, setResult]);

  return result;
}
