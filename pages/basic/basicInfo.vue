<template>
	<view class="info-content">
		<view :style="{marginTop: indexSearchBar + 'px'}">
			<uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="加载页"></uni-nav-bar>
		</view>
		<view class="basic-content">
			<view class="title-image">
				<view style="position: absolute;color:#fff;top:8vh;right:10vw;width: 46vw;text-align: center;">
						<text>{{title}}</text>
				</view>
				<image src="https://www.softcasing.com/images/view/ic_basic_title.png"></image>
			</view>
			<view class="question-title">
				<!-- 头部标题 -->
				<view class="progress-bar">
					<view class="bar">
						<text style="font-size: 1.2rem">基础信息填写</text>
						<!-- 	<text>1/{{total}}题</text>
							<view class="bar-title">
								<text>0</text>
								<text>{{total}}</text>
							</view>
							<view class="out-bar">
								<view class="inner-bar" :style="{width: num +'%'}"></view>
							</view> -->
					</view>
				</view>
				<!-- 选择内容 -->
				<view class="questions-select-contion">
					<view class="question-list">
						<view class="question">
							<!-- 家长电话 -->
							  <text style="margin: 1.5vh 0;display: block;">1、家长联系电话</text>
							  <van-field
								type="number"
								v-model="userInfo.ptel"
								minlength="11"
								maxlength="11"
								custom-style="background: #F7F7F7;	border-radius: 5px"
								@blur = "changeInfo($event,'ptel')"
							  />
							  <!-- 姓名 -->
							 <text style="margin: 1.5vh 0;display: block;">2、孩子的姓名</text>
							  <van-field
								:value="userInfo.name"
								custom-style="background: #F7F7F7;	border-radius: 5px"
								@input = "changeInfo($event,'name')"
							  />
							  <!-- 性别 -->
							  <text style="margin: 1.5vh 0;display: block;">3、孩子的性别</text>
							   <view style="width: 100%;display: flex;justify-content: space-between;">
								   <text class="sex" v-for="item in sexData" :key="item" :style="{background: item.bgc}" @click="selectSex(item)">{{item.label}}</text>
							   </view>
							   <!-- 年龄 -->
							  <text style="margin: 1.5vh 0;display: block;">4、孩子的年龄</text>
							  <view style="width: 100%;display: flex;justify-content: space-between;"> 
								  <view>
									    <input type="number" :value="userinfoAge.age" style="display: inline-block; vertical-align: middle; width: 60%; padding-left: 4vw; background: #F7F7F7;border-radius: 5px;height: 6vh;line-height: 6vh;" @blur="ageblur($event, 'age')" />
										<text style="margin-left: 3vw;">岁</text>
								  </view>
								 <view>
										<input type="number" :value="userinfoAge.month" style="vertical-align: middle; display: inline-block; width: 60%; padding-left: 4vw; background: #F7F7F7;border-radius: 5px;height: 6vh;line-height: 6vh;" @blur="ageblur($event,'month')">
										<text style="margin-left: 3vw;">月</text>
								 </view>
							  </view>
							  
								<!-- 身高 -->
								<text style="margin: 1.5vh 0;display: block;">5、孩子的身高(cm)</text>
								<van-field
								  :value="userInfo.height"
								   type="digit"
								   custom-style="background: #F7F7F7;border-radius: 5px"
								   @input = "changeInfo($event,'height')"
								/>
								<!-- 体重 -->
								<text style="margin: 1.5vh 0;display: block;">6、孩子的体重(公斤)</text>
								<van-field
								  :value="userInfo.weight"
								   type="digit"
								   custom-style="background: #F7F7F7;border-radius: 5px"
								   @input = "changeInfo($event,'weight')"
								/>
								<!-- 名族 -->
								<text style="margin: 1.5vh 0;display: block;">7、孩子的民族</text>
								 <van-field
								   :value="userInfo.nation"
								   custom-style="background: #F7F7F7;	border-radius: 5px"
									@input = "changeInfo($event,'nation')"
								 />
								 <!-- 地区 -->
								<text style="margin: 1.5vh 0;display: block;">8、近三年较为固定的生活地区(省、市、镇)</text>
								 <view
									style="background: #F7F7F7;	border-radius: 5px;height: 7vh;line-height: 7vh;"
									@click="showAreaSelectPop"
								  ><text style="margin-left: 4vw;font-size: 15px;font-weight: 400;">{{child.address}}</text></view>
								<van-popup
									   :show="show"
									   position="bottom"
									   custom-style="height: 40%;"
									   bind:close="onClose"
									 >
									  <van-area :area-list="areaList"  :columns-placeholder="['请选择', '请选择', '请选择']" @cancel="cancle" @confirm="confirmArea"/>
								 </van-popup>
		
						</view>
						<!-- 上下一题的按钮 -->
						<view class="question-btn">
							<button class="close-btn" @click="backQuestion"><van-icon name="arrow-left" class="icon" /><text>上一题</text></button>
							<button class="close-btn" @click="nextQuestion"><text>下一题</text><van-icon name="arrow" class="icon" /></button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script> 
	import jsonList from '../../util/area.js';
	export default {
		data(){
			return {
				sexData: [
					{label: '男', bgc: '#F7F7F7'},
					{label: '女', bgc: '#F7F7F7'}
				],
				heightList: [],
				userinfoAge: {
					age: null,
					month: ''
				},
				testIpone: /^1[3746589]\d{9}$/,
				child: {
					ptel: '',
					sex: '',
					age: '',
					nation: '',
					name: '',
					height: '',
					weight: '',
					address: '',
					flag: '',
					is_diet: 0
				},
				num: 5,
				areaList: '',
				show: false,
				showheightPop: false,
				title: '',
				total: null
			}
		},
		onLoad(){
			// const json = require('../../util/question.json');
			// console.log()
			if(uni.getStorageSync('age') === '3'){
				this.title = '3~6岁儿童中医体质调查表';
				// const json = require('../../util/question.json');
				// this.total = json.question.length + 1;
			}else {
				this.title = '6~14岁儿童中医体质调查表';
				// const json = require('../../util/question_two.json');
				// this.total = json.question.length + 1;
			}
			this.areaList = jsonList;
			// console.log(this.areaList);
		},
		methods:{
		  selectSex: function(item){
			  this.sexData.forEach( v => {
				  v.bgc = '#F7F7F7';
			  })
			  item.bgc = '#72ACFB';
			  this.child.sex = item.label === '男'? 1: 2;
			  
		  },
		  cancle: function(){
			  this.show = false;
		  },
		  // 展示地区选择器
		  showAreaSelectPop: function(){
			  this.show = true;
		  },
		  // 展示身高选择器
		  showHeightSelectPop: function(){
			  this.showheightPop = true;
		  },
		  // 展示体重选择器
		  showWeightSelectPop: function(){
		  		this.showheightPop = true;
		  },
		  // 电话改变
		  changeInfo: function(e, label) {
			  if(label === 'ptel') {
				  if(this.testIpone.test(e.detail.value)) {
					   this.child[label] = e.detail.value; 
				  }else{
					  uni.showToast({
					  	title: '请输入正确的手机号',
					  	duration: 2000,
					  	icon: 'none'
					  });
				  }
			  }else {
				  if(label === 'name' || label === 'nation' || label === 'weight' || label === 'height') {
					  	  this.child[label] = e.detail; 
				  }else {
					  	 this.child[label] = e.detail.value; 
				  }
			  }
		  },
		  // 地区确认
		  confirmArea: function(event) {
			  this.show = false;
			  this.child.address = '';
			  event.detail.values.forEach((v, key) => {
				  if(key >=2) {
					  this.child.address =this.child.address + v.name ;
				  }else{
					  this.child.address =this.child.address + v.name + ' / ';
				  }
				  
			  });
			  
			  
		  },
		  backQuestion: function(){
			  uni.navigateBack({
			  	url: 1
			  })
		  },
		  nextQuestion: function(){
			  let flag = uni.getStorageSync('age') === '3'? '1' : '2';
			  this.child.flag = flag;
			  const list =['ptel', 'sex', 'age', 'name', 'nation', 'height', 'weight','address'];
			  var pass =  list.some( v=> {
				 return this.child[v] === ''
			  });
			  uni.setStorageSync('child', JSON.stringify(this.child))
			  if(!pass && (this.userinfoAge.month !== '')){
				  if(this.testIpone.test(this.child.ptel)) {
					  if( uni.getStorageSync('age') === '3'){
						if(this.userinfoAge.age <= 6 && this.userinfoAge.age >= 3){
							if(this.userinfoAge.month < 12 && this.userinfoAge.age >0) {
								if(uni.getStorageSync('area') === ''){
									  uni.navigateTo({
											url: '../question/sexAge/question_asthma'
									  })
									  uni.setStorageSync('child', JSON.stringify(this.child))
								}else {
									  uni.redirectTo({
										url: '../index/no_questionnaire'
									  })
								}
							}else {
								uni.showToast({
									title: '您输入的月份不符合规则，请重新输入',
									duration: 2000,
									icon: 'none'
								});
							}
						}else {
							uni.showToast({
								title: '您输入的年龄与所选调查表年龄区间不符，请重新输入',
								duration: 2000,
								icon: 'none'
							});
						}
					  }else {
						  if(this.userinfoAge.age <= 14 && this.userinfoAge.age >= 6){
							if(this.userinfoAge.month < 12 && this.userinfoAge.age >0) {
								if(uni.getStorageSync('area') === ''){
									  uni.navigateTo({
											url: '../question/sexAge/question_asthma'
									  })
									  uni.setStorageSync('child', JSON.stringify(this.child))
								}else {
									  uni.redirectTo({
										url: '../index/no_questionnaire'
									  })
								}
							}else {
								uni.showToast({
									title: '您输入的月份不符合规则，请重新输入',
									duration: 2000,
									icon: 'none'
								});
							}
						  }else if(this.userinfoAge.age === 14){
							  if(this.userinfoAge.month === undefined || this.userinfoAge.month === null || this.userinfoAge.month === '') {
								  if(uni.getStorageSync('area') === ''){
									  uni.navigateTo({
									  		url: '../question/sexAge/question_asthma'
									  })
									  uni.setStorageSync('child', JSON.stringify(this.child))
								  }else {
										uni.redirectTo({
											url: '../index/no_questionnaire'
										})
								  }
							
							  }else {
								  uni.showToast({
									title: '您输入的年龄与所选调查表年龄区间不符，请重新输入（不能超过14岁）',
									duration: 2000,
									icon: 'none'
								  });
							  }
						  }else{
							  uni.showToast({
								title: '您输入的年龄与所选调查表年龄区间不符，请重新输入',
								duration: 2000,
								icon: 'none'
							  });
						  }
					  } 
				  }else {
					  uni.showToast({
					      title: '手机号输入错误',
					      duration: 2000,
					  	  icon: 'none'
					  });
				  }
				
			  }else {
				  uni.showToast({
				      title: '数据未填完整',
				      duration: 2000,
					  icon: 'none'
				  });
			  }
		  },
		  // 填写年龄
		  ageblur: function(e, label){
	    	  console.log(e)
			  if(label === 'age'){
				 this.userinfoAge.age = e.detail.value;
				 if(this.userinfoAge.month !== '') {
					 this.child.age = this.userinfoAge.age +'岁' + this.userinfoAge.month+ '月';
				 }else {
					 this.child.age = this.userinfoAge.age +'岁';
				 }
			  }else {
				  if(0 <= e.detail.value && e.detail.value <= 12) {
					  this.userinfoAge.month = e.detail.value;
					  if(this.userinfoAge.age !== null){
					  	this.child.age = this.userinfoAge.age +'岁' + this.userinfoAge.month+ '月'; 
					  }
				  }else {
					  if(e.detail.value == '') {
						  this.userinfoAge.month = e.detail.value;
					  }else {
						  this.userinfoAge.month = e.detail.value;
						  uni.showToast({
						  	title: '您输入的月数不符合规则',
						  	duration: 2000,
						  	icon: 'none'
						  });
					  }
				  }
			  }
		  }
		},
	}
</script>

<style lang="scss">
	.info-content {
		width: 100vw;
		height: 100vh;
		background: #7399F7;
		overflow: hidden;
		.basic-content {
			width: 100vw;
			height: 100vh;
			overflow: scroll;
			.title-image{
				position: relative;
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
						/* border-radius: 20rpx; */
						padding-top: 3vh;
						padding-left: 3vh;
						padding-right: 3vh;
						padding-bottom: 6vh;
						/* padding: 3vh; */
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
						background: #F7F7F7;
						width: 92vw;
						background: radial-gradient(circle at bottom right,transparent 0px,#fff 0) bottom right,
						          radial-gradient(circle at bottom left,transparent 0px,#fff 0) bottom left,
						          radial-gradient(circle at top left,transparent 10px,#fff 0) top left,
						          radial-gradient(circle at top right,transparent 10px,#fff 0) top right;
						background-size: 51% 51%;
						background-repeat: no-repeat;
						/* height: 34vh; */
						margin: 0  auto;
						margin-bottom: 4vh;
						padding-bottom: 4vh;
						position: relative;
						border-bottom-left-radius: 20rpx;
						border-bottom-right-radius: 20rpx;
						.question-list {
							padding-top: 4vh;
							padding-bottom: 4vh;
							padding-left: 3vw;
							padding-right: 3vw;
							.question {
								.sex {
									text-align: center;
									display: inline-block;
									border-radius: 5px; 
									width: 37vw;
									padding:2vh 2vw;
								}
							}
							.question-btn {
								width: 93%;
								position: absolute;
								bottom: -23px;
								display: flex;
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
