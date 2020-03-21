module.exports = {
  parser: '@typescript-eslint/parser',
  'extends': [
    'airbnb-base',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'react-app',
    'prettier',
    'prettier/react'
  ],
  root: true,
  plugins: ['@typescript-eslint', 'import', 'babel', 'react', 'react-hooks', 'prettier' ],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', '/'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    },
    react: {
      version: '16.0'
    }
  },
  env: {
    browser: true,
    node: true
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    'import/prefer-default-export': 0,
    'no-shadow': 0,
    'consistent-return': 0,
    'no-new': 0,
    'new-cap': 0,
    'no-return-await': 2,
    'import/extensions': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        semi: false,
        bracketSpacing: true,
        jsxBracketSameLine: true,
        printWidth: 80,
        tabWidth: 2,
        useTabs: false
      }
    ]
  }
}
