<template lang='pug'>
	.track-part
		.group-title 商机中心
		van-grid
			van-grid-item(v-for="item in _types" :key="item.type" icon="photo-o" :text="item.name")
</template>

<script>
	import { TRACK_TYPE } from 'config/types.config'
	export default {
		name: 'track-part',
		created() {
			this._types = TRACK_TYPE
		}
	}
</script>
<style lang="scss" scoped>
	.track-part {
		padding-top: 40px;
		background: #FFFFFF;
		.group-title {
			padding: 10px 20px;
		}
	}
</style>
