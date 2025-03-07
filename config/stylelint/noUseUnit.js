// eslint-disable-next-line @typescript-eslint/no-var-requires
const stylelint = require('stylelint')

const ruleName = 'custom/no-px-rem'

const messages = stylelint.utils.ruleMessages(ruleName, {
  unexpected: 'Unexpected usage of px or rem. Use other units or exclude exceptions.'
})

module.exports = stylelint.createPlugin(ruleName, (isEnabled) => (root, result) => {
  if (!isEnabled) {
    return
  }

  root.walkDecls((decl) => {
    const { value, prop } = decl
    const isBorderException = /^(border|outline)/.test(prop)
    const isLetterSpacingException = /^letter-spacing$/.test(prop)

    // Проверяем, что это не исключение и значение содержит px или rem
    if (/\b(\d*\.?\d+)(px|rem)\b/g.test(value)) {
      // Преобразуем значения с использованием rem
      const newValue = value.replace(/(\d*\.?\d+)(px|rem)\b/g, (match, num, unit) => {
        num = parseFloat(/^\./.test(num) ? '0' + num : num) // Преобразуем в число

        if (isLetterSpacingException) {
          return unit === 'px' ? `${num / 10}rem` : `${String(num).replace(/^0/, '')}rem`
        }

        if (unit === 'px' && num > 3) {
          return `rem(${num})` // Преобразуем px в rem для значений больше 3
        }
        if (unit === 'rem' && (num <= 0.3 || num === 0.3)) {
          return isBorderException ? `${num * 10}px` : `rem(${num * 10})` // Преобразуем rem в px для значений меньше или равных 0.3
        }
        if (unit === 'rem') {
          return `rem(${num * 10})` // Преобразуем rem в rem умножив на 10
        }
        return match
      })

      // Если значение изменилось, обновляем decl
      if (newValue !== value) {
        decl.value = newValue

        // Репортим ошибку
        stylelint.utils.report({
          message: messages.unexpected,
          node: decl,
          result,
          ruleName
        })
      }
    }
  })
})

module.exports.ruleName = ruleName
module.exports.messages = messages
