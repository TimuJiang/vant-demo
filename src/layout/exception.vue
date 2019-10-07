<template lang="pug">
	m-page(@click-left="$router.push('/')" :has-click-left="true").not-found
		.container
			div
				.imgContainer(:style="styleObj")
				.text {{text}}
</template>

<script>
    export default {
        name: 'not-found',
		data() {
        	return {

			}
		},
		computed: {
        	text() {
        		switch (this.$route.params.statusCode) {
					case '404':
						return '您访问的内容不存在'
					case '500':
						return '出错了'
					default:
						return ''
				}
			},
			styleObj() {
				switch (this.$route.params.statusCode) {
					case '404':
						return {
							backgroundImage: `url(${require('../assets/default_nocontent.png')})`
						}
					default:
						return null
				}
			}
		}
    }
</script>

<style lang="scss" scoped>
		.container {
			position: absolute;
			width: 100%;
			top: 46px;
			bottom: 0;
			background-color: #efeff4;
			display: flex;
			align-items: center;
			justify-content: center;
			.imgContainer {
				width: 125px;
				height: 125px;
				background: no-repeat;
				background-size: 100%;
				margin-bottom: 15px;
			}
			.text {
				font-size: 14px;
				color: #999;
			}
		}
</style>
