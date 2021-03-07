<template>
	<view class="score-content">
		<view class="content">
			<view class="title-image">
				<view style="position: absolute;color:#fff;top:9vh;right:10vw;width: 46vw;text-align: center;">
						<text>{{title}}</text>
				</view>
				<image src="https://www.softcasing.com/images/view/ic_basic_title.png"></image>
			</view>
			<view class="score-view">
			   <view class="score-test">
				   <text style="color: #AFAFAF">您孩子的体质属于</text>
				   <view class="score-btn" >
				   	  <view class="main-btn" v-for="item in physique_typeList" :key="item">
					    <view >{{item.name}}</view>
						<view style="font-size: 16px" v-if="item.value">{{item.value === null? '': item.value}}分</view>
					  </view>
				   </view>
				  <view style="color: #A8A8A8;" v-if="physique_type_enable.length !== 0" >倾向</view>
				  <view style="color: #A8A8A8;" ></view>
				  <view class="score-btn">
					<view class="main-btn" v-for="item in physique_type_enable" :key="item">
					    <view >{{item.name}}</view>
						<view style="font-size: 16px" v-if="item.value">{{item.value === null? '': item.value}}分</view>
					</view>
				   </view>
				<!--   <view class="score-takecare-btn" v-if="!btn_return">
				   		<button class="takecare-btn-return">xx体质</button>
				   </view> -->
					<view class="physical-script" v-if="btn_return">
						<text style="color: red;font-size: 14px;margin-top: 3vh;margin-left: 8vw;">鉴于您孩子的体质结果，请继续填写</text>
					</view>
				</view>
				<button class="close-btn" @click="backPage">{{btnText}}</button>
				<view style="height: 4vh;width: 100%;"></view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import utils from '../../util/area.js'
	export default {
		data(){
			return{
				scoreNum: 69,
				physical_sub: '平和质',
				title: '',
				titleList: [
						{key: '1',value: '3~6岁儿童中医体质调查表'},
						{key: '2',value: '6~14岁儿童中医体质调查表'},
					],
				btnText: '返回',
				btn_return: false,
				indexFlag: null,
				physique_type: [],
				physique_typeList: [],
				physique_type_enable: []
				
			}
		},
		methods: {
			getScore: function(data){
				// 获取分数以及体质名称
				if(data.physique_type.length > 0) {
					this.physique_type = data.physique_type;
			        if(!this.physique_type.some(val => {
			        	return val[0][1] ===undefined && val[0][1] ===null
			        })){
			        	if(this.physique_type.length === 3){
			        		this.setListFormat();
			        	}else{
			        		if(this.physique_type[0][1] >= this.physique_type[1][1]){
			        			this.physique_typeList.push(this.physique_type[0])
			        			this.physique_typeList.push(this.physique_type[1])
			        		}else{
			        			this.physique_typeList.push(this.physique_type[1])
			        			this.physique_typeList.push(this.physique_type[0])
			        		}
			        	}
			        }
					
				}
			},
		   getedScore: function(){
				let that = this;
				let userInfo = JSON.parse(uni.getStorageSync('user_info'))
				let report_id = uni.getStorageSync('report_Id')
				uni.request({
				    url: utils.env + '/Home/Report/getReportResult',
				    data: {
				       openid:  userInfo.openid,
					   report_id: report_id
				    },
					method: 'POST',
				    header: {
				        'custom-header': 'application/json' //自定义请求头信息
				    },
				    success: function (res) {
						if(res.data.status === '1000'){
							if(res.data.data.physique_type.length !== 0){
								that.setPhysiqueTypeList(res.data.data.physique_type)
							}
							if(res.data.data.is_diet === '1'){
								if(res.data.data.is_do === '0'){
									that.btnText = '饮食问卷';
									that.btn_return = true;
								}
							}else {
								that.btnText = '返回';
								that.btn_return = false;
							}
						
						}else{
							uni.showToast({
							    title: res.data.msg,
							    duration: 2000,
								icon: 'none'
							});
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
			},
			backPage: function(){
				if(this.btnText === '饮食问卷') {
					uni.redirectTo({
						url: '../question/food/foodScropt'
					})
				}else{
					uni.redirectTo({
						url: '../select/selectAge'
					})
				}
			},
			setPhysiqueTypeList: function (data){
				data.forEach((v, index) => {
					if(v.name == '倾向'){
						this.indexFlag = index;
					}
				})
				if(this.indexFlag){
					this.physique_typeList = data.slice(0, this.indexFlag);
					this.physique_type_enable = data.slice(this.indexFlag + 1, data.length);
				}else{
					this.physique_typeList = data;
				}
				
			}
		},
		onLoad(option) {
			if(option.value === '5'){
				this.setPhysiqueTypeList(JSON.parse(uni.getStorageSync('results')));
				if(uni.getStorageSync('isdisease') !== '0'){
					this.btnText = '饮食问卷';
					this.btn_return = true;
				}else {
					if(JSON.parse(uni.getStorageSync('isdisStatus')).includes('是')
					|| JSON.parse(uni.getStorageSync('isShowFood')).some(v => {return v !== '从不'})){
						this.btnText = '饮食问卷';
						this.btn_return = true;
					}else{
						this.btnText = '返回';
						this.btn_return = false;
					}
				}
			}else {
				this.titleList.forEach( v => {
					if(v.key === option.value){
						this.title = v.value;
					}
				})
				this.getedScore();
			}
			
		}
	}
</script>

<style lang="scss">
	.score-content {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #7399F7;
		.content{
			height: 100vh;
			position: relative;
			width: 100vw;
			overflow: scroll;
			.title-image{
				image{
					width: 100%;
					height: 30vh;
				}
			}
			.score-view {
				margin: 0 4vw;
				// height: 64vh;
				background: #FFFFFF;
				border-radius: 20rpx;
				position: relative;
				top: -8vh;
				box-shadow: 13rpx 18rpx 15rpx #6E87C4;
				// text-align: center;
				.score-test {
					margin-top: 2vh;
					color: #000;
					padding: 3vh 5vw;
					// height: 80%;
					// text-align: left;
					position: relative;
					font-size: 40rpx;
					width: 82vw;
					.score-btn {
						// width: 90%;
						text-align: center;
						// display: flex;
						// justify-content: space-between;
						padding: 4vh 0;
						.main-btn {
							width: 35vw;
							background: #5CB7FF;
							border-radius: 25px;
							display: inline-block;
							color: #fff; 
							box-shadow: 5px 8px 8px #D0EAFF; 
							text-align: center;
							padding: 1vh 0;
							// height: 8vh;
							// line-height: 8vh;
							margin: 1vh 2vw;
						}
					}
					.score-takecare-btn {
						// padding: 6vh 2vw;
						// background: #007AFF;
						text-align: center;
						padding: 4vh 0;
						.takecare-btn {
							width: 35vw;
							background: #EDEDED;
							border-radius: 25px;
							display: inline-block;
							height: 6vh;
							line-height: 6vh;
							color: #8F8F8F; 
							box-shadow: 2px 8px 3px #B2B2B2; 
							text-align: center;
							outline: none;
							// height: 8vh;
							// line-height: 8vh;
							margin: 1vh 3vw;
						}
						.physical-script {
							width: 100%;
							border-radius: 15px;
							background: #EAF6FF;
							text-align: center;
							color: #5EB8FF;
							padding: 8vh 0vw;
						}
					}
					
				}
			
				.close-btn{
					background: #FFEF6B;
					border-radius: 45rpx;
					width: 60vw;
					position: absolute;
					bottom: -27px;
					// top: 60vh;
					margin-left: 16vw;
					letter-spacing: 0.2em;
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
