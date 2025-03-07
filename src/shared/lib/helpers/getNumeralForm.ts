/**
 * Тип, описывающий формы слова для различных числовых значений.
 *
 * @property {string} one - Форма слова для чисел, оканчивающихся на 1 (например, 1 книга).
 * @property {string} some - Форма слова для чисел, оканчивающихся на 2, 3, или 4 (например, 2 книги).
 * @property {string} many - Форма слова для всех остальных чисел (например, 5 книг).
 */
export type TWordForms = {
  one: string,
  some: string,
  many: string
}

/**
 * Возвращает правильную форму слова в зависимости от переданного числа.
 *
 * @param {number} value - Число, для которого нужно выбрать форму слова.
 * @param {TWordForms} forms - Объект, содержащий формы слова для различных числовых значений.
 *
 * @returns {string} - Правильная форма слова для переданного числа.
 *
 * @example
 * const forms = {
 *   one: "книга",
 *   some: "книги",
 *   many: "книг"
 * };
 * getNumeralForm(1, forms); // "книга"
 * getNumeralForm(2, forms); // "книги"
 * getNumeralForm(5, forms); // "книг"
 */
export const getNumeralForm = (value: number, forms: TWordForms): string => {
  const lastDigit = value % 10
  const lastTwoDigits = value % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return forms.many
  } else if (lastDigit === 1) {
    return forms.one
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return forms.some
  } else {
    return forms.many
  }
}
