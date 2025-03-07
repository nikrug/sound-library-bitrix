import { EEvent } from '@shared/lib/enums/EEvent'

export class PopupBlockController {
  private readonly button: HTMLButtonElement | null
  private readonly buttonTwo: HTMLButtonElement | null
  private readonly popup: HTMLElement | null
  private readonly popupTwo: HTMLElement | null

  constructor (private container: HTMLSelectElement) {
    this.button = this.container.querySelector('.j-example-popup-button')
    this.buttonTwo = this.container.querySelector('.j-example-popup-two-button')
    this.popup = this.container.querySelector('.j-example-popup')
    this.popupTwo = this.container.querySelector('.j-example-popup-two')
    this.initButton()
  }

  initButton () {
    if (this.button) this.button.addEventListener(EEvent.CLICK, this.openPopup)
    if (this.buttonTwo) this.buttonTwo.addEventListener(EEvent.CLICK, this.openTwoPopup)
  }

  openPopup = () => {
    this.popup?.dispatchEvent(new Event(EEvent.OPEN))
  }

  openTwoPopup = () => {
    this.popupTwo?.dispatchEvent(new Event(EEvent.OPEN))
  }
}
