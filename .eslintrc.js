module.exports = {
	root: true,
	env: {
		node: true
	},
	'extends': [
		'plugin:vue/essential',
		'@vue/standard'
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'generator-star-spacing': 'off',
		'no-tabs': 'off',
		'no-mixed-spaces-and-tabs': 0,
		'indent': ['off', 'tab'],
		'no-trailing-spaces': 1,
		'object-curly-spacing': 0,
		'space-before-function-paren': 0 // 这句话表示在函数后可以不加空格
	},
	parserOptions: {
		parser: 'babel-eslint'
	}
}
