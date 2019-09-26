<template lang="pug">
	m-page(:head-title="title").customer-search
		.container
			.search
				van-search(
					v-model="searchValue"
					placeholder="输入手机号/客户姓名"
					shape="round"
					left-icon=""
					right-icon="search"
				)
			.cell-container(v-if="type === 'all'")
				van-cell(
					v-for="(item,index) in customerTypes"
					:title="`${customerTypesMap[item.type]}（${item.number}）`"
					:key="index"
					:is-link="true"
					icon="like-o"
					@click="() => { jump(item.type) }"
				)
			div(:class="listClass")
				index-bar-list(@click-cell="clickCell" :list="list")

</template>

<script>
	import Vue from 'vue';
	import { Search } from 'vant';

	Vue.use(Search);
    export default {
        name: 'customer-search',
		props: ['id', 'type'],
		beforeRouteUpdate (to, from, next) {
			// 在当前路由改变，但是该组件被复用时调用
			// 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
			// 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
			// 可以访问组件实例 `this`
			this.searchValue = '';
			this.searchList(to.params.type);
			next();
		},
		mounted() {
			this.searchList();
		},
		data() {
        	return {
        		searchValue: '',
				customerTypesMap: {
        			'bo': '商机客户',
					'order': '订单客户',
					'freehold': '保有客户',
					'currentYearFail': '本年战败客户',
					'failPending': '战败待审客户'
				},
				customerTypes: [
					{
						number: 821,
						type: 'bo'
					},
					{
						number: 351,
						type: 'order'
					},
					{
						number: 49,
						type: 'freehold'
					},
					{
						number: 49,
						type: 'currentYearFail'
					},
					{
						number: 5,
						type: 'failPending'
					}
				],
				list: {}
			}
		},
		computed: {
        	title() {
        		switch (this.type) {
					case 'all':
						return '客户查询'
					case 'currentYearFail':
						return '战败客户'
					default:
						return this.customerTypesMap[this.type]
				}
			},
			listClass() {
        		return {
        			'list': true,
					'closer-to-top': this.type !== 'all'
				}
			}
		},
		methods: {
        	jump(type) {
        		if (type === 'bo') {
        			this.$dialog.alert({
						message: '跳转到商机客户'
					})
				} else {
        			this.$router.push(`/customer-search/${this.id}/type/${type}`)
				}
			},
			searchList(type) {
        		const searchParam = {
        			id: this.id,
					type: type || this.type,
					search: this.searchValue
				};
				this.fakeData(this.customerTypesMap[type] || '默认客户');


        		console.log('param', searchParam);
			},
			fakeData(name) {
        		this.list = {
        			A: [],
					B: [],
					C: []
				};
				for (let i = 0; i < 15; i++) {
					this.list.A.push({
						title: `${name}A`,
						label: '意向车型：博瑞1.8T',
						id: i
					})
					this.list.B.push({
						title: `${name}B`,
						label: '意向车型：缤越',
						id: i + 10
					})
					this.list.C.push({
						title: `${name}C`,
						label: '意向车型：领克',
						id: i + 100
					})
				}
			},
			clickCell(param) {
        		this.$dialog.alert({
					message: `当前点击客户的ID是${param}`
				})
			}
		}
    }
</script>

<style lang="scss" scoped>
	$company-blue: #1B40D6;
	$common-grey: #efeff4;
	.container {
		position: absolute;
		top: 46px;
		bottom: 0;
		width: 100%;
		background-color: $common-grey;
		.search {
			height: 40px;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.list {
			position: absolute;
			top: 260px;
			bottom: 0;
			width: 100%;
			overflow: scroll;
			&.closer-to-top {
				top: 40px;
			}
		}
	}
</style>

<style>
	.customer-search .van-search {
		padding: 0!important;
		width: 70%;
	}

	.customer-search .van-search .van-cell {
		padding: 3px 8px 3px 0!important;
	}

	.customer-search .van-search .van-search__content {
		padding-left: 20px;
	}
	.customer-search .van-search .van-search__content .van-field__control {
		font-size: 12px;
	}
</style>
