import fs from 'fs'
import path from 'path'
import ttf2woff from 'ttf2woff'
import ttf2woff2 from 'ttf2woff2'
import fontkit from 'fontkit'

type TOptions = {
    exclude: string[];
    inputDirectory: string;
    styleFontFile: string;
};

function updateFontImports (styleFontFile: string, fontImports: string): void {
  try {
    // Добавляем новые импорты
    const updatedContent = `${fontImports}`

    // Перезаписываем файл с обновленным содержимым
    fs.writeFileSync(styleFontFile, updatedContent, 'utf-8')
    console.log(`Файл ${styleFontFile} успешно обновлен`)
  } catch (error) {
    console.error(`Ошибка при обновлении файла ${styleFontFile}: ${(error as Error).message}`)
  }
}

async function convertFont (inputPath: string): Promise<void> {
  const sourceDir = path.dirname(inputPath)
  const outputPathWithoutExtension = path.join(sourceDir, path.basename(inputPath, path.extname(inputPath)))

  // Convert to WOFF
  const woffBuffer = ttf2woff(fs.readFileSync(inputPath))
  fs.writeFileSync(outputPathWithoutExtension + '.woff', woffBuffer)

  // Convert to WOFF2
  const woff2Buffer = ttf2woff2(fs.readFileSync(inputPath))
  fs.writeFileSync(outputPathWithoutExtension + '.woff2', woff2Buffer)

  console.log(`Font ${inputPath} successfully converted to WOFF and WOFF2 formats`)
}

const getAllFiles = (dir: string): string[] => {
  const files: string[] = []
  const dirents = fs.readdirSync(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    const fullPath = path.join(dir, dirent.name)
    if (dirent.isDirectory()) {
      files.push(...getAllFiles(fullPath))
    } else {
      files.push(fullPath)
    }
  }

  return files
}

export async function fontGeneration (options: TOptions): Promise<void> {
  const getFileInfo = (filePath: string) => {
    const fontBuffer = fs.readFileSync(filePath)
    const font = fontkit.create(fontBuffer)

    const pathInfo = path.parse(filePath)
    const fileNameWithoutExtension = pathInfo.name

    const regex = /^(.*)-(?=[^-]+$)/
    const match = fileNameWithoutExtension.match(regex)
    const textBeforeLastDash = match ? match[1] : ''

    const isItalic = /italic$/i.test(match ? fileNameWithoutExtension.replace(`${textBeforeLastDash}-`, '') : '')

    const fileExtension = pathInfo.ext.replace(/^\./, '')

    return {
      // @ts-ignore
      fontName: font.familyName,
      fileName: fileNameWithoutExtension,
      fileExtension,
      path: filePath.replace(options.inputDirectory, '').replace(/\\/g, '/'),
      // @ts-ignore
      width: font['OS/2'].usWeightClass,
      isItalic
    }
  }

    type TFonts = Record<string, {
        name: string,
        width: number,
        isItalic: boolean
        fonts: Record<string, ReturnType<typeof getFileInfo>>
    }>;

    const fonts: TFonts = {}

    const convertPromises = getAllFiles(options.inputDirectory)
      .filter((fontFile) => /.ttf$/.test(fontFile))
      .map((fontFile) => convertFont(fontFile))
    await Promise.all(convertPromises)

    getAllFiles(options.inputDirectory).forEach((fontFile) => {
      const fileInfo = getFileInfo(fontFile)
      const fontsArr = { ...(fonts[fileInfo.fileName]?.fonts || {}), [fileInfo.fileExtension]: fileInfo }
      fonts[fileInfo.fileName] = {
        name: fileInfo.fontName,
        width: fileInfo.width,
        isItalic: fileInfo.isItalic,
        fonts: {
          ...fontsArr
        }
      }
    })

    const fontImports = Object.entries(fonts).reduce((acc, [_, value]) => {
      const src:string[] = []
      if (value.fonts.woff2) src.push(`url('@fonts${value.fonts.woff2.path}') format('woff2')`)
      if (value.fonts.woff) src.push(`url('@fonts${value.fonts.woff.path}') format('woff')`)
      if (value.fonts.ttf) src.push(`url('@fonts${value.fonts.ttf.path}') format('truetype')`)
      acc += `
@font-face {
   font-weight: ${value.width};
   font-family: ${value.name.split(' ').length > 1 ? `'${value.name}'` : value.name};
   font-style: ${value.isItalic ? 'italic' : 'normal'};
   src: ${src.join(', ')};
}
        `

      return acc
    }, '')

    updateFontImports(options.styleFontFile, fontImports)
}
