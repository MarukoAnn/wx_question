<template>
	<view class="body">
		<scroll-view class="question-content" scroll-y="true" :scrollTop="scrollTop" :scroll-into-view="showItem" v-if="a">
			<view class="question-title-image">
				<view style="position: absolute;color:#fff;top:8vh;right:10vw;width: 46vw;text-align: center;">
						<text>{{title}}</text>
				</view>
				<image src="https://www.softcasing.com/images/view/ic_basic_title.png"></image>
			</view>
					<view class="question-title">
				<!-- 头部标题 -->
						<view class="progress-bar">
							<view v-if="flag === 0">
								<text>请家长朋友们注意：</text>
								<text style="text-indent: 2em;display: block;font-size: 16px;letter-spacing: 0.4;">由于本次问卷调查内容为孩子的体质类型，需要了解孩子<text style="color: #DD524D;font-weight: 600;">平时</text>的生活状态，因此，如果您的孩子目前患有急性病，如感冒、肺炎等，或孩子患有慢性病，如哮喘、慢性腹泻等，请您填写孩子健康状态或疾病缓解期的状态。</text>
							</view>
							<view class="bar" style="margin-top: 3vh;">
								<text>{{nowNum}}/{{total}}题</text>
								<view class="bar-title">
									<text>0</text>
									<text>{{total}}</text>
								</view>
								<view class="out-bar">
									<view class="inner-bar" :style="{width: num + '%' }"></view>
								</view>
							</view>
						</view>
					<!-- 选择内容 -->
						<view class="questions-select-contion">
							<view class="question-list">
								<view class="question">
									<!-- 标题 -->
									<view class="title">
										<text>{{qestion.title}}</text>
									</view>
									<!-- 没有图片选择的 -->
									<view v-if="qestion.isImage === 'false'">
										<view class="select-item" :style="{background: item.color.itemBgc}" v-for="item in qestion.select" :key="item.item" @click="selectItemData(item)" :id="item.focus">
											<text class="select-rand" :style="{background: item.color.iconBgc}"></text>
											<text :style="{color: item.color.fontColor}" :name="item.item">{{item.item}}</text>
											<!-- <input  :focus="item.focus === 'true'"/> -->
										</view>
									</view>

									<!-- 图片的 -->
									<view v-if="qestion.isImage !== 'false'">
										<view class="item-image" :style="{background: item.color.itemImageBgc}" v-for="item in qestion.select" :key="item.item" :id="item.focus">
												<!-- A、B、C选项 -->
												<view class="select-item" :style="{background: item.color.itemBgc}">
													<text class="select-rand" :style="{background: item.color.i_iconBgc, opacity: item.item? 1: 0}"></text>
													<text :style="{color: item.color.fontColor}">{{item.item}}</text>
													<!-- <input  :focus="item.focus === 'true'"/> -->
												</view>
												<!-- 选项内容 -->
												<view class="select-image">
													<img :src="item.imageurl" alt="" v-if="item.imageurl !== ''">
													<!-- 选项里面的单选 -->
													<view class="select-check">
														<van-row>
															<view class="select-check-item" v-for="checkItem in item.color.questionImageSelect" :key="checkItem.label"  @click="selcetChcek(item, checkItem)" :style="{border: '1px solid' + checkItem.color.t_borBgc, background: checkItem.color.bgc}">
																<!-- 圆圈 -->
																<text class="check-icon" :style="{background: checkItem.color.t_iconBgc}">
																	<text class="check-icon-point" :style="{background: checkItem.color.t_innericonBgc}"></text>
																</text>
																<text class="check-text" :style="{color: checkItem.color.ftcolor}">{{checkItem.label}}</text>
															</view>
														</van-row>
													</view>
											</view>
												<view class="error-tip" :hidden="item.error==='false'">
													<image src="../../../static/image/ic_tiptoop.png" mode=""></image>
													<text>还有这一题没有回答哦</text>
												</view>
										</view>
									</view>
								</view>
								<!-- 上下一题的按钮 -->
							<view class="question-btn">
								<button class="close-btn" @click="backQuestion"><van-icon name="arrow-left" class="icon" /><text>上一题</text></button>
								<button class="close-btn" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @click="nextQuestion"><a :href="showItem"><text>{{nextlabel}}</text><van-icon name="arrow" class="icon" /></a></button>
							</view>
						</view>
						</view>
					</view>
					<!-- 撑底部 -->
					<view style="width: 100vw;height: 2vh;"></view>
			</scroll-view>
		</view>
</template>

<script>
	import utils from '../../../util/area.js'
	export default {
		data() {
			return {
				total: null,
				num: 9.6,
				qestion: '',
				nowNum: 1,
				nextlabel: '下一题',
				flag: 0,
				questionjson: '',
				flagfocus: 0,
				showItem: '',
				passflag: false,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				isdisStatus: [],
				title: '',
				isdisease: 0,
				answer: [],
				max: 0,
				secondMax: 0,
				thirdMax: 0,
				// 实际选择值
				SumActualTotal: {
					ph_value: 0, 
					qx_value: 0,
					yx_value: 0,
					ya_value: 0,
					ts_value: 0,
					sr_value: 0,
					qy_value: 0,
					tb_value: 0,
					yr_value: 0,
					xk_value: 0
				},
				// 总值
				SumTotal: [],
				SumTotalTree: [
					{label: 'ph_value', value: 34, name: '平和质'}, 
					{label: 'qx_value', value: 34, name: '气虚质'},
					{label: 'yx_value', value: 38, name: '阴虚质'},
					{label: 'ya_value', value: 29, name: '阳虚质'},
					{label: 'ts_value', value: 22, name: '痰湿质'},
					{label: 'sr_value', value: 36, name: '湿热质'},
					{label: 'qy_value', value: 23, name: '气郁质'},
					{label: 'tb_value', value: 30, name: '特禀质'},
					{label: 'yr_value', value: 35, name: '阳热质'},
					{label: 'xk_value', value: 1, name: '血亏质'},
				],
				SumTotalSex: [
					{label: 'ph_value', value: 41, name: '平和质'}, 
					{label: 'qx_value', value: 34, name: '气虚质'},
					{label: 'yx_value', value: 39, name: '阴虚质'},
					{label: 'ya_value', value: 29, name: '阳虚质'},
					{label: 'ts_value', value: 31, name: '痰湿质'},
					{label: 'sr_value', value: 43, name: '湿热质'},
					{label: 'qy_value', value: 23, name: '气郁质'},
					{label: 'tb_value', value: 30, name: '特禀质'},
					{label: 'yr_value', value: 50, name: '阳热质'},
					{label: 'xk_value', value: 28, name: '血亏质'},
				],
				// 一定是的体质：
				physique_type: [],
				physique_type_enable: [],
				physique_result_list: [], // 各种体质和得分
				physique_answer_list: [], // 体质题目值
				a: true,
				user_info: {
					openid: '',
					nikename:'',
					sex: '',
					tel: '',
				},
		  }
		},
		created(){
			if(uni.getStorageSync('age') === '3'){
				this.title = '3~6岁儿童中医体质调查表';
				this.questionjson = require('../../../util/question_change.json');
				this.SumTotal = this.SumTotalTree;
			}else {
				this.title = '7~14岁儿童中医体质调查表'
				this.questionjson = require('../../../util/question_two.json');
				this.SumTotal = this.SumTotalSex;
			}
			this.qestion = this.questionjson.question[this.flag];
			this.total =this.questionjson.question.length;
			wx.cloud.init({
				env: 'prod-3pc76',
				traceUser: true,
			})
			this.islogin();
		},
		methods: {
			// 没有图片数据样式设置
			selectItemData: function(item){
				if(item.status !== 1) {
					if(this.qestion.more === 'false'){
						this.qestion.select.forEach(v => {
							v.color.fontColor = '#000';
							v.color.iconBgc = '#000';
							v.color.itemBgc = '#F7F7F7';
							v.status = 0;
						})
					}
					item.status = 1;
					item.color.fontColor = '#fff';
					item.color.iconBgc = '#fff';
					item.color.itemBgc = '#8ECDFF';
				}else {
					item.status = 0;
					item.color.fontColor = '#000';
					item.color.iconBgc = '#000';
					item.color.itemBgc = '#F7F7F7';
				}
		
			},
			scroll: function(e) {
			     this.old.scrollTop = e.detail.scrollTop
			 },
			setScroll: function(e) {
				this.scrollTop = this.old.scrollTop
					this.$nextTick(function() {
						this.scrollTop = 0
					});
			},
			rebuileComponents() {
				  // 销毁子标签
				  this.a = false;
				  // 重新创建子标签
				  this.$nextTick(() => {
					this.a = true;
				  });
				},
			// 下一题
			nextQuestion: function(e){
				this.setNextStyle();
				if(uni.getStorageSync('isCanUse')=== ""){
					this.wxGetUserInfo();
				}
			},
			// 上一题
			backQuestion: function(event){
				if(this.flag !== 0) {
					this.rebuileComponents();
					if( this.nextlabel === '提交'){
						this.nextlabel = '下一题';
					}
					this.nowNum = this.nowNum - 1;
					this.flag -= 1;
					this.num = 100 / this.total * this.nowNum;
					this.qestion = this.questionjson.question[this.flag];
				}else {
					uni.navigateBack()
				}
			},
			// 设置题目格式
			setQuestionFormat: function(data){
				for(let itemKey in this.SumActualTotal) {
					if(Number(this.SumActualTotal[itemKey]) === Number(data)){
						let setItem = this.SumTotal.filter( v=> {
								return v.label === itemKey
							})
						let list = [];
						// 判断不能体质重复
						if (!this.physique_type.some(val => {
							return val[0] === setItem[0].name;
						})){
							list.push(setItem[0].name);
							list.push(this.SumActualTotal[itemKey]);
							return list;
						}
					}
				}
			},
			// 设置下一题样式
			setNextStyle:function(){
		
				if(this.qestion.isImage === 'false'){
					this.passflag =  this.qestion.select.some(val=> {
						return (val.status === 1)
					})
				}else {
					this.passflag =  this.qestion.select.every( val=> {
						return (val.status !== 0)
					})
				}
				this.flagfocus = 0;
				if(!this.passflag) {
					uni.showToast({
						title: '您有选项未选择',
						icon: 'none',
						duration: 2000
					})
					this.qestion.select.forEach(v=> {
						if(v.status === 0) {
							if(this.qestion.isImage === 'false'){
								v.color.fontColor = '#fff';
								v.color.iconBgc = '#fff';
								v.color.itemBgc = '#FFA2A2';
								if	(this.flagfocus === 0) {
									this.showItem = v.focus;
									this.flagfocus = 1;
								}

							}else {
								v.error = 'true';
								v.color.itemBgc = '#FFA2A2';
								v.color.itemImageBgc = '#FFEEEE';
								if	(this.flagfocus === 0) {
									this.showItem = v.focus;
									this.flagfocus = 1;
								}
							}
						}
					})
				}else {
					if(this.nextlabel !== '提交') {
							this.rebuileComponents();
							this.setNextQuestionData();
					}else {
						    this.physique_answer_list = []
							this.setfitnessSum();
							console.log(this.SumTotal)
							for(let key in this.SumActualTotal) {
								// console.log(this.SumActualTotal[key])
								const list = this.SumTotal.filter( v=> {
									return v.label === key
								})
								this.SumActualTotal[key] = Math.ceil(((this.SumActualTotal[key] / (list[0].value *4))*100));
							}
							// 拿到数值数组
							const temarr = [];
							for(let iKey in this.SumActualTotal) {
								temarr.push(this.SumActualTotal[iKey])
							}
							// console.log(temarr)
							// console.log(this.SumActualTotal)
							// if(uni.getStorageSync('age') === '3'){
							// 	this.clacThreePhysique(temarr)
							// }else{
							// 	this.clacSevenPhysique(temarr)
							// }
							for(let itmKey in this.SumActualTotal ) {
								let list = []
								this.SumTotalTree.forEach(val => {
									if(val.label === itmKey){
										list.push(val.name);
										list.push(this.SumActualTotal[itmKey]);
									}
								})
								this.physique_result_list.push(list);
							}
							let userInfo = JSON.parse(uni.getStorageSync('user_info'))
							let child = JSON.parse(uni.getStorageSync('child'))
							child.signature = uni.getStorageSync('imgBase');
							userInfo.tel = child.ptel;
							if(uni.getStorageSync('isdisease') !== 0){
								child.is_diet = 1;
							}else {
								if(JSON.parse(uni.getStorageSync('isdisStatus')).includes('是')){
									child.is_diet = 1;
								}else{
								   child.is_diet = 0;
								}
							}
							uni.showLoading({
							    title: '加载中'
							});
							let that = this;
							uni.request({
							    url: utils.env + '/Home/Report/addReport', //仅为示例，并非真实接口地址。
							    data: {
							       user_info:  userInfo,
								   answer: {
									   physique_type: this.physique_type,
									   physique_answer_list: this.physique_answer_list,
									   physique_result_list: this.physique_result_list,
									   physique_asthma: uni.getStorageSync('isdisease') === '0'? 0: 1,
									   physique_asthma_list: uni.getStorageSync('isdisease') === '0'? []:  uni.getStorageSync('isdisease').splice(1, 2)
								   },
								   child: child,
							    },
								method: 'POST',
							    header: {
							        'custom-header': 'application/json' //自定义请求头信息
							    },
							    success: function (res) {
									uni.hideLoading();
							        if(res.data.status === '1000'){
										uni.setStorageSync('child_id', res.data.data.child_id)
										uni.redirectTo({
											url: '../../score/physicalScore?value=5'
										})
										that.max = that.thirdMax = that.secondMax = 0;
										uni.setStorageSync('results', JSON.stringify(res.data.data.physique_type))
										uni.showToast({
										    title: res.data.msg,
										    duration: 2000
										});
									}else{
										uni.showToast({
										    title:  res.data.msg,
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
						// }
					
					}

				}
			},
			// 设置下一题的数据
			setNextQuestionData: function() {
				// this.setScrolltoTop();
				this.flag += 1;
				  this.nowNum = this.nowNum + 1;
				if(this.nowNum <  this.total){
					this.num = 100 / this.total * this.nowNum;
				}else {
					this.num = 100;
					this.nextlabel = '提交';
				}
				this.qestion = this.questionjson.question[this.flag]
			},
			// 有图片数据样式设置
			selcetChcek: function(item, data) {
				item.color.questionImageSelect.forEach(val=> {
					val.color.ftcolor = '#B3ABAB';
					val.color.t_iconBgc = '#707070';
					val.color.t_borBgc = '#D8D8D8';
					val.color.bgc = '#FCFCFC';
					val.color.t_innericonBgc = '#FFFFFF';
					val.status = 0;
					val.color.status = 0;
				})
				item.status = 1;
				item.error = 'false';
				item.color.fontColor = '#fff';
				item.color.i_iconBgc = '#fff';
				item.color.itemBgc = '#8ECDFF';
				item.color.itemImageBgc = '#E8F5FF';
				data.color.ftcolor='#FFFFFF';
				data.color.t_iconBgc='#FFFFFF';
				data.color.t_borBgc='#5CB7FF';
				data.color.bgc='#5CB7FF';
				data.color.t_innericonBgc = '#5CB7FF';
				data.color.status = 1;
			},
			// 计算分数
			setfitnessSum: function(){
				this.isdisStatus = [];	
				// 计算分数
				this.questionjson.question[0].select.forEach(v=> {
					if(v.status == 1){
						if(v.focus === 'A'){
							this.isdisStatus.push('是')
						}else{
							this.isdisStatus.push('否')
						}
					}
				})
				this.questionjson.question[1].select.forEach(val=> {
					if(val.status == 1){
						if(val.focus === 'A'){
							this.isdisStatus.push('是')
						}else{
							this.isdisStatus.push('否')
						}
					}
				})
			    // 判断 是否选了从不
				if(uni.getStorageSync('age') === '3'){
					let arr = [];
					let index = [8,9,10,11];
					index.forEach(res => {
						this.questionjson.question[15].
						select[res].color.questionImageSelect.forEach(v_item => {
							if(v_item.color.status === 1) {
								arr.push(v_item.label)
							}
						})
					})
					uni.setStorageSync('isShowFood', JSON.stringify(arr))
				}else{
					let arr = [];
					let index = [13,14,15,16];
					index.forEach(res => {
						this.questionjson.question[16].
						select[res].color.questionImageSelect.forEach(v_item => {
							if(v_item.color.status === 1) {
								arr.push(v_item.label)
							}
						})
					})
					uni.setStorageSync('isShowFood', JSON.stringify(arr))
				}
				uni.setStorageSync('isdisStatus', JSON.stringify(this.isdisStatus))
				this.questionjson.question.forEach(v => {
					// 判断属于哪一种类型的题
					if(v.isImage === 'false'){
						let arr = [];
						v.select.forEach((item, index) => {
							// 判断选中的参数与其相加
							if(item.status === 1){
								arr.push(item.focus)
								// this.answer.push(item.focus)
								for(let key in this.SumActualTotal) {
									this.SumActualTotal[key] += (item.value[key]*item.data)
								}
							}
						})
						this.physique_answer_list.push(arr)
					}else{
						let arr = [];
						// 判断有图片的题的计算方式
						v.select.forEach(item => {
							// 判断是否单选
							this.answer.push(item.focus)
							item.color.questionImageSelect.forEach(v_item => {
								if(v_item.color.status === 1) {
									this.answer.push(v_item.label)
									// 单选以后开始汇总
									for(let mapKeys in this.SumActualTotal){
									  this.SumActualTotal[mapKeys] += (item.value[mapKeys] * v_item.color.value);
									}
									arr.push(v_item.label)
								}
							})
						})
						arr.push('flag')
						this.physique_answer_list.push(arr)
					}
				})
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
					fail: function(res) {
						console.log(res)
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
								url: '../../index/no_questionnaire'
							})
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
			},
		},
	}
</script>

<style lang='scss'>
	.body {
		width: 100vw;
		height: 100vh;
		background: #7399F7;
		overflow: hidden;
		.question-content{
			width: 100vw;
			height: 100vh;
			.question-title-image{
				position:relative;
				image{
					width: 100%;
					height: 30vh;
				}
			}
			.question-title{
				position: relative;
				top: -5.5vh;
				/* 计数器选项 */
				.progress-bar {
					background: #fff;
					background: radial-gradient(circle at bottom right,transparent 10px,#fff 0) bottom right,
				              radial-gradient(circle at bottom left,transparent 10px,#fff 0) bottom left,
				              radial-gradient(circle at top left,transparent 0px,#fff 0) top left,
				              radial-gradient(circle at top right,transparent 0px,#fff 0) top right;
					background-size: 51% 51%;
					background-repeat: no-repeat;
					/* height: 8vh; */
					margin: 0 4vw;
					border-top-left-radius: 20rpx;
					border-top-right-radius: 20rpx;
					padding: 3vh 3vh 6vh 3vh;
					/* margin-bottom: 8vh; */
					.bar{
						text-align: center;
						.bar-title {
							display: flex;
							justify-content: space-between;
							font-size: 26rpx;
						}
						.out-bar {
							width: 100%;
							background: #FFFFFF;
							height: 2vh;
							border: 1px solid #DFDFDF;
							border-radius: 35px;
							.inner-bar {
								background: linear-gradient(to right, #366EEC 0%, #23C9F7 100%);;
								height: 80%;
								margin: 2rpx 0;
								border-radius: 35px;
							}
						}
					}
				}
				/* 选择问题选项 */
				.questions-select-contion {
					background: #fff;
					width: 92vw;
					background: radial-gradient(circle at bottom right,transparent 0px,#fff 0) bottom right,
					          radial-gradient(circle at bottom left,transparent 0px,#fff 0) bottom left,
					          radial-gradient(circle at top left,transparent 10px,#fff 0) top left,
					          radial-gradient(circle at top right,transparent 10px,#fff 0) top right;
					background-size: 51% 51%;
					background-repeat: no-repeat;
					margin: 0  auto;
					/* padding-bottom: 3vh; */
					/* margin-bottom: 8vh; */
					position: relative;
					height: auto;
					border-bottom-left-radius: 20rpx;
					border-bottom-right-radius: 20rpx;
					.question-list {
						padding-top: 4vh;
						padding-left: 3vw;
						padding-right: 3vw;
						padding-bottom: 6vh;
						.question {
							/* 有图片的样式 */
							.item-image {
								margin-bottom: 4vh;
								border-radius: 10rpx;
								padding: 0 0 2vh 0;
								position: relative;
								.select-item {
									margin-top: 1vh;
									padding: 1vh 3vw;
									line-height: 25px;
									border-radius: 10rpx;
									.select-rand{
										display: inline-block;
										width: 8px;
										height: 8px;
										margin-right: 4vw;
										border-radius: 2rpx;
										margin-bottom: 10rpx;
									}
								}
								.select-image {
									margin-top: 1.5vh;
								    width: 100%;
									padding-left: 3vw;
									img {
										width: calc(100% - 23px);
										/* padding-right: 4vw; */
									}
									.select-check {
										width: 80vw;
										overflow:hidden;
										padding: 1vh 0;
										text-align: center;
										.select-check-item {
											width: 12vw;
											padding: 2vh 1vw 1vh 1vw;
											margin: 0 2px;
											display: inline-block;
											border-radius: 5px;
											.check-icon {
												display: block;
												width: 10px;
												height: 10px;
												border-radius: 50%;
												margin: 0 auto;
												position: relative;
												vertical-align:middle;
												.check-icon-point {
													display: inline-block;
													width: 4px;
													height: 4px;
												    background: #fff;
													position: absolute;
													top: 3px;
													left: 3px;
													border-radius: 50%;
												}
											}
										}
										.check-text{
											display: block;
											font-size: 16px;
											width: 10vw;
											margin: 1vh auto;
										}
									}

								}
								/* 错误提示 */
								.error-tip {
									margin-left: 2vw;
									image {
										width: 14px;
										height: 14px;

									}
									text {
										margin-left: 2vw;
										font-size: 12px;
										color: red;
									}
								}
							}
							/* 没有图片的样式 */
							.select-item {
								margin-top: 4vh;
								margin-bottom: 2vh;
								padding: 1vh 3vw;
								line-height: 25px;
								border-radius: 10rpx;
								.select-rand{
									display: inline-block;
									width: 8px;
									height: 8px;
									border-radius: 50%;
									margin-right: 4vw;
									margin-bottom: 10rpx;
								}
							}
						}
						.question-btn {
							width: 93%;
							position: absolute;
							display: flex;
							bottom: -23px;
							justify-content: space-between;
							.close-btn {
								background: #FFEF6B;
								border-radius: 45rpx;
								box-shadow: 0rpx 15rpx 0rpx #BDB258;
								width: 40vw;
								margin: 0 auto;
								.icon {
								   font-size: 26px;
								  vertical-align:middle;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
