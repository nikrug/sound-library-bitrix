/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-standard-scss",
    "stylelint-config-rational-order",
  ],
  plugins: [
    './config/stylelint/colorOnlyVariables.js',
    // './config/stylelint/noUseUnit.js',
    "stylelint-order",
    "stylelint-scss"
  ],
  ignoreFiles: [
    'public/**'
  ],
  rules: {
    // "custom/no-px-rem": true,
    "custom/color-only-variables": true,
    'declaration-block-no-duplicate-custom-properties': true,
    // 'color-no-hex': [true, {
    //   message: (hex) => `Don't use hex colors like "${hex}"`,
    // }],
    "block-no-empty": true,
    "color-named": "never",
    "selector-class-pattern": "^[_a-zA-Z0-9-]+$",
    "declaration-no-important": true,
    "order/properties-order": [],
    "declaration-empty-line-before": null,
    "plugin/rational-order": [true, {
      "border-in-box-model": false,
      "empty-line-between-groups": true,
    }],
    'scss/no-global-function-names': true,
  }
}
