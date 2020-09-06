import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import ts from '@wessberg/rollup-plugin-ts';
import bundleSize from 'rollup-plugin-bundle-size';
import { terser } from 'rollup-plugin-terser';

const pkg = require('./package.json');

const plugins = [
  resolve({ extensions: ['.js', '.ts'] }),
  commonjs(),
  json(),
  ts({
    browserslist: 'defaults and not IE 11'
  }),
  bundleSize()
];

const outputs = [
  {
    input: 'src/index.ts',
    output: {
      file: 'build/vega-themes.module.js',
      format: 'esm'
    },
    plugins,
    external: [...Object.keys(pkg.peerDependencies)]
  }, {
    input: 'src/index.ts',
    output: [
      {
        file: `build/vega-themes.js`,
        format: 'iife',
        name: 'vegaThemes',
        exports: 'named'
      },
      {
        file: `build/vega-themes.min.js`,
        format: 'iife',
        name: 'vegaThemes',
        exports: 'named',
        plugins: [terser()]
      }
    ],
    plugins,
    external: ['vega']
  }
];

export default outputs;
