interface Constructor<T, R> {
    new (element: T): R;
}
export function initBlockClass <T, R> (selectors: string, Cls: Constructor<T, R>) {
  document.querySelectorAll(selectors)
    .forEach((block) => {
      new Cls(block as T)
    })
}
