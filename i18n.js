module.exports = {
	locales: ['fa'],
	defaultLocale: 'fa',
	pages: {
		'*': ['common', 'components'],
		'/': ['home'],
	},
	loadLocaleFrom: (lang, ns) => import(`./src/locales/${lang}/${ns}.json`).then((m) => m.default),
};
