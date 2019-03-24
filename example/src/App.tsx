import * as React from 'react';
import { useCountdownTimer } from 'use-countdown-timer';

export default function App() {
  const { countdown, start, reset } = useCountdownTimer({
    timer: 1000 * 5,
    onExpire: () => {
      setActions(actions => [...actions, 'Expire Callback']);
    },
    onReset: () => {
      setActions(actions => [...actions, 'Reset Callback']);
    },
  });
  const [actions, setActions] = React.useState<string[]>([]);

  const logAction = (message: string, action: () => void) => {
    setActions(actions => [...actions, message]);
    action();
  };

  return (
    <React.Fragment>
      <div>{countdown}</div>
      <button onClick={() => logAction('Start', start)}>Start</button>
      <button onClick={() => logAction('Reset', reset)}>Reset</button>

      <p>Actions Taken</p>
      <ul>
        {actions.map((action, index) => (
          <li key={`${action}-${index}`}>{action}</li>
        ))}
      </ul>
    </React.Fragment>
  );
}
