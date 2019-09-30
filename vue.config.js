module.exports = {
	devServer: {
		proxy: {
			'/bomt-admin': {
				target: 'http://10.190.66.170:8899',
				changeOrigin: true
			},
			'/sso': {
				target: 'http://10.190.66.170:10100',
				changeOrigin: true
			}
		}
	},
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
