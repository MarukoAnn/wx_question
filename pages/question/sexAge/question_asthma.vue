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
							<view class="bar" >
								<text style="font-size: 1.2rem">哮喘情况调查</text>
								<!-- <text>{{nowNum}}/{{total}}题</text>
								<view class="bar-title">
									<text>0</text>
									<text>{{total}}</text>
								</view>
								<view class="out-bar">
									<view class="inner-bar" :style="{width: num + '%' }"></view>
								</view> -->
							</view>
						</view>
					<!-- 选择内容 -->
						<view class="questions-select-contion">
							<view class="question-list">
								<view class="question">
									<!-- 标题 -->
									<view class="title" v-if="qestion.title !==''">
										<text>{{qestion.title}}</text>
									</view>
									<!-- 没有图片选择的 -->
									<view v-if="qestion.type === '1'">
										<view class="select-item" :style="{background: item.color.itemBgc}" v-for="item in qestion.select" :key="item.item" @click="selectItemData(qestion, item)" :id="item.focus">
											<text class="select-rand" :style="{background: item.color.iconBgc}"></text>
											<text :style="{color: item.color.fontColor}" :name="item.item">{{item.item}}</text>
										</view>
									</view>

									<!-- 图片的 -->
									<view v-if="qestion.type === '2'">
										<view class="select-item" :style="{background: item.color.itemBgc}" v-for="item in qestion.select" :key="item" @click="selectItemData(item)" :id="item.focus">
											<view  v-for="(t_item, t_index) in item.label" :key="t_index" style="color: #fff;display: inline-block;">
												<text >{{t_item.b_text}}</text>
												<input v-if="t_item.input === 1" type="text" :value="t_item.value" @blur="setInputValue($event, item, t_index)" style="vertical-align:middle; color: #5AA5F7; margin: 1vh 3vw;padding: 1vh 3vw; display: inline-block; width:13vw; background: #F7F7F7;border-radius: 5px"/>
												<text>{{t_item.a_text}}</text>
											</view>	
										</view>
									</view>
								</view>
								<!-- 上下一题的按钮 -->
							<view class="question-btn">
								<button class="close-btn" @click="backQuestion"><van-icon name="arrow-left" class="icon" /><text>上一题</text></button>
								<button class="close-btn" @click="nextQuestion"><a :href="showItem"><text>{{nextlabel}}</text><van-icon name="arrow" class="icon" /></a></button>
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
				title: '',
				isdisease: [],
				a: true
		  }
		},
		created(){
			if(uni.getStorageSync('age') === '3'){
				this.title = '3~6岁儿童中医体质调查表';
			}else {
				this.title = '6~14岁儿童中医体质调查表'
			}
			this.questionjson = require('../../../util/que_ashma.json');
			this.qestion = this.questionjson.question[this.flag];
		},
		methods: {
			// 没有图片数据样式设置
			selectItemData: function(data, item){
				console.log(item)
				if(data.type === '1') {
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
				}		
			},
			scroll: function(e) {
			     this.old.scrollTop = e.detail.scrollTop
			 },
			setScroll: function(e) {
				this.scrollTop = this.old.scrollTop
				console.log(this.scrollTop)
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
				console.log(this.qestion)
				this.setNextStyle();
				// this.setQuestionData()
				// this.flag += 1;
				// this.qestion = this.questionjson.question[this.flag];
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
					uni.navigateBack({
						url:  1
					})
				}
			},
			setInputValue:function(e, item, index){
				item.label[index].value = e.detail.value;
				if(item.label.some( val => {
					return val.value === '' 
				})) {
					item.status = 0
				}else {
					item.status = 1
				}
				if(item.status === 1) {
					item.color.itemBgc ="#8ECDFF"
				}
			},
			// 设置下一题样式
		     setNextStyle: function(){
				if(this.qestion.type === '1'){
					this.passflag =  this.qestion.select.some(val=> {
						return (val.status === 1)
					})
				}else {
					this.passflag =  this.qestion.select.every( val=> {
						return (val.status !== 0)
					})
				}
				 if	(!this.passflag) {
					 uni.showToast({
					 	title: '您有选项未填或者未选择',
					 	icon: 'none',
					 	duration: 2000
					 })
					 this.qestion.select.forEach(v=> {
					 	if(v.status === 0) {
					 		if(this.qestion.type === '1'){
					 			v.color.fontColor = '#fff';
					 			v.color.iconBgc = '#fff';
					 			v.color.itemBgc = '#FFA2A2';
					 			if	(this.flagfocus === 0) {
					 				this.showItem = v.focus;
					 				this.flagfocus = 1;
					 			}
					 		}else {
					 			v.color.itemBgc = '#FFA2A2';
					 		}
					 	}
					 })
				 }else{
					 if	(this.flag === this.questionjson.question.length -1){
						 console.log("提交")
						 this.setQuestionData()
						 // this.isdisease = this.isdisease.join(',')
						 uni.setStorageSync('isdisease', this.isdisease);
						 uni.redirectTo({
							url: './qusetionOne'
						 });
						 // uni.hideLoading();
					 }else {
						 console.log(this.flag)
						 if	(this.flag === 0) {
							 this.qestion.select.forEach(v => {
								 console.log(v)
								 if(v.status === 1) {
									 if(v.focus === 'B') {
										 uni.setStorageSync('isdisease', '0');
										 uni.navigateTo({
										 	url: './qusetionOne'
										 });
									 }else{
										 this.flag += 1;
										 this.qestion = this.questionjson.question[this.flag]
									 }
								 }
							 })
						 }else {
							 if	(this.flag + 1 === this.questionjson.question.length -1) {
								 this.nextlabel = '下一题';
							 } 
							 this.flag += 1;
							 this.qestion = this.questionjson.question[this.flag];
						 }
					 }
				 }
			 },
			// 收集答案
			setQuestionData: function() {
				this.questionjson.question.forEach(item => {
					if(item.type === '1') {
						let list = [];
						item.select.forEach((val, index) => {
							if(val.status === 1) {
							   list.push(index);
							}
						})
						this.isdisease.push(list)
					}else{
						item.select.forEach(val => {
							let listTwo = [];
							val.label.forEach(v =>{
								listTwo.push(v.value)
							})
							listTwo.push('asthma')
							this.isdisease.push(listTwo)
						})
					}
				})
			},
		
		}
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
					height: 8vh;
					margin: 0 4vw;
					border-top-left-radius: 20rpx;
					border-top-right-radius: 20rpx;
					padding: 3vh 3vh 6vh 3vh;
					/* margin-bottom: 8vh; */
					.bar{
						text-align: center;
						margin-top: 4vh;
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
