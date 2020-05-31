const AVAILABLE_LANGS = ['en', 'hi', 'it', 'sr']

module.exports = {
	input: ['src/**/*.{ts}', 'src/**/*.{tsx}'],
	output: './',
	options: {
		debug: true,
		func: {
			list: ['t'],
			extensions: ['.js', '.jsx', '.ts', '.tsx']
		},
		lngs: AVAILABLE_LANGS,
		ns: ['translation'],
		defaultLng: 'hi',
		defaultNs: 'translation',
		defaultValue: '__STRING_NOT_TRANSLATED__',
		resource: {
			loadPath: 'public/locales/{{lng}}/{{ns}}.json',
			savePath: 'public/locales/{{lng}}/{{ns}}.json',
			jsonIndent: 4,
			lineEnding: '\n'
		},
		nsSeparator: false, // namespace separator
		keySeparator: false, // key separator
		interpolation: {
			prefix: '{{',
			suffix: '}}'
		},
		removeUnusedKeys: false
	}
}
