import React, { useState } from 'react'
import { useCountdownTimer } from 'use-countdown-timer'

export default function App() {
  const [timer] = useState(1000 * 5)
  const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
    timer,
    onExpire: () => {
      setActions((actions) => [...actions, 'Expire Callback'])
    },
    onReset: () => {
      setActions((actions) => [...actions, 'Reset Callback'])
    },
  })
  const [actions, setActions] = React.useState<string[]>([])

  const logAction = (message: string, action: () => void) => {
    setActions((actions) => [...actions, message])
    action()
  }

  return (
    <>
      <div>{countdown}</div>
      <button
        onClick={() =>
          isRunning ? logAction('Pause', pause) : logAction('Start', start)
        }
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => logAction('Reset', reset)}>Reset</button>

      <p>Actions Taken</p>
      <ul>
        {actions.map((action, index) => (
          <li key={`${action}-${index}`}>{action}</li>
        ))}
      </ul>
    </>
  )
}
