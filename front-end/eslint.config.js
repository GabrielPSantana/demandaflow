import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';
import tsParser from '@typescript-eslint/parser';

export default [
    { ignores: ['dist'] },

    {
        settings: { react: { version: '^19.2.0' } },
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
          parser: tsParser,
          ecmaVersion: 5,
          sourceType: 'script',

          parserOptions: {
            project: ['tsconfig.json'],
          },
        },

        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            prettier: eslintConfigPrettier,
        },
        
        rules: {
              ...js.configs.recommended.rules,
              ...tseslint.configs.recommended.rules,
              ...react.configs.recommended.rules,
              ...react.configs['jsx-runtime'].rules,
              ...reactHooks.configs.recommended.rules,

              '@typescript-eslint/no-floating-promises': 'error',

              'react/jsx-no-target-blank': 'off',
              'react-refresh/only-export-components': [
                'warn', 
                { allowConstantExport: true }
              ],

              'simple-import-sort/imports': 'error',
              'simple-import-sort/exports': 'error',
            },
    },
];
