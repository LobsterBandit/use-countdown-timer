import { useCallback, useEffect, useRef, useState } from 'react';

export interface ICountdownTimerParams {
  timer: number;
  interval?: number;
  autostart?: boolean;
  expireImmediate?: boolean;
  resetOnExpire?: boolean;
  onExpire?: () => void;
  onReset?: () => void;
}

export type CountdownTimerResults = {
  countdown: number;
  isRunning: boolean;
  start: () => void;
  reset: () => void;
  pause: () => void;
};

export function useCountdownTimer({
  timer,
  interval = 1000,
  autostart = false,
  expireImmediate = false,
  resetOnExpire = true,
  onExpire,
  onReset,
}: ICountdownTimerParams): CountdownTimerResults {
  const [countdown, setCountdown] = useState(timer);
  const [canStart, setCanStart] = useState(autostart);
  const [isRunning, setIsRunning] = useState(false);

  function start() {
    // must explicitly call reset() before starting an expired timer
    if (countdown !== 0) {
      setCanStart(true);
    }
  }

  function pause() {
    setCanStart(false);
    setIsRunning(false);
  }

  function initStopped(time: number) {
    setCanStart(false);
    setIsRunning(false);
    setCountdown(time);
  }

  const reset = useCallback(() => {
    initStopped(timer);
    if (onReset && typeof onReset === 'function') {
      onReset();
    }
  }, [timer, onReset]);

  const expire = useCallback(() => {
    initStopped(resetOnExpire ? timer : 0);
    if (onExpire && typeof onExpire === 'function') {
      onExpire();
    }
  }, [timer, onExpire, resetOnExpire]);

  const countdownRef = useRef<number>(timer);
  useEffect(() => {
    countdownRef.current = countdown;
  }, [countdown]);

  useEffect(() => {
    function tick() {
      if (
        countdownRef.current / 1000 <= 0 ||
        (expireImmediate && (countdownRef.current - interval) / 1000 <= 0)
      ) {
        expire();
      } else {
        setCountdown(prev => prev - interval);
      }
    }

    let id: NodeJS.Timeout;
    if (canStart) {
      id = setInterval(tick, interval);
      if (!isRunning) {
        setIsRunning(true);
      }
    }
    return () => clearInterval(id);
  }, [expire, canStart, interval, expireImmediate, isRunning]);

  return {
    countdown,
    start,
    reset,
    pause,
    isRunning,
  };
}
