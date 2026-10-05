import eslint_js from '@eslint/js';
import globals from 'globals';

export default [
    {
        files: ['assets/js/asterisk/**/*.js'],

        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'script',
            globals: globals.browser,
        },

        rules: {
            ...eslint_js.configs.recommended.rules,

            'curly': ['error', 'all'],
            'no-var': 'error',
            'prefer-const': 'error',
        },
    },
];
