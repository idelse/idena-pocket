
const AVAILABLE_LANGS = [
  'en',
]

module.exports = {
    input: [
        'src/**/*.{ts}',
        'src/**/*.{tsx}',
    ],
    output: './',
    options: {
        debug: true,
        func: {
        list: ['t'],
        extensions: ['.js', '.jsx','.ts','.tsx'],
        },
    lngs: AVAILABLE_LANGS,
    ns: [
            'translation',
        ],
        defaultLng: 'en',
        defaultNs: 'translation',
        defaultValue(_lng, _ns, key) {
        return key
        },
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
        removeUnusedKeys: false,
    },
}

