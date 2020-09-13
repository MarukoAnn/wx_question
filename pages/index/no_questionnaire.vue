<template>
	<view class="owner-question">
		<view class="no-question-alert">
			<text>该地区没有开放问卷填写</text>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.owner-question{
		height: 100vh;
		width: 100vw;
		background: #F6F6F6;
		position: relative;
		.no-question-alert{
			width: 100%;
			text-align: center;
			position: absolute;
			top: 45vh;
			// left: 30vw;
			color: #A2A2A2;
			font-size: 40rpx;
		}
	
	}
</style>
