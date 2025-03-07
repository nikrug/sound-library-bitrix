import { EEvent } from '@shared/lib/enums/EEvent'
import { initBlockClass } from '@shared/lib/helpers/initBlockClass'

class FormPageController {
  private readonly form: HTMLFormElement | null
  private readonly fieldset: HTMLFieldSetElement | null
  private formAutocomplete: HTMLFormElement | null
  private inputAutocomplete: HTMLInputElement | null
  timeout: ReturnType<typeof setTimeout>| undefined
  delay = 500

  constructor (container: HTMLElement) {
    this.form = container.querySelector('form')
    this.fieldset = container.querySelector('fieldset')
    this.formAutocomplete = container.querySelector('form.j-autocomplete')
    this.inputAutocomplete = container.querySelector('.j-autocomplete-fieldText')
    this.initForm()
    this.initAutocomplete()
  }

  initAutocomplete () {
    if (this.inputAutocomplete) this.inputAutocomplete.addEventListener('input', this.submitDelay)
  }

  submitDelay = () => {
    if (this.timeout) clearTimeout(this.timeout)
    if (this.formAutocomplete) {
      this.timeout = setTimeout(() => {
        this.formAutocomplete!.dispatchEvent(new Event(EEvent.SUBMIT))
      }, this.delay)
    }
  }

  initForm () {
    if (!this.form) return
    this.form.addEventListener(EEvent.LOADING, this.onLoading)
    this.form.addEventListener(EEvent.SUCCESS, this.onSuccess)
    this.form.addEventListener(EEvent.ERROR, this.onError)
  }

  onLoading = (e: CustomEvent | Event) => {
    if (e instanceof CustomEvent) {
      if (e.detail) {
        if (this.fieldset) this.fieldset.disabled = true
      } else {
        if (this.fieldset) this.fieldset.disabled = false
      }
    }
  }

  onSuccess = () => {
    alert('success')
  }

  onError = (e: CustomEvent | Event) => {
    if (e instanceof CustomEvent && e.detail) {
      alert(e.detail)
    } else {
      alert('error')
    }
  }
}

initBlockClass('.j-form-page', FormPageController)
