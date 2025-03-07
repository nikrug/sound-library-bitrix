import webpack from 'webpack'
import { buildDevServer } from './buildDevServer'
import { buildEntries } from './buildEntries'
import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'
import { buildResolvers } from './buildResolvers'
import { BuildOptions } from './types'
import TerserPlugin from 'terser-webpack-plugin'

export function buildWebpack (options:BuildOptions):webpack.Configuration {
  return {
    mode: options.mode,
    devtool: options.isDev && 'inline-source-map',
    stats: 'minimal',
    entry: buildEntries(options),
    output: {
      path: options.paths.dist,
      publicPath: 'auto',
      clean: true
    },
    resolve: buildResolvers(options),
    optimization: {
      minimize: options.isProd,
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          exclude: /public/,
          terserOptions: {
            compress: {
              drop_console: options.isProd // Убирает console.logs в продакшн-режиме
            }
          }
        })
      ]
    },
    devServer: options.isDev
      ? buildDevServer(options)
      : undefined,
    module: {
      rules: buildLoaders(options)
    },
    plugins: buildPlugins(options)
  }
}
