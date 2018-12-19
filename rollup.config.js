import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript'
import serve from 'rollup-plugin-serve'
import pkg from './package.json'

const input = 'lib/index.ts'

const serveConf = {
  open: true,
  // openPage: './example/index.html'
  contentBase: ['dist']
}

export default {
  input,
  output: [
    {
      name: 'vuelike',
      file: pkg.browser,
      format: 'umd'
    },
    {
      file: pkg.module,
      format: 'es'
    },
    {
      file: pkg.main,
      format: 'cjs'
    }
  ],
  plugins: [
    resolve(),
    typescript(),
    serve(serveConf)
  ]
}