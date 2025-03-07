export class DynamicStyleVariables {
  constructor () {
    this.init()
  }

  init = () => {
    this.calcVh()
    this.calcHeader()
    window.addEventListener('resize', this.onResize)
  }

  onResize = () => {
    this.calcVh()
  }

  calcVh = () => {
    const height = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${height}px`)
  }

  calcHeader = () => {
    const header = document.querySelector('.j-header-size')
    if (!header) return
    const height = header.scrollHeight
    document.documentElement.style.setProperty('--header-height', `${height}px`)
  }
}
