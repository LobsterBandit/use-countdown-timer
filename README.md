# use-countdown-timer

> React hook exposing a countdown timer with optional expiration and reset callbacks

[![NPM](https://img.shields.io/npm/v/use-countdown-timer.svg)](https://www.npmjs.com/package/use-countdown-timer) [![Bundlephobia](https://img.shields.io/bundlephobia/minzip/use-countdown-timer.svg)](https://bundlephobia.com/result?p=use-countdown-timer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-airbnb-ff5a5f.svg)](https://www.npmjs.com/package/eslint-config-airbnb) [![Code Formatting](https://img.shields.io/badge/formatting-prettier-ff69b4.svg)](https://prettier.io/)

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
