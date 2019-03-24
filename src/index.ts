import { useCallback, useEffect, useRef, useState } from 'react';

export interface ICountdownTimerParams {
  timer: number;
  interval?: number;
  autostart?: boolean;
  expireImmediate?: boolean;
  onExpire?: () => void;
  onReset?: () => void;
}

export type CountdownTimerResults = {
  countdown: number;
  start: () => void;
  reset: () => void;
};

export function useCountdownTimer({
  timer,
  interval = 1000,
  autostart = false,
  expireImmediate = false,
  onExpire,
  onReset,
}: ICountdownTimerParams): CountdownTimerResults {
  const [countdown, setCountdown] = useState(timer);
  const [canStart, setCanStart] = useState(autostart);

  function start(): void {
    setCanStart(true);
  }

  const reset = useCallback(() => {
    setCanStart(false);
    setCountdown(timer);
    if (onReset && typeof onReset === 'function') {
      onReset();
    }
  }, [timer, onReset]);

  const expire = useCallback(() => {
    setCanStart(false);
    setCountdown(timer);
    if (onExpire && typeof onExpire === 'function') {
      onExpire();
    }
  }, [timer, onExpire]);

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
    }
    return () => clearInterval(id);
  }, [expire, canStart, interval, expireImmediate]);

  return {
    countdown,
    start,
    reset,
  };
}
