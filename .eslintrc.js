// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  globals: {
     'chrome': true
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'eol-last': 0,
    'no-console': 0,
    'no-nested-ternary': 0,
    'no-unused-vars': ['error', { argsIgnorePattern: "^_" }],
    'max-len': ['error', { code: 180 }],
    'no-param-reassign': ['error', { props: false }]
  }
}
