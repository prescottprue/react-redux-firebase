module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['standard', 'standard-react', 'prettier', 'prettier/react'],
  plugins: ['babel', 'react', 'prettier', 'react-hooks'],
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
  },
  overrides: [
    {
      files: ['./src/**/**.js'],
      plugins: ['jsdoc'],
      extends: ['plugin:jsdoc/recommended'],
      rules: {
        'jsdoc/newline-after-description': 0,
        'jsdoc/no-undefined-types': [1, { definedTypes: ['React', 'firebase'] }]
      }
    }
  ]
}
