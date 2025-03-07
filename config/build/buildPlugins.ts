import CopyWebpackPlugin from 'copy-webpack-plugin'
import { Configuration } from 'webpack'
import { BuildOptions } from './types'
import ESLintPlugin from 'eslint-webpack-plugin'
import StylelintPlugin from 'stylelint-webpack-plugin'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PugPlugin = require('pug-plugin')

export function buildPlugins (options: BuildOptions): Configuration['plugins'] {
  const plugins: Configuration['plugins'] = []

  plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        { from: options.paths.public, to: 'public/' }
      ]
    })
  )

  plugins.push(
    new StylelintPlugin({
      configFile: options.paths.stylelint,
      context: options.paths.src,
      files: '**/*.s?(a|c)ss',
      failOnError: !options.isDev,
      quiet: false
    })
  )

  plugins.push(
    new PugPlugin({
      pretty: true,
      js: {
        filename: 'js/[name].js'
      },
      css: {
        filename: 'css/[name].css'
      }
    }))

  plugins.push(
    new ESLintPlugin({
      files: 'src/**/*.ts',
      cache: true,
      lintDirtyModulesOnly: options.isDev
    })
  )
  return plugins
}
