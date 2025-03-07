import path from 'path'
import { buildWebpack } from './config/build'
import { BuildMode, BuildPaths } from './config/build/types'

export default function () {
  try {
    const mode = (process.env.NODE_ENV ?? 'production') as BuildMode
    const isDev = mode === BuildMode.DEV
    const isProd = mode === BuildMode.PROD

    const paths:Record<BuildPaths, string> = {
      app: path.resolve(__dirname, 'src', 'app'),
      src: path.resolve(__dirname, 'src'),
      images: path.resolve(__dirname, 'src', 'shared', 'assets', 'images'),
      shared: path.resolve(__dirname, 'src', 'shared'),
      widgets: path.resolve(__dirname, 'src', 'widgets'),
      pages: path.resolve(__dirname, 'src', 'pages'),
      entities: path.resolve(__dirname, 'src', 'entities'),
      public: path.resolve(__dirname, 'public'),
      dist: path.resolve(__dirname, 'dist'),
      stylelint: path.resolve(__dirname, '.stylelintrc.mjs'),
      fonts: path.join(__dirname, 'src', 'app', 'styles', 'fonts'),
      cssVars: path.join(__dirname, 'src', 'shared', 'styles', 'variables.ts')
    }

    return buildWebpack({
      mode,
      port: 3000,
      isProd,
      isDev,
      paths
    })
  } catch (e) {
    throw new Error('no matching configuration was found :(((((')
  }
}
