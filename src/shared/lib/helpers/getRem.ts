/**
 * Преобразует значения из пикселей в единицы rem на основе размера корневого шрифта.
 *
 * @param px - Значение в пикселях в виде числа или строки.
 * @returns Эквивалентное значение в единицах rem.
 * @throws Если входные данные недопустимы или невозможно получить размер корневого шрифта.
 *
 * @example
 * const pixelValue = 16;
 * const remValue = getRem(pixelValue); // '1.6rem'
 */
export const getRem = (px: number | string): string => {
  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
  const pixelValue = typeof px === 'number' ? px : parseFloat(px)

  if (isNaN(pixelValue) || isNaN(rootFontSize)) {
    throw new Error('Недопустимые входные данные или невозможно получить размер корневого шрифта.')
  }

  return `${pixelValue / rootFontSize}rem`
}
