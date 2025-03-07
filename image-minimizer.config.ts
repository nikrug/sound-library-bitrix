import path from 'path'
import { imageMinimizer } from './config/imageMinimizer'

function main () {
  const inputDirectory = path.join(__dirname, 'src')
  const exclude: string[] = []
  void imageMinimizer({
    exclude,
    inputDirectory,
    clear: true,
    extensions: ['.ts', '.scss', '.pug']
  })
}

main()
