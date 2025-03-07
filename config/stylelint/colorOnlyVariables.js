// eslint-disable-next-line @typescript-eslint/no-var-requires
const stylelint = require('stylelint')

const ruleName = 'custom/color-only-variables'

const messages = stylelint.utils.ruleMessages(ruleName, {
  unexpected: 'Unexpected color usage. Use SCSS variables instead.'
})

module.exports = stylelint.createPlugin(ruleName, (isEnabled) => (root, result) => {
  if (!isEnabled) {
    return
  }

  root.walkDecls((decl) => {
    const { value, prop } = decl
    const isVariables = /^\$.+/.test(prop)
    const isColor = /(#|rgb\(|rgba\(|hsl\()/i.test(value)

    // Добавляем проверку на выражения SCSS
    const isSCSSVariable = /\$[\w-]+/.test(value)
    const isSCSSCalculation = /\#{.*}/.test(value)

    // Если значение является SCSS переменной или SCSS выражением, игнорируем его
    if ((isColor && !isVariables) && !isSCSSVariable && !isSCSSCalculation) {
      stylelint.utils.report({
        message: messages.unexpected,
        node: decl,
        result,
        ruleName
      })
    }
  })
})
