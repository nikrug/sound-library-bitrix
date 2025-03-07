import { EEvent } from '@shared/lib/enums/EEvent'
import variables from '@shared/styles/variables'
import { initBlockClass } from '@shared/lib/helpers/initBlockClass'

class ExampleItemController {
  private container: HTMLElement | null
  private readonly button: HTMLElement | null
  private readonly picture: HTMLElement | null
  colorsArray = Object.values(variables.color)
  borderStyleArray = ['solid', 'dashed']

  constructor (private block: HTMLElement) {
    this.container = block
    this.button = this.container.querySelector('.j-example-button')
    this.picture = this.container.querySelector('.j-example-picture')
    this.init()
  }

  getRandomValue (itemsArray: string[]) {
    const randomIndex = Math.floor(Math.random() * itemsArray.length)
    return itemsArray[randomIndex]
  }

  getNewRandomValue (itemsArray: string[], excludedValue: string) {
    const itemsArrayWithoutExcludedValue = itemsArray.filter(i => i !== excludedValue)
    return this.getRandomValue(itemsArrayWithoutExcludedValue)
  }

  init () {
    if (this.button) {
      this.button.addEventListener(EEvent.CLICK, this.buttonClick)
    } else {
      console.error("Example.ts couldn't find necessary button block")
    }
  }

  buttonClick = () => {
    if (this.picture) {
      this.picture.style.borderColor = this.getRandomValue(this.colorsArray)
      this.picture.style.borderStyle = this.getNewRandomValue(this.borderStyleArray, this.picture.style.borderStyle)
    }
  }
}

initBlockClass('.j-example-item', ExampleItemController)
