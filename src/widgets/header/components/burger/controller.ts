import { EClasses } from '@shared/lib/enums/EClasses'

class BurgerController {
  private _isOpen = false
  constructor (private container: HTMLElement, private onChange?: (isOpen: boolean) => void) {
    this.init()
  }

  private init (): void {
    this.container.addEventListener('click', this.handleToggleBurger)
    this._isOpen = this.container.classList.contains(EClasses.ACTIVE)
  }

  private handleToggleBurger = () => {
    const isOpen = this.container.classList.contains(EClasses.ACTIVE)
    if (isOpen) {
      this.close()
    } else {
      this.open()
    }
    this._isOpen = !isOpen
    this.onChange?.(!isOpen)
  }

  private close = () => {
    this.container.classList.remove(EClasses.ACTIVE)
  }

  private open = () => {
    this.container.classList.add(EClasses.ACTIVE)
  }

  get isOpen () {
    return this._isOpen
  }
}

export {
  BurgerController
}
