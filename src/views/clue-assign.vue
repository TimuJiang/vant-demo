<template>
    <m-page class="clue-assign">
		<div class="search-container">
			<div>
				<van-field
					placeholder="输入手机号/客户名称"
					left-icon="search"
					v-model="value"
				/>
			</div>
		</div>
		<div class="list-container">
			<van-list
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
			>
				<van-checkbox-group v-model="result">
					<div
						v-for="item in list"
						:key="item"
						class="clue-cell"
					>
						<van-checkbox
							:key="item"
							:name="item"
						/>
						<div class="clue-info">
							<div>
								<span>吴彦祖（H）</span>
								<span style="float: right">1分钟</span>
							</div>
							<div class="clue-car">
								意向车型：博瑞1.8T+6AT(国五)豪华型（博瑞）
							</div>
						</div>
					</div>
				</van-checkbox-group>
			</van-list>
		</div>
		<div class="bottom-container">
			<div class="bottom-operation">
				<van-checkbox v-model="checkAll">全选</van-checkbox>
			</div>
			<div class="assign-button" @click="clickAssign">分配</div>
		</div>
	</m-page>
</template>

<script>
	import Vue from 'vue'
	import { Field, Checkbox, CheckboxGroup, List, Cell, DropdownMenu, DropdownItem, Dialog } from 'vant'
	Vue.use(Field).use(Checkbox).use(CheckboxGroup).use(List).use(Cell).use(DropdownMenu).use(DropdownItem)
    export default {
        name: 'clue-assign',
		data() {
			return {
				value: '',
				value1: 0,
				option1: [
					{ text: '请选择', value: 0 },
					{ text: '销售1', value: 1 },
					{ text: '销售2', value: 2 }
				],
				list: [],
				checkAll: false,
				loading: false,
				finished: false,
				result: []
			}
		},

		computed: {

		},
		methods: {
        	clickAssign() {
				Dialog.alert({
					message: '分配成功'
				})
			},
			onLoad() {
				// 异步更新数据
				setTimeout(() => {
					for (let i = 0; i < 20; i++) {
						this.list.push(this.list.length + 1);
					}
					// 加载状态结束
					this.loading = false;

					// 数据全部加载完成
					if (this.list.length >= 40) {
						this.finished = true;
					}
				}, 500);
			}
		}

    }
</script>

<style lang="scss" scoped>
	.search-container {
		background-color: #efeff4;
		padding: 10px 30px;
		.van-cell {
			border-radius: 5px;
			padding-top: 5px;
			padding-bottom: 5px;
		}
	}

	.list-container {
		position: absolute;
		width: 100%;
		bottom: 120px;
		top: 100px;
		overflow: scroll;
		.clue-cell {
			display: flex;
			align-items: center;
			padding: 10px 20px;
			border-bottom: 1px solid #efeff4;
			position: relative;
		}
		.clue-info {
			font-size: 14px;
			height: 100%;
			flex-grow: 1;
			padding-left: 10px;
			> div {
				line-height: 25px;
			}
		}
	}

	.bottom-container {
		width: 100%;
		border-top: 1px solid #efeff4;
		position: fixed;
		bottom: 0;
		height: 120px;
		.bottom-operation {
			position: absolute;
			top: 0;
			bottom: 50px;
			width: 100%;
			display: flex;
			align-items: center;
			padding: 0 20px
		}
		.assign-button {
			line-height: 50px;
			text-align: center;
			background-color: #3f8ee2;
			color: white;
			font-weight: bold;
			position: absolute;
			width: 100%;
			bottom: 0;
		}
	}
</style>
