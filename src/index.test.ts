import { renderHook, act } from '@testing-library/react-hooks';
import { useCountdownTimer } from '.';

describe('useCountdownTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  describe('initialization', () => {
    it('sets countdown to timer param', () => {
      const timer = 5 * 1000;
      const { result } = renderHook(() => useCountdownTimer({ timer }));
      expect(result.current.countdown).toBe(timer);
    });

    it('starts in a not running state', () => {
      const timer = 5 * 1000;
      const { result } = renderHook(() => useCountdownTimer({ timer }));
      expect(result.current.isRunning).toBe(false);
    });

    it('autostart param immediately starts countdown', () => {
      const { result } = renderHook(() =>
        useCountdownTimer({ timer: 5 * 1000, autostart: true })
      );

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.countdown).toBe(4 * 1000);
    });

    it('custom interval', () => {
      const interval = 999;
      const timer = 1 + interval;
      const { result } = renderHook(() =>
        useCountdownTimer({ timer, interval, autostart: true })
      );

      act(() => {
        jest.advanceTimersByTime(interval);
      });

      expect(result.current.isRunning).toBe(true);
      expect(result.current.countdown).toBe(1);

      act(() => {
        jest.runAllTimers();
      });

      expect(result.current.isRunning).toBe(false);
      expect(result.current.countdown).toBe(timer);
    });
  });

  describe('after expiration', () => {
    it('countdown resets to timer', () => {
      const timer = 5 * 1000;
      const { result } = renderHook(() =>
        useCountdownTimer({ timer, autostart: true })
      );

      act(() => {
        jest.runAllTimers();
      });

      expect(result.current.countdown).toBe(timer);
    });

    it('countdown not resets to timer', () => {
      const timer = 5 * 1000;
      const { result } = renderHook(() =>
        useCountdownTimer({ timer, autostart: true, resetOnExpire: false })
      );

      act(() => {
        jest.runAllTimers();
      });

      expect(result.current.countdown).toBe(0);
    });

    it('countdown is not running w/ autostart: true', () => {
      const timer = 5 * 1000;
      const { result } = renderHook(() =>
        useCountdownTimer({ timer, autostart: true })
      );

      act(() => {
        jest.runAllTimers();
      });

      expect(result.current.countdown).toBe(timer);
      expect(result.current.isRunning).toBe(false);
    });

    it('countdown is not running w/ autostart: false', () => {
      const timer = 5 * 1000;
      const { result } = renderHook(() =>
        useCountdownTimer({ timer, autostart: false })
      );

      act(() => {
        result.current.start();
        jest.runAllTimers();
      });

      expect(result.current.countdown).toBe(timer);
      expect(result.current.isRunning).toBe(false);
    });
  });

  describe('return methods', () => {
    it('start - starts countdown', () => {
      const timer = 5 * 1000;
      const { result } = renderHook(() => useCountdownTimer({ timer }));

      expect(result.current.countdown).toBe(timer);

      act(() => {
        result.current.start();
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.countdown).toBe(4 * 1000);
    });

    it('pause - stops countdown', () => {
      const interval = 1000;
      const timer = 5 * interval;
      const { result } = renderHook(() => useCountdownTimer({ timer }));

      act(() => {
        result.current.start();
        jest.advanceTimersByTime(interval);
        result.current.pause();
        jest.advanceTimersByTime(interval);
      });

      expect(result.current.countdown).toBe(4 * interval);
    });

    it('reset - sets countdown to initial timer', () => {
      const interval = 1000;
      const timer = 5 * interval;
      const { result } = renderHook(() => useCountdownTimer({ timer }));

      act(() => {
        result.current.start();
        jest.advanceTimersByTime(interval);
      });

      expect(result.current.countdown).toBe(4 * interval);

      act(() => {
        result.current.reset();
        jest.advanceTimersByTime(interval);
      });

      expect(result.current.isRunning).toBe(false);
      expect(result.current.countdown).toBe(timer);
    });
  });

  describe('callbacks', () => {
    it('onReset - fires when reset() called', () => {
      const timer = 5 * 1000;
      const onReset = jest.fn();
      const { result } = renderHook(() =>
        useCountdownTimer({ timer, onReset })
      );

      act(() => {
        result.current.reset();
      });

      expect(onReset).toHaveBeenCalledTimes(1);
    });

    it('onExpire w/o expireImmediate - fires one interval after countdown reaches 0', () => {
      const interval = 1000;
      const timer = 5 * interval;
      const onExpire = jest.fn();
      renderHook(() =>
        useCountdownTimer({
          timer,
          interval,
          onExpire,
          autostart: true,
        })
      );

      act(() => {
        jest.advanceTimersByTime(timer);
      });

      expect(onExpire).toHaveBeenCalledTimes(0);

      act(() => {
        jest.advanceTimersByTime(interval);
      });

      expect(onExpire).toHaveBeenCalledTimes(1);
    });

    it('onExpire w/ expireImmediate - fires immediately after countdown reaches 0', () => {
      const interval = 1000;
      const timer = 5 * interval;
      const onExpire = jest.fn();
      renderHook(() =>
        useCountdownTimer({
          timer,
          interval,
          onExpire,
          autostart: true,
          expireImmediate: true,
        })
      );

      act(() => {
        jest.advanceTimersByTime(timer);
      });

      expect(onExpire).toHaveBeenCalledTimes(1);

      act(() => {
        jest.advanceTimersByTime(interval);
      });

      expect(onExpire).toHaveBeenCalledTimes(1);
    });
  });
});
