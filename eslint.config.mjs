import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		rules: {
			'no-trailing-spaces': 'error',
			'no-unused-vars': [
				'error',
				{
					vars: 'all',
					args: 'after-used',
					ignoreRestSiblings: true,
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'eol-last': ['error', 'always'],
			'object-curly-spacing': ['error', 'never'],
			'no-multi-spaces': 'error',
			semi: ['error', 'never'],
			'no-console': ['warn', { allow: ['warn', 'error'] }],
		},
	},
]

export default eslintConfig
