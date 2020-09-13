<template>
	<view class="content">
		<view class="title-image">
			<view style="position: absolute;color:#fff;top:9vh;right:10vw;width: 46vw;text-align: center;">
					<text>{{title}}</text>
			</view>
			<image src="https://www.softcasing.com/images/view/ic_basic_title.png" mode=""></image>
		</view>
		<view class="content-view">
		   <view class="subcript-test">
				<text style="display: block;">尊敬的家长</text>
				<text style="text-indent: 2em;display: inline-block;line-height: 6vh;">您好！我们将要展开一项关于儿童体质类型的调查, 以总结儿童中医体质类型特点,为将来医生指导家长育儿、防病治病提供帮助。现成邀请您及您的孩子参加该项研究。此项调查所得结果仅作为统计分析和构建依据使用,并予以绝对保密，不会对您产生任何不利的影响，请您放心填写。</text>
			</view>
			<button class="close-btn" @click="nextPage">下一步</text><van-icon name="arrow" class="icon" /></button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				title: ''
			}
		},
		onLoad(){
			if(uni.getStorageSync('age') === '3'){
				this.title = '3~6岁儿童中医体质调查表'
			}else {
				this.title = '6~14岁儿童中医体质调查表'
			}
		},
		methods: {
			nextPage: function(){
				uni.navigateTo({
					url:'./sub_protocol'
				})
				// uni.navigateTo({
				// 	url:'../question/sexAge/qusetionOne'
				// })
			}
		}
	}
</script>

<style lang="scss">
	.content{
		height: 100vh;
		position: relative;
		width: 100vw;
		background: #7399F7;
		.title-image{
			image{
				width: 100%;
				height: 30vh;
			}
		}
		.content-view {
			margin: 0 4vw;
			height: 64vh;
			background: #FFFFFF;
			border-radius: 20rpx;
			position: absolute;
			top: 24vh;
			box-shadow: 13rpx 18rpx 15rpx #6E87C4;
			text-align: center;
	// 		.image {
	// 			padding-top: 8vh;
	// 		}
			.subcript-test {
				margin-top: 2vh;
				color: #000;
				padding: 2vh 3vw;
				text-align: left;
				// font-family: '微软雅黑';
				font-size: 40rpx;
				// font-weight: 600;
			}
			.close-btn{
				background: #FFEF6B;
				border-radius: 45rpx;
				width: 60vw;
				position: absolute;
				top: 60vh;
				margin-left: 18vw;
				box-shadow: 0rpx 15rpx 0rpx #BDB258;
				.icon {
				   font-size: 26px;
				  vertical-align:middle;
				}
			}
		}
	}
</style>
