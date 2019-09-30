<template lang="pug">
	#app
		router-view
</template>

<script>
	export default {
		name: 'app',
		components: {},
		data() {
			return {
				active: ''
			}
		},
		mounted() {
			// this.$api.general.queryEnums()
			// 	.then(data => {
			// 		this.$store.commit('enums', data)
			// 	})
		}
	}
</script>

<style lang="scss" scoped>
	body {
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}
	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}

</style>
