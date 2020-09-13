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
	import utils from '../../util/area.js'
	export default {
		data(){
			return {
				qusestionlist: [],
				no_qustion_alert: true,
				flag: ''
				
			}
		},
		methods:{
			nativeScore: function(value){
				uni.setStorageSync('report_Id', value)
				uni.navigateTo({
					url:'../score/physicalScore?value='+ this.flag
				})
			}
		},
		onLoad(option){
			console.log(option)
			this.flag = option.flag;
			let that = this;
			let openid = uni.getStorageSync('openid')
			console.log(utils.env)
			uni.request({
			    url: utils.env + '/Home/Report/getReport', //仅为示例，并非真实接口地址。
			    data: {
			       openid:  openid,
				   flag: option.flag
			    },
				method: 'POST',
			    header: {
			        'custom-header': 'application/json' //自定义请求头信息
			    },
			    success: function (res) {
					console.log(res.data)
					if(res.data.status === '1000'){
						res.data.data.forEach(v => {
						    that.qusestionlist.push({label: v.name, hidden: 'flex', value: v.report_id})
						})
					}else{
						that.no_qustion_alert = false;
						uni.showToast({
						    title: res.data.msg,
						    duration: 2000,
							icon: 'none'
						});
					}
				},
				fail: function(e) {
					console.log(e)
					uni.showToast({
					    title: '请求失败，请检查网络',
					    duration: 2000,
						icon: 'none'
					});
				}
			});
		},
	}
</script>

<style lang="scss">
	.owner-question{
		height: 100vh;
		width: 100vw;
		background: #F6F6F6;
		position: relative;
		overflow: auto;
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
