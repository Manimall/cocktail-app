// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import path from 'path';
import { fileURLToPath } from 'url';

const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url))
});

export default [
  {
    ignores: [
      '**/node_modules/**',
      'dist/**',
      '**/*.json',
      '**/*.config.js'
    ]
  },
  js.configs.recommended,
  reactRecommended,
  ...compat.config({
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:jsx-a11y/recommended',
      'prettier'
    ]
  }),
  {
    plugins: {
      '@typescript-eslint': tsEslint,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {
      ...tsEslint.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/react-in-jsx-scope': 'off',
      'import/no-unresolved': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
    settings: {
      react: {
        version: '18.2.0',
      },
      'import/resolver': {
        node: {
          paths: ['node_modules'],
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    }
  }
];
