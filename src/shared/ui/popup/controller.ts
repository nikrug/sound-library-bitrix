import { BodyOverflow } from '@src/shared/lib/helpers/bodyOverflow'
import { EClasses } from '@shared/lib/enums/EClasses'
import { EEvent } from '@shared/lib/enums/EEvent'

export class PopupController {
  bodyOverflow = new BodyOverflow()
  private readonly closeBtn: HTMLButtonElement | null
  constructor (private container: HTMLElement) {
    this.closeBtn = container.querySelector('.j-popup-close')
    this.init()
  }

  init () {
    this.container.addEventListener(EEvent.CLICK, this.handleContainerClose)
    if (this.closeBtn) this.closeBtn.addEventListener(EEvent.CLICK, this.closePopup)
    this.addListener()
  }

  addListener = () => {
    this.container.addEventListener(EEvent.OPEN, this.openHandler)
  }

  openHandler = () => {
    this.bodyOverflow.lock()
    this.container.removeEventListener(EEvent.OPEN, this.openHandler)
    this.container.remove()
    document.body.appendChild(this.container)
    setTimeout(() => {
      this.container.classList.add(EClasses.OPEN)
    })
  }

  handleContainerClose = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (target === this.container) {
      this.closePopup()
    }
  }

  closePopup = () => {
    this.container.classList.remove(EClasses.OPEN)
    this.bodyOverflow.unlock()
    this.addListener()
  }
}
