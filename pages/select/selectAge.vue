<template>
	<view class="select-content">
		<image src="https://www.softcasing.com/images/view/ic_select_bgc.png" mode=""></image>
		<!-- 年龄选项 -->
		<view class="select-body">
			<view class="select-age">
				<view class="select-item" :style="{background: item.bgc, border: '1px solid' + item.b_color}" @click="selectAge(item)" v-for="item in selectItemData" :key="item">
					<text>{{item.text}}</text>
				</view>
			</view>
			<!-- 叶子-->
			<view class="select-leaf">
				<image src="https://www.softcasing.com/images/view/ic_select_leaf.png" mode=""></image>
			</view>
			<!-- 按钮 -->
			<view class="select-btn">
				<button class="owner-btn"  :hidden="isAuthorize" @click="ownerQuestionnaire">我的问卷</button>
				<button class="owner-btn" open-type="getUserInfo" withCredentials="true" lang="zh_CN" :hidden="!isAuthorize" @click="wxGetUserInfo">登录</button>
				<button class="sure-btn" :disabled="select_age === ''" :style="{background: sureBtn.bgc, boxShadow: '0rpx 15rpx 0rpx' + sureBtn.box_color}" @click="sureSelect">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
	import utils from '../../util/area.js'
	export default {
		data() {
			return {
				selectItemData: [{
					bgc:'#749BFB',
					b_color: '#fff',
					text: '3~6岁体质调查表',
					age: '3'
				},
				{
					bgc: '#749BFB',
					b_color: '#fff',
					text: '6~14岁体质调查表',
					age: '6'
				},
			],
				sureBtn: {
					bgc: '#E9E9E9',
				    box_color: '#B7B7B7'
				},
				select_age: '',
				user_info: {
					openid: '',
					nikename:'',
					sex: '',
					tel: '',
				},
				city: '',
				isAuthorize: true,
			}
		},
		methods: {
			selectAge: function(item) {
				this.selectItemData.forEach( v => {
					v.bgc = '#749BFB';
					v.b_color = '#fff';
				})
				item.bgc = '#5C80D8';
				item.b_color = '#5C80D8';
				this.select_age = item.age;
				this.sureBtn.box_color = '#BDB258';
				this.sureBtn.bgc = '#FFEF6B'
			},
			ownerQuestionnaire: function(){
				uni.navigateTo({
					url:'../ownerQuestion/owerQuestion'
				})
			},
			sureSelect: function(){
				// 清除require的缓存
				if(this.isAuthorize){
					uni.showToast({
						title: '您还没进行登录，请您先登录再继续下一步操作。',
						duration: 2000,
						icon: 'none'
					});
				}
				delete require.cache[require.resolve('../../util/question.json')]
				delete require.cache[require.resolve('../../util/question_two.json')]
				delete require.cache[require.resolve('../../util/que_ashma.json')]
				uni.setStorageSync('age', this.select_age)
				setTimeout(function() {
					uni.navigateTo({
						url:'../subscript/sub_protocol'
					})
				}, 990);
			},
			// 获取基本信息
			wxGetUserInfo: function() {
				this.user_info.openid = uni.getStorageSync('openid');
				let that = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						that.user_info.nikename = infoRes.userInfo.nickName; //昵称
						that.user_info.sex = infoRes.userInfo.gender
						uni.setStorageSync('user_info', JSON.stringify(that.user_info))
						uni.setStorageSync('isCanUse', false);//记录是否第一次授权  false:表示不是第一次授权
						uni.showLoading({
							title: '加载中'
						});
						that.city = uni.getStorageSync('city');
						that.getOpenArea(that.user_info.openid)
					},
					fail(res) {
						uni.showToast({
							title: '网络错误或者拒接授权。',
							duration: 2000,
							icon: 'none'
						});
					}
				});
			},
			// 判断是否已经登录
			islogin: function(){
				let that = this;
				 uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes);
						let code = loginRes.code;
						that.getOpenid();
					}
				 });
				
			  },
			  // 获取 openid
			  getOpenid: function() {
			    let that = this;
				wx.cloud.callFunction({
				  name: 'getopenid',
				  complete: res => {
					  uni.setStorageSync('openid', res.result.openid)
					  // that.user_info.openid = res.result.openid;
				  }
				})
				// this.user_info.openid = uni.getStorageSync('openid')
			},
			// 判断该地区是否开放
			getOpenArea: function(openid) {
				var that = this;
				uni.request({
				    url: utils.env + '/Home/Report/authReport',
				    data: {
				       openid: openid,
					   city_name: uni.getStorageSync('city')
				    },
					method: 'POST',
				    header: {
				        'custom-header': 'application/json' //自定义请求头信息
				    },
				    success: function (res) {
						uni.hideLoading();
						if(res.data.status === '1000'){
							that.isAuthorize = false;
							uni.showToast({
							    title: '登录成功,该地区以开放问卷调查。可以进行问卷填写',
							    duration: 2000,
								icon: 'none'
							});
							uni.removeStorageSync('area');	
						}else {
							uni.showToast({
							    title: res.data.msg,
							    duration: 2000,
								icon: 'none'
							});
							uni.redirectTo({
								url: '../index/no_questionnaire'
							});
							uni.setStorageSync('area', '未开放');	
							
						}
					},
					fail: function(e) {
						uni.showToast({
						    title: '请求失败，请检查网络',
						    duration: 2000,
							icon: 'none'
						});
					}
				});
			}
		},
		onLoad() {
			if	(uni.getStorageSync('isCanUse') === '') { 
				this.isAuthorize = true;
			}else {
				this.isAuthorize = false;
			}
			wx.cloud.init({
				env: 'prod-3pc76',
				traceUser: true,
			})
			this.islogin();
		}
	}
</script>

<style lang=scss>
	.select-content{
		height: 100vh;
		position: relative;
		image {
			width: 100vw;
			height: 100%;
			z-index: -1;
		}
		.select-body {
			position: absolute;
			z-index: 9999;
			top: 30vh;
			.select-age {
				/* margin: 3vh 3vw; */
/* 				z-index: 9999; */
				.select-item {
					margin: 6vh 5vw;
					text-align: center;
					/* border: 1px solid #fff; */
					width: 90vw;
					/* margin: auto 0; */
					line-height: 8vh;
					border-radius: 25px;
					color: #fff;
					/* font-weight: 600; */
					font-size: 1.3rem;
					height: 8vh;
					/* background: ; */
				}
			}
			.select-leaf {
				margin-left: 78vw;
				image{
					width: 22vw;
					height: 6vh;
		
				}
			}
			.select-btn{
				width: 100vw;
				margin-top: 8vh;
				display: flex;
				justify-content: space-between;
				.owner-btn {
					background: #FFEF6B;
					border-radius: 45rpx;
					box-shadow: 0rpx 15rpx 0rpx #BDB258;
					width: 40vw;
					margin: 0 auto;
				}
				.sure-btn {
					/* background: #E9E9E9; */
					border-radius: 45rpx;
					/* box-shadow: 0rpx 15rpx 0rpx #B7B7B7; */
					width: 40vw;
					margin: 0 auto;
				}
			}
		}
	
}
</style>
