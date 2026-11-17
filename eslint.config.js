import js from '@eslint/js';
import {defineConfig, globalIgnores} from 'eslint/config';
import prettierConfig from 'eslint-config-prettier/flat';
import n from 'eslint-plugin-n';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['build/', 'coverage/']),

  js.configs.recommended,
  n.configs['flat/recommended'],

  {
    rules: {
      'block-scoped-var': 'error',
      eqeqeq: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-restricted-properties': [
        'error',
        {object: 'describe', property: 'only'},
        {object: 'it', property: 'only'},
      ],
    },
  },

  {
    files: ['**/*.ts'],
    extends: [tseslint.configs.recommended],
    rules: {
      'n/no-missing-import': 'off',
      'n/no-unsupported-features/es-syntax': 'off',
      // Mixin uses Function in the public API; tightening it could break consumers.
      '@typescript-eslint/no-unsafe-function-type': 'off',
    },
  },

  {
    files: ['test/**/*.mjs'],
    languageOptions: {globals: globals.mocha},
  },

  // Must be last: turns off rules that conflict with Prettier.
  prettierConfig,
]);
