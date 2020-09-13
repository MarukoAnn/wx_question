<template>
	<view class="owner-question">
		<view class="owner-content">
			<view class="owner-qustion-item" v-for="item in qusestionlist" :key="item" :style="{display: item.hidden}" @click="nativeScore(item.value)">
				<text style="margin-left: 3vw;" >{{item.label}}</text>
				<van-icon name="arrow" class="icon" style="margin-right: 3vw;"/>
			</view>
		</view>
		<view class="no-question-alert" :hidden="no_qustion_alert">
			<text>您暂时没有填写任何问卷</text>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				qusestionlist: [
					{label: '3~6岁体质调查表', hidden: 'flex', value: '1'},
					{label: '6~14岁体质调查表', hidden: 'flex', value: '2'},
					// {label: '健康指数调查表', hidden: 'flex', value: '3'},
				],
				no_qustion_alert: true
			}
		},
		methods:{
			nativeScore: function(value){
				uni.navigateTo({
					url: './owerChildQuestion?flag=' + value 
				})
			}
		},
	}
</script>

<style lang="scss">
	.owner-question{
		height: 100vh;
		width: 100vw;
		background: #F6F6F6;
		position: relative;
		.owner-content {
				position: absolute;
			.owner-qustion-item {
				display: flex;
				justify-content: space-between;
				width: 100vw;
				height: 8vh;
				background: #fff;
				line-height: 8vh;
				margin-top: 3vh;
				color: #777777;
			}
		}
		.no-question-alert{
			width: 100%;
			position: absolute;
			top: 45vh;
			text-align: center;
			// left: 30vw;
			font-size: 30rpx;
			color: #A2A2A2;
		}
	
	}
</style>
