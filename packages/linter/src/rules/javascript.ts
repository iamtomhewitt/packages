export default {
	"extends": "eslint:recommended",
	"env": {
		"es2021": true,
		"jest": true,
		"node": true
	},
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"retail-linter",
		"prefer-arrow"
	],
	"rules": {
		"retail-linter/sort-imports": "error"
	}
}