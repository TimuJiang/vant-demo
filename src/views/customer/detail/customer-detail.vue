<template lang='pug'>
	.customer-detail
		.customer-detail__warp
			.base--card
				.base--card__title
					span {{c.pCustomerName || '-' }}
					span.level {{c.pCustomerLevel ? dicMap[c.pCustomerLevel].dictValue.split('（')[0] : '-'}}
					m-icon(:icon-class="levelClass")
				.base--card__sub
					.mobile {{c.phoneNo || '-'}}
					.create-time 创建：{{c.createTime || '-'}}  |  来源：{{sourceB}}
		van-cell-group
			van-cell(title="意向车系" :value="c.purposeModelName || '-'")
			van-cell(title="意向车型" :value="c.purposeSeriesName || '-'")
			van-cell(title="车辆颜色" value="红色")
			van-cell(title="网络定金" value="是")
			van-cell(title="网络定单" value="是")
		van-cell-group.sub
			van-cell(title="客户来源" :value="source")
			van-cell(title="是否试驾" value="是")
			van-cell(title="是否按揭" value="是")
			van-cell(title="所在地区" value="什么事业部/大区/城市")
			van-cell(title="详细地址" value="什么事业部/大区/城市")
		.button__warp
			van-button(color="#1B40D6" type="primary" size="large" @click="onclick") 编辑
</template>

<script>
	import Vue from 'vue'
	import {Cell, Field, SwitchCell, Area, Popup} from 'vant'

	Vue.use(Cell)
		.use(Field)
		.use(SwitchCell)
		.use(Area)
		.use(Popup)
	export default {
		name: 'customer-detail',
		props: {
			customer: Object
		},
		components: {
			MAreaSelect: () => import('components/m-area-select/m-area-select.vue')
		},
		computed: {
			c() {
				return this.customer
			},
			levelClass() {
				switch (this.dicMap[this.c.gender].dictValue) {
					case '男':
						return 'icon-male1'
					case '女':
						return 'icon-female1'
					default:
						return 'icon-unknownsex'
				}
			},
			dicMap() {
				return this.$store.state.dicMap
			},
			source() {
				return this.c.pCustomerFrom ? this.dicMap[this.c.pCustomerFrom].dictValue : '-'
			},
			sourceB() {
				return this.c.pCustomerFromB ? this.dicMap[this.c.pCustomerFromB].dictValue : '-'
			},
			sourceAll() {
				return `${this.c.pCustomerFromB ? `${this.dicMap[this.c.pCustomerFromB].dictValue} ` : ''}${this.c.pCustomerFrom ? this.dicMap[this.c.pCustomerFrom].dictValue : '暂无信息'}`
			}
		},
		data() {
			return {
				name: '路人甲',
				checked: false,
				address: '',
				show: false
			}
		},

		methods: {
			showArea() {
				this.show = true
			},
			onclick () {
				this.$router.push(`/customer/${this.$route.params.id}/edit`)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.customer-detail {
		background: #f0f0f0;
		.button__warp {
			position: fixed;
			bottom: 0;
			width: 100%;
		}
		&__warp {
			padding: 15px;
			background: #FFFFFF;
			.base--card {
				color: #FFFFFF;
				background-image: linear-gradient(135deg, #1B40D6 0%, #2273EF 100%);
				border-radius: 6px;
				box-shadow: 0 3px 4px 0 rgba(0, 110, 255, 0.2);
				&__title {
					padding: 0 15px;
					font-size: 18px;
					display: flex;
					align-items: center;
					height: 45px;
					border-bottom: 1px solid rgba(255, 255, 255, 0.15);
					.level {
						display: inline-block;
						margin: 0 5px 0 10px;
						width: 20px;
						height: 20px;
						text-align: center;
						font-size: 13px;
						border-radius: 50%;
						background-color: #07B836;
						line-height: 20px;
					}
					svg {
						font-size: 20px;
					}
				}
				&__sub {
					padding: 10px 15px;
					font-size: 14px;
					line-height: 22px;
					.create-time {
						max-width: 100%;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
		}
		.sub {
			margin-top: 10px;
		}
	}
</style>

<style>
	.customer-detail .van-cell {
		font-size: 16px;
	}

	.customer-detail .van-cell .van-cell__value {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
