import uniqid from 'uniqid'

/**
 * класс предоставляет удобный интерфейс для блокировки и разблокировки
 * прокрутки на уровне `<body>`. Класс генерирует уникальное значение класса при создании
 * экземпляра для предотвращения конфликтов с существующими стилями.
 * @example
 * const bodyOverflow = new BodyOverflow();
 * bodyOverflow.lock();
 * // Прокрутка заблокирована.
 * bodyOverflow.unlock();
 * // Прокрутка теперь разблокирована.
 */
export class BodyOverflow {
  private readonly classValue: string

  constructor () {
    this.classValue = `b-${uniqid()}-lock`
  }

  lock (): void {
    document.documentElement.classList.add(this.classValue)
  }

  unlock (): void {
    document.documentElement.classList.remove(this.classValue)
  }
}
