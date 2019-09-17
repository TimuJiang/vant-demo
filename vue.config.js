module.exports = {
    configureWebpack: {
		resolve: {
			alias: {
				'assets': '@/assets',
				'img': '@/assets/images',
				'components': '@/components',
				'views': '@/views',
				'config': '@/config'
			}
		}
	},

    runtimeCompiler: true,
    productionSourceMap: false
}
