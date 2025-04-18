import { defineConfig, globalIgnores } from 'eslint/config';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default defineConfig([
    globalIgnores(['**/dist', '**/.eslintrc.cjs']),
    {
        extends: fixupConfigRules(
            compat.extends(
                'next/core-web-vitals',
                'next/typescript',
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:react-hooks/recommended',
            ),
        ),
        plugins: {
            'react-refresh': reactRefresh,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parser: tsParser,
        },
        rules: {
            'react-refresh/only-export-components': 'off',
            'react-hooks/exhaustive-deps': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'no-console': 'warn',
        },
    },
]);
