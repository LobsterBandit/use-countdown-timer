import path from 'path'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import pkg from './package.json'

const input = 'src/index.ts'
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

export default [
  {
    input,
    output: {
      dir: path.dirname(pkg.main),
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      typescript({
        declaration: true,
        declarationDir: path.dirname(pkg.module),
        declarationMap: true,
        exclude: ['src/**/*.test.ts'],
      }),
      commonjs(),
    ],
    external,
  },
  {
    input,
    output: {
      file: pkg.module,
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      typescript(),
      commonjs(),
    ],
    external,
  },
]
