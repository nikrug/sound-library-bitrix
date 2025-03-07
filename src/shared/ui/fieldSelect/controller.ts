import { EClasses } from '../../lib/enums/EClasses'
import { EEvent } from '../../lib/enums/EEvent'

export class CustomSelectController {
  private displayValue: HTMLInputElement | null
  private optionsList: HTMLInputElement | null
  private options: NodeListOf<HTMLInputElement>
  private defaultOption: HTMLInputElement | null

  constructor (container: HTMLElement) {
    this.displayValue = container.querySelector('.j-display-value')
    this.optionsList = container.querySelector('.j-option-list')
    this.options = container.querySelectorAll('.j-option-list > fieldText')
    this.defaultOption = container.querySelector('.j-option-list > fieldText.j-default-value')

    this.initOptions()
    this.initOpenOptions()
  }

  initOptions = () => {
    this.options.forEach(option => {
      if (option.checked) this.changeDisplayValue(option.dataset.label)
      option.addEventListener(EEvent.CLICK, this.handleChangeOption)
    })
  }

  initOpenOptions = () => {
    // this.displayValue.
  }

  handleChangeOption = (e: Event) => {
    const target = e.target as HTMLInputElement
    this.changeDisplayValue(target.dataset.label)
    if (this.displayValue) this.displayValue.checked = false
    if (target.classList.contains('j-default-value')) {
      this.options.forEach(option => {
        option.checked = false
      })
      this.defaultOption?.classList.add(EClasses.ACTIVE)
    } else {
      this.defaultOption?.classList.remove(EClasses.ACTIVE)
    }
  }

  changeDisplayValue = (value: string | undefined) => {
    if (this.displayValue && value) this.displayValue.dataset.label = value
  }
}
