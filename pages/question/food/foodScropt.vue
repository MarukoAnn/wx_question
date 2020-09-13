<template>
	<view class="food-content"> 
	  <view class="content">
	  	<view class="title-image">
	  		<view style="position: absolute;color:#fff;top:8.4vh;right:10vw;width: 46vw;text-align: center;">
	  				<text style="font-size: 1.2rem;">{{title}}</text>
	  		</view>
	  		<image src="https://www.softcasing.com/images/view/ic_wx_bgc.png" mode=""></image>
	  	</view>
	  	<view class="content-view">
	  	   <view class="subcript-test">
	  			<text style="display: block;"></text>
	  			<!-- <text style="text-indent: 2em;display: inline-block;line-height: 5vh;white-space: 2rem;">通过本研究，期望在将来发布适合各种体质类型的儿童饮食指导建议，从生活饮食方面预防哮喘的发病及减少哮喘儿童发作频次、减轻发作程度。</text> -->
	  		    <view classs="precautions-content"  
	  			style="background: #FEE8E3;color: #E58483;padding: 2vh 3vw;border-radius: 10px;margin-top: 2vh;">
	  				<text style="display: block;font-size: 18px;font-weight: 600;">注意事项：</text>
	  				<text style="display: block;font-size: 16px;line-height: 3.5vh;letter-spacing: 1px;">
						1.过敏体质的孩子，家长填写孩子<text style="font-weight: 600;letter-spacing: 0.2em;">平时</text>饮食情况即可。若孩子曾明确诊断为 <text style="font-weight: 600;letter-spacing: 0.2em;">哮喘，并未在医生指导下调整过</text>饮食结构，请填写孩子平时的饮食情况，若孩子在哮喘发病后<text style="font-weight: 600;letter-spacing: 0.2em;">调整过</text>饮食结构，请填写孩子<text style="font-weight: 600;letter-spacing: 0.2em;">发病前</text>的饮食情况；
					</text>
	  				<text style="display: block;font-size: 16px;line-height: 3.5vh;letter-spacing: 1px;">
						2、请您根据孩子自身情况，结合每类食物<text style="font-weight: 600;letter-spacing: 0.2em;">相应的参考图片</text>，对孩子的食物情况进行<text style="font-weight: 600;letter-spacing: 0.2em;">食用次数</text>的填写及<text style="font-weight: 600;letter-spacing: 0.2em;">食用量的等级</text>评估。请根据您孩子平时饮食的实际情况，填写下列问题。
						</text>
	  			</view>
	  		</view>
	  		<button class="close-btn" @click="nextPage">下一步</text><van-icon name="arrow" class="icon" /></button>
	  	</view>
	  </view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				title: '儿童饮食问卷',
			}
		},
		methods: {
			nextPage: function(){
				uni.navigateTo({
					url:'./food_protocol'
				})
			}
		},
		onLoad() {
		}
	}
</script>

<style lang="scss">
	.food-content {
		width: 100vw;
		height: 100vh;
		background: #FA8E74;

		.content{
			height: 100vh;
			position: relative;
			overflow: auto;
			width: 100vw;
			// margin: 2vh 0;
			.title-image{
				// position: relative;
				image{
					width: 100%;
					height: 30vh;
					// margin: 0;
				}
			}
			.content-view {
				margin: 0 4vw;
				// height: 64vh;
				background: #FFFFFF;
				border-radius: 20rpx;
				position: absolute;
				top: 24vh;
				padding-bottom: 4vh;
				margin-bottom: 6vh;
				box-shadow: 13rpx 18rpx 15rpx #C77F6E;
				text-align: center;
				.subcript-test {
					margin-top: 2vh;
					color: #000;
					padding: 2vh 3vw;
					text-align: left;
					font-size: 40rpx;
					.precautions-content {
						background: #FEE8E3;
						
						// width: 100vw;
					}
				}
				.close-btn{
					background: #FFEF6B;
					border-radius: 45rpx;
					width: 60vw;
					position: absolute;
					// top: 60vh;
					bottom: -23px;
					margin-left: 18vw;
					box-shadow: 0rpx 15rpx 0rpx #BDB258;
					.icon {
					   font-size: 26px;
					  vertical-align:middle;
					}
				}
			}
		}
	}
</style>
