import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

import pkg from './package.json'

const tsconfigOverride = { exclude: ['src/**/*.test.ts'] }

export default {
  input: 'src/index.ts',
  external: ['react'],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [resolve(), typescript(tsconfigOverride), commonjs()],
}
