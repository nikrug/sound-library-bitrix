import fs from 'fs'
import path from 'path'
import { Configuration } from 'webpack'
import { BuildOptions } from './types'

export function buildEntries (options: BuildOptions): Configuration['entry'] {
  // Читаем содержимое директории страниц
  const pagesDirs = fs.readdirSync(options.paths.pages)

  // Формируем точки входа
  const entry = pagesDirs.reduce<Record<string, string>>((acc, pageDirName) => {
    const pagePath = path.resolve(options.paths.pages, pageDirName)

    // Проверяем, является ли элемент директорией
    if (fs.statSync(pagePath).isDirectory()) {
      const pugFilePath = path.resolve(pagePath, `${pageDirName}.pug`)

      // Проверяем существование `name.pug`
      if (fs.existsSync(pugFilePath)) {
        acc[pageDirName] = pugFilePath
      } else {
        console.warn(`Файл ${pageDirName}.pug не найден в директории ${pagePath}`)
      }
    }

    return acc
  }, {})

  return entry
}
