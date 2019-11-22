module.exports = {
  env: {
    browser: true,
    jasmine: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'jsx' : true,
    'useJSXTextNode': true
  },
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'prettier', 'prettier/@typescript-eslint'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },

  plugins: ['react', '@typescript-eslint', 'prettier', 'react-hooks'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, semi: false, jsxSingleQuote: true, printWidth: 128}],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  }
}
