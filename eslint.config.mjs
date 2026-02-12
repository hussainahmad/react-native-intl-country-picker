import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['dist/**', 'node_modules/**'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module'
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
    },
    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      // React Native pan responders legitimately work with refs during "render"
      // (PanResponder.create is called inside the component), so we relax
      // this rule to avoid false positives.
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react-hooks/refs': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];

