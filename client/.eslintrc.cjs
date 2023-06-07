module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-essential",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
    "prettier"
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser"
  },
  plugins: [ "vue", "spellcheck" ],
  rules: {
    "indent": [ "error", 2, {
      "VariableDeclarator": "first",
      "ArrayExpression": "first",
      "ObjectExpression": 1,
      "ImportDeclaration": 1,
      "flatTernaryExpressions": true,
      "SwitchCase": 1

    } ],
    "vue/html-indent": [ "warn", 2, {
      "attribute": 1,
      "baseIndent": 1,
      "closeBracket": 0,
      "alignAttributesVertically": true,
      "ignores": []
    } ],
    "vue/no-dupe-v-else-if": "warn",
    "vue/no-unused-components": "warn",
    "vue/no-unused-vars": "warn",
    "vue/no-reserved-component-names": "warn",
    "vue/no-parsing-error": [ "warn", {
      "abrupt-closing-of-empty-comment": true,
      "absence-of-digits-in-numeric-character-reference": true,
      "cdata-in-html-content": true,
      "character-reference-outside-unicode-range": true,
      "control-character-in-input-stream": true,
      "control-character-reference": true,
      "eof-before-tag-name": true,
      "eof-in-cdata": true,
      "eof-in-comment": true,
      "eof-in-tag": true,
      "incorrectly-closed-comment": true,
      "incorrectly-opened-comment": true,
      "invalid-first-character-of-tag-name": true,
      "missing-attribute-value": true,
      "missing-end-tag-name": true,
      "missing-semicolon-after-character-reference": true,
      "missing-whitespace-between-attributes": true,
      "nested-comment": true,
      "noncharacter-character-reference": true,
      "noncharacter-in-input-stream": true,
      "null-character-reference": true,
      "surrogate-character-reference": true,
      "surrogate-in-input-stream": true,
      "unexpected-character-in-attribute-name": true,
      "unexpected-character-in-unquoted-attribute-value": true,
      "unexpected-equals-sign-before-attribute-name": true,
      "unexpected-null-character": true,
      "unexpected-question-mark-instead-of-tag-name": true,
      "unexpected-solidus-in-tag": true,
      "unknown-named-character-reference": true,
      "end-tag-with-attributes": true,
      "duplicate-attribute": true,
      "end-tag-with-trailing-solidus": true,
      "non-void-html-element-start-tag-with-trailing-solidus": false,
      "x-invalid-end-tag": true,
      "x-invalid-namespace": true
    } ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-useless-empty-export": "error",
    //"@typescript-eslint/no-unsafe-return": "error",
    //"@typescript-eslint/no-duplicate-type-constituents": "error",'
    "@typescript-eslint/no-import-type-side-effects": "error",
    "@typescript-eslint/no-extra-non-null-assertion": "error",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-duplicate-enum-values": "error",
    //"@typescript-eslint/consistent-type-exports": "warn",
    "@typescript-eslint/ban-types": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/space-before-function-paren": [ "error", "always" ],
    // to enforce using type for object type definitions, can be type or interface
    "@typescript-eslint/consistent-type-definitions": [ "warn", "type" ],
    "array-bracket-spacing": [ "error", "always", { arraysInArrays: false } ],
    "space-in-parens": [ "error", "always" ],
    quotes: [ "error", "double" ],
    semi: [ "error", "always" ],
    "comma-spacing": [ "error", { before: false, after: true } ],
    "object-curly-spacing": [ "error", "always" ],
    "template-curly-spacing": [ "error", "always" ],
    "max-len": [ "warn", { code: 120 } ]
  }
};

