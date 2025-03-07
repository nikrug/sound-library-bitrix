import { EEvent } from '@shared/lib/enums/EEvent'
import { EClasses } from '@shared/lib/enums/EClasses'
import { initBlockClass } from '@shared/lib/helpers/initBlockClass'
import { BodyOverflow } from '@shared/lib/helpers/bodyOverflow'
import { BurgerController } from '@widgets/header/components/burger/controller'

class HeaderController {
  private lastScrollTop = 0
  private ticking = false
  private threshold = 2 // Порог для определения направления прокрутки
  private readonly burgerNode: HTMLElement | null
  private readonly dropMenuNode: HTMLElement | null
  private bodyOverflow: BodyOverflow

  constructor (private container: HTMLElement) {
    this.burgerNode = container.querySelector('.j-burger')
    this.dropMenuNode = container.querySelector('.j-drop-menu')
    this.bodyOverflow = new BodyOverflow()
    this.init()
    this.initBurger()
  }

  private init () {
    window.addEventListener('scroll', this.onScroll, { passive: true })
    this.container.addEventListener(EEvent.OPEN, this.openContainer)
  }

  private initBurger = () => {
    if (this.burgerNode) {
      const burgerController = new BurgerController(this.burgerNode, this.onBurgerClick)
      if (burgerController.isOpen) {
        this.openMenu()
      } else {
        this.closeMenu()
      }
    }
  }

  private onBurgerClick = (isOpen: boolean) => {
    if (isOpen) {
      this.openMenu()
    } else {
      this.closeMenu()
    }
  }

  private openMenu = () => {
    if (!this.dropMenuNode) return
    this.bodyOverflow.lock()
    this.dropMenuNode.classList.add(EClasses.ACTIVE)
  }

  private closeMenu = () => {
    if (!this.dropMenuNode) return
    this.bodyOverflow.unlock()
    this.dropMenuNode.classList.remove(EClasses.ACTIVE)
  }

  private onScroll = () => {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.handleScroll()
        this.ticking = false
      })
      this.ticking = true
    }
  }

  private handleScroll () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const containerHeight = this.container.offsetHeight
    if (scrollTop <= containerHeight) {
      this.openContainer()
      return
    }
    if (Math.abs(scrollTop - this.lastScrollTop) > this.threshold) {
      if (scrollTop > this.lastScrollTop) {
        // Скролл вниз
        this.handleScrollDown()
      } else {
        // Скролл вверх
        this.openContainer()
      }
    }

    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop // Для мобильных устройств или при прокрутке вверх
  }

  openContainer = () => {
    this.container.classList.remove(EClasses.HIDDEN)
  }

  handleScrollDown = () => {
    this.container.classList.add(EClasses.HIDDEN)
  }
}

initBlockClass('.j-header', HeaderController)
