<template>
	<view class="success">
		<view class="content">
			<view class="title-image">
				<view style="position: absolute;color:#fff;top:9vh;right:10vw;width: 46vw;text-align: center;">
						<text>{{title}}</text>
				</view>
				<image src="https://www.softcasing.com/images/view/ic_basic_title.png"></image>
			</view>
			<view class="score-view">
			   <view class="score-test">
				   <view class="score-image">
						<image src="https://www.softcasing.com/images/view/ic_success.png"></image>
				   </view>
				    <text style="font-size: 1.5rem;color: #5BB6FF;font-weight: 600;display: block;margin-bottom: 6vh;">提交成功</text>
					<view class="physical-script">
						<text style="display: inline-block;text-indent: 2rem; margin: 0 2vw;font-size: 12;">非常感谢您对我们此次问卷调查工作支持！在此，祝您身体健康，生活愉快。</text>
					</view>
				</view>
				<button class="close-btn" @click="backPage">返回首页</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				scoreNum: 69,
				physical_sub: '平和质',
				title: '饮食问卷',
				titleList: [
						{key: '1',value: '3~6岁儿童中医体质调查表'},
						{key: '2',value: '6~14岁儿童中医体质调查表'},
						{key: '3',value: '健康指数调查表'},
					],
				btn_return: true
			}
		},
		methods: {
			getScore: function(data){
				// 获取分数以及体质名称
				// uni.request({
				//     url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
				//     data: {
				//         text: data
				//     },
				// 	method: 'POST',
				//     header: {
				//         'content-type': 'application/json' //自定义请求头信息
				//     },
				//     success: (res) => {
				//         console.log(res.data);
				//         this.text = 'request success';
				//     }
				// });
			},
			backPage: function(){
				uni.redirectTo({
					url: '../select/selectAge'
				})
		
			}
		},
		onLoad(option) {
			console.log(option)
			// this.title = data.title;
			this.titleList.forEach( v => {
				if(v.key === option.value){
					this.title = v.value;
				}
			})
			switch(option.value) {
				case '1': this.getScore(option.value);break;
				case '2': this.getScore(option.value);break;
				case '3': this.getScore(option.value);break;
				default : break;
			}
		}
	}
</script>

<style lang="scss">
	.success {
		width: 100vw;
		height: 100vh;
		background: #FA8E74;
		.content{
			height: 100vh;
			position: relative;
			width: 100vw;
			.title-image{
				image{
					width: 100%;
					height: 30vh;
				}
			}
			.score-view {
				margin: 0 4vw;
				height: 64vh;
				padding-bottom: 4vh;
				background: #FFFFFF;
				border-radius: 20rpx;
				position: absolute;
				top: 24vh;
				box-shadow: 13rpx 18rpx 15rpx #C67462;
				.score-test {
					margin-top: 2vh;
					// color: #000;
					padding: 2vh 5vw;
					height: 80%;
					position: relative;
					font-size: 40rpx;
					width: 82vw;
					text-align: center;
					.score-image {
						// position: absolute;
						margin-top: 4vh;
						margin-bottom: 2vh;
						image {
							height: 30vw;
							width: 30vw;
						}
					}
					.physical-script {
						position: absolute;
						// margin: 0 auto;
						left: 4vw;
						right: 4vw;
						bottom: 0vh;
						text-align: left;
						// width: 100%;
						border-radius: 15px;
						background: #F5F5F5;
						color: #9F9F9F;
						padding: 2vh 1vw;
						// padding: 4vh 3vw;
					}
				}
				.close-btn{
					background: #FFEF6B;
					border-radius: 45rpx;
					width: 60vw;
					bottom: -23px;
					position: absolute;
					// top: 60vh;
					margin-left: 16vw;
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
