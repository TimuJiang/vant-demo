<template lang="pug">
	.m-audio-play
		.play-container
			.btn
				span(@click="startPlayOrPause")
					m-icon(:icon-class="playIcon")
				span(@click="stop")
					m-icon(icon-class="icon-stop")
			.time
				div {{ audio.currentTime | formatSecond}}/{{ audio.maxTime | formatSecond}}
			.progress(:style="{width: `${audio.percent}%`}" :class="{'finished': audio.percent === 100}")
		audio(ref="audio" preload @timeupdate="onTimeupdate" @pause="onPause" @play="onPlay" :src="audioSrc" @loadedmetadata="onLoadedmetadata")
</template>

<script>
	import Vue from 'vue';
	import { Progress } from 'vant';
	Vue.use(Progress);
	// 将整数转换成 时：分：秒的格式
	function realFormatSecond(second) {
		let secondType = typeof second

		if (secondType === 'number' || secondType === 'string') {
			second = parseInt(second)

			let hours = Math.floor(second / 3600)
			second = second - hours * 3600
			let minute = Math.floor(second / 60)
			second = second - minute * 60

			return ('0' + minute).slice(-2) + ':' + ('0' + second).slice(-2)
		} else {
			return '00:00'
		}
	}
    export default {
        name: 'm-audio-play',
		data() {
			return {
				audioSrc: `${require('../../../assets/test.mp3')}`,
				audio: {
					// 该字段是音频是否处于播放状态的属性
					playing: false,
					// 音频当前播放时长
					currentTime: 0,
					// 音频最大播放时长
					maxTime: 0,
					percent: 0
				}
			}
		},
		computed: {
        	playIcon() {
        		// return 'icon-pause'
        		return this.audio.playing ? 'icon-pause' : 'icon-play'
			}
		},
		methods: {
			// 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
			onTimeupdate(res) {
				this.audio.currentTime = res.target.currentTime
				let percent = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
				this.audio.percent = percent > 100 ? 100 : percent
			},
			onLoadedmetadata(res) {
				this.audio.maxTime = parseInt(res.target.duration)
			},
			// 控制音频的播放与暂停
			startPlayOrPause () {
				// console.log('111')
				return this.audio.playing ? this.pause() : this.play()
			},
			// 播放音频
			play () {
				this.$refs.audio.play()
			},
			// 暂停音频
			pause () {
				this.$refs.audio.pause()
			},
			// 当音频播放
			onPlay () {
				this.audio.playing = true
			},
			// 当音频暂停
			onPause () {
				this.audio.playing = false
			},
			stop() {
				this.$refs.audio.pause()
				this.$refs.audio.currentTime = 0
				this.audio.playing = false
			}
		},
		filters: {
			// 将整数转化成时分秒
			formatSecond(second = 0) {
				return realFormatSecond(second)
			}
		}
    }
</script>

<style lang="scss" scoped>

	.play-container {
		width: 245px;
		height: 32px;
		background: #FFF;
		box-shadow: 0 2px 6px 0 rgba(97,119,191,0.40);
		border-radius: 4px;
		margin-bottom: 10px;
		position: relative;
		display: flex;
		.progress {
			background-color: #5D98F2;
			height: 2px;
			position: absolute;
			bottom: 0;
			left: 0;
			border-bottom-left-radius: 4px;
			&.finished {
				border-bottom-right-radius: 4px;
			}
			// animation: width 0.5s linear;
		}
		.btn, .time {
			height: 100%;
		}
		.btn {
			width: 38%;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			svg {
				font-size: 22px;
			}
			> span {
				display: flex;
				height: 100%;
				align-items: center;
			}
		}
		.time {
			flex: 1;
			padding: 6px 10px 6px 0;
			box-sizing: border-box;
			position: relative;
			div {
				height: 100%;
				border-left: 1px solid rgba(0,0,0,0.25);
				zoom: 0.5;
				text-align: right;
				font-size: 12px;
				color: #666;
				font-family: PingFangSC-Regular;
			}
		}
	}
</style>
