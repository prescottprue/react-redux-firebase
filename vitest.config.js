import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

// Tests import bare paths rooted at ./src (previously handled by
// babel-plugin-module-resolver). 'constants' and 'utils' intentionally
// shadow Node builtins, so exact aliases are required.
const srcAliases = {
  actions: resolve(import.meta.dirname, 'src/actions'),
  constants: resolve(import.meta.dirname, 'src/constants.js'),
  helpers: resolve(import.meta.dirname, 'src/helpers.js'),
  firestoreConnect: resolve(import.meta.dirname, 'src/firestoreConnect.js'),
  utils: resolve(import.meta.dirname, 'src/utils')
}

export default defineConfig({
  resolve: {
    alias: srcAliases
  },
  // JSX lives in .js files throughout src/ and test/
  oxc: {
    include: /(src|test)\/.*\.js$/,
    exclude: [],
    lang: 'jsx'
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['test/unit/**/*.spec.js'],
    setupFiles: ['./test/setup.js'],
    globalSetup: ['./test/globalSetup.js'],
    // tests share one firebase app instance connected to the emulator suite
    // (seeded in globalSetup), so everything must run in a single process
    pool: 'forks',
    maxWorkers: 1,
    isolate: false,
    fileParallelism: false,
    testTimeout: 10000,
    coverage: {
      include: ['src/**'],
      reporter: ['lcov', 'html']
    }
  }
})
