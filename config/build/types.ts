export enum BuildMode {
  DEV = 'development',
  PROD = 'production'
}
export type BuildPaths = 'src' | 'images' | 'public' | 'dist' | 'pages' | 'widgets' | 'shared' | 'stylelint' | 'app' | 'fonts' | 'cssVars' | 'entities'

export interface BuildOptions {
  port: number
  paths: Record<BuildPaths, string>
  mode: BuildMode
  isProd: boolean
  isDev: boolean
}
