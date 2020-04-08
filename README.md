# use-countdown-timer

> React hook exposing a countdown timer with optional expiration and reset callbacks

[![CI](https://github.com/LobsterBandit/use-countdown-timer/workflows/CI/badge.svg)](https://github.com/LobsterBandit/use-countdown-timer/actions?query=workflow%3ACI)
[![NPM](https://img.shields.io/npm/v/use-countdown-timer.svg)](https://www.npmjs.com/package/use-countdown-timer)
[![Bundlephobia](https://img.shields.io/bundlephobia/minzip/use-countdown-timer.svg)](https://bundlephobia.com/result?p=use-countdown-timer)
[![Coverage Status](https://coveralls.io/repos/github/LobsterBandit/use-countdown-timer/badge.svg?branch=master)](https://coveralls.io/github/LobsterBandit/use-countdown-timer?branch=master)

## Install

```bash
npm install --save use-countdown-timer
```

## Parameters and Return Types

`use-countdown-timer` is written in TypeScript and bundles type definitions.

```ts
export interface ICountdownTimerParams {
  timer: number;
  interval?: number;
  autostart?: boolean;
  expireImmediate?: boolean;
  onExpire?: () => void;
  onReset?: () => void;
}

export declare type CountdownTimerResults = {
  countdown: number;
  isRunning: boolean;
  start: () => void;
  reset: () => void;
  pause: () => void;
};
```

## Usage

```tsx
import React from 'react';

import { useCountdownTimer } from 'use-countdown-timer';

const Example = () => {
  const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
    timer: 1000 * 5,
  });

  return (
    <React.Fragment>
      <div>{countdown}</div>
      <button onClick={reset}>Reset</button>
      {isRunning ? (
        <button onClick={pause}>Pause</button>
      ) : (
        <button onClick={start}>Start</button>
      )}
    </React.Fragment>
  );
};
```

## Development

Local development involves two parts.

First, install and start the library so that it watches `src/` directory and automatically recompiles to `dist/` on change.

```bash
# clone the repo
git clone https://github.com/LobsterBandit/use-countdown-timer.git

# install dependencies
cd use-countdown-timer/
npm install

# start rollup in watch mode
npm start
```

Second, install and start the example app that is linked to your local `use-countdown-timer` version.

```bash
# in second terminal window
cd example/
npm install

# start create-react-app dev server
npm start
```

Now, any changes to `src/` in the local `use-countdown-timer` or to the example app's `example/src/` will live-reload the dev server.

## License

MIT © [LobsterBandit](https://github.com/LobsterBandit)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
