module.exports = {
  root: true,

  parser: 'babel-eslint',

  extends: ['standard', 'standard-react', 'prettier', 'prettier/react'],
  plugins: ['babel', 'react', 'prettier'],

  settings: {
    react: {
      version: 'detect'
    }
  },

  env: {
    browser: true,
    es6: true
  },

  rules: {
    semi: [2, 'never'],
    'no-console': 'error',
    'prettier/prettier': ['error', {
      singleQuote: true,
      trailingComma: 'none',
      semi: false,
      bracketSpacing: true,
      jsxBracketSameLine: true,
      printWidth: 80,
      tabWidth: 2,
      useTabs: false
    }]
  }
};

