module.exports = {
  'env': {
    'commonjs': true,
    'es6': true,
    'node': true,
    'jest/globals': true
  },
  'plugins': ['jest'],
  'extends': [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:jest/style'
  ],
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'no-control-regex': [
      'off'
    ],
    'no-unused-vars': [
      'error'
    ],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'always',
      'asyncArrow': 'always'
    }],
    'semi': 'error',
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'no-prototype-builtins': [
      'off'
    ]
  }
};
