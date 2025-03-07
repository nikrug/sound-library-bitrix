import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { optimize } from 'svgo'

type TOptions = {
    exclude: string[];
    inputDirectory: string;
    /** удаляет исходный файл изображения */
    clear?: boolean;
    /** расшрения фалов в которых будут изменены расширения картинок */
    extensions?: string[]
};

export async function imageMinimizer (options: TOptions): Promise<void> {
  const includedWebpImages: string[] = []

  /**
     Функция для рекурсивного получения всех файлов в каталоге
     */
  const getAllFiles = (dir: string): string[] => {
    const files: string[] = []
    const dirents = fs.readdirSync(dir, { withFileTypes: true })

    for (const dirent of dirents) {
      if (!options.exclude.includes(dirent.name)) {
        const fullPath = path.join(dir, dirent.name)
        if (dirent.isDirectory()) {
          files.push(...getAllFiles(fullPath))
        } else {
          files.push(fullPath)
        }
      }
    }

    return files
  }

  /**
   * Функция для обработки изображений
   */

  const processImage = async (inputPath: string): Promise<void> => {
    const extname = path.extname(inputPath).toLowerCase()

    try {
      if (['.jpg', '.jpeg', '.png', '.svg'].includes(extname)) {
        const outputPath = extname === '.svg' ? inputPath : `${inputPath.slice(0, -extname.length)}.webp`
        if (extname === '.svg') {
          const svgContent = fs.readFileSync(inputPath, 'utf-8')
          const optimizedSvg = optimize(svgContent, { path: inputPath }).data
          fs.writeFileSync(inputPath, optimizedSvg, 'utf-8')
        } else {
          await sharp(inputPath).webp({ quality: 75 }).toFile(outputPath)
          includedWebpImages.push(path.basename(inputPath))
          if (options.clear) fs.unlinkSync(inputPath)
        }

        console.log(`Файл ${inputPath} успешно обработан${extname !== '.svg' ? ' и удален' : ''}`)
      }
    } catch (error: unknown) {
      console.error(`Ошибка при обработке ${inputPath}: ${(error as Error).message}`)
    }
  }

  /**
   * Функция для обработки файлов с заменой ссылок на изображения
   */

  const processFiles = (filePaths: string[], imageRegex: RegExp): void => {
    filePaths.forEach((filePath) => {
      const extname = path.extname(filePath).toLowerCase()

      if ((options.extensions || []).includes(extname)) {
        try {
          let content = fs.readFileSync(filePath, 'utf-8')

          if (content.search(imageRegex) >= 0) {
            // Заменяем ссылки на изображения в файле
            content = content.replace(imageRegex, (match) => {
              const { name, ext } = path.parse(match)
              return includedWebpImages.includes(name + ext)
                ? match.replace(/\.(jpg|jpeg|png)$/, '.webp')
                : match
            })

            // Перезаписываем файл с обновленным содержимым
            fs.writeFileSync(filePath, content, 'utf-8')
            console.log(`Файл ${filePath} успешно обработан`)
          }
        } catch (error: unknown) {
          console.error(`Ошибка при обработке ${filePath}: ${(error as Error).message}`)
        }
      }
    })
  }

  const allFiles = getAllFiles(options.inputDirectory)

  /**
   * Регулярное выражение для поиска ссылок на изображения в файлах ts, scss и pug
    */
  const imageRegex = /\/.+\.(jpg|jpeg|png)/g

  /**
   * Получаем список всех изображений
   */
  const imagePaths = allFiles.filter(
    (filePath) => ['.jpg', '.jpeg', '.png', '.svg'].includes(path.extname(filePath).toLowerCase())
  )

  /**
   * Обрабатываем изображения
   */
  for (const imagePath of imagePaths) {
    await processImage(imagePath)
  }

  console.log('Все изображения успешно обработаны')

  /**
   * Обрабатываем файлы с заменой ссылок на изображения
   */
  processFiles(allFiles, imageRegex)
}
