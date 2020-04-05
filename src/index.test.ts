import { renderHook } from '@testing-library/react-hooks';
import { useCountdownTimer } from '.';

describe('useCountdownTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  describe('initialization', () => {
    it('sets countdown to timer param', () => {
      const { result } = renderHook(() =>
        useCountdownTimer({ timer: 5 * 1000 })
      );
      expect(result.current.countdown).toBe(5 * 1000);
    });

    it('starts in a not running state', () => {
      const { result } = renderHook(() =>
        useCountdownTimer({ timer: 5 * 1000 })
      );
      expect(result.current.isRunning).toBe(false);
    });
  });
});
