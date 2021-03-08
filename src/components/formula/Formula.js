import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    })
  }

  toHTML() {
    return `
    <div class="info">fx</div>
    <div
    class="input"
    contenteditable
    spellcheck="false"
    data-formula="formula"
    ></div>
    `
  }

  init() {
    super.init()

    this.$formula = this.$root.find('[data-formula="formula"]')

    this.$on('table:select', $cell => {
      this.$formula.text($cell.text())
    })

    this.$on('table:input', $cell => {
      this.$formula.text($cell.text())
    })
  }


  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    const {key} = event

    if (keys.includes(key)) {
      event.preventDefault()

      this.$emit('formula:done')
    }
  }
}
