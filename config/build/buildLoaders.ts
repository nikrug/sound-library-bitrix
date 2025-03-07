import { ModuleOptions } from 'webpack'
import { BuildOptions } from './types'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const PugPlugin = require('pug-plugin')

export function buildLoaders (options: BuildOptions): ModuleOptions['rules'] {
  type AnyObject = { [key: string]: any };

  function flattenObject (obj: AnyObject, parentKey: string = '', result: AnyObject = {}): AnyObject {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = parentKey ? `${parentKey}-${key}` : key
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          flattenObject(obj[key], newKey, result)
        } else {
          result[newKey] = obj[key]
        }
      }
    }
    return result
  }
  return [
    {
      test: /\.pug$/,
      loader: PugPlugin.loader
    },

    // styles
    {
      test: /\.(sc|sa)ss$/,
      use: [
        'css-loader',
        'postcss-loader',
        'group-css-media-queries-loader',
        'sass-loader',
        {
          loader: '@epegzz/sass-vars-loader',
          options: {
            syntax: 'scss',
            files: [options.paths.cssVars],
            transformFileContent (val: object) {
              return flattenObject(val)
            }
          }
        }
      ]
    },
    {
      test: /\.css/,
      use: [
        'css-loader',
        'postcss-loader',
        'group-css-media-queries-loader'
      ]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'assets/fonts/[name][ext][query]'
      }
    },

    // images
    {
      test: /\.(png|jpe?g|webp)$/i,
      include: options.paths.src, // Обрабатываем только изображения из src
      type: 'asset/resource',
      generator: {
        filename: 'assets/img/[name][ext]'
      }
    },
    {
      test: /\.svg$/i,
      oneOf: [
        {
          resourceQuery: /inline/, // Используем inline для ?inline
          type: 'asset/inline'
        },
        {
          type: 'asset/resource',
          generator: {
            filename: 'assets/img/[name][ext]'
          }
        }
      ]
    },

    // ico
    {
      test: /\.ico$/,
      type: 'asset/resource',
      generator: {
        filename: '[name][ext]'
      }
    },

    // js | ts
    ...(options.isProd
      ? [{
          test: /\.(?:[jt]s|mjs|cjs)$/,
          exclude: /node_modules/,
          include: options.paths.src,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript'
              ]
            }
          }
        }]
      : [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            include: options.paths.src,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true // Для ускорения разработки
                }
              }
            ],
            resolve: {
              extensions: ['.ts', '.js']
            }
          }
        ])

  ]
}
