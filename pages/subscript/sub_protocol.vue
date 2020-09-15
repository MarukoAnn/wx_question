<template>
	<view class="sub_content">
		<view class="content">
			<view class="title-image">
				<view style="position: absolute;color:#fff;top:9vh;right:10vw;width: 46vw;text-align: center;">
						<text>{{title}}</text>
				</view>
				<image src="https://www.softcasing.com/images/view/ic_basic_title.png"></image>
			</view>
			<view class="content-view">
			   <view class="subcript-test">
				   <text style="display: block;">尊敬的家长:</text>
					<text style="text-indent: 2em;display: inline-block;line-height: 6vh;" v-for="(item, index) in sub_description" :key="index">
						{{item}}
					</text>
					<view v-for="(itemtext, index) in opinionList" :key=index >
						<text style="text-indent: 2em;display: inline-block;">
							{{itemtext.text}}
						</text>
						<van-radio-group :value="itemtext.radio" @change="onchange($event, opinionList, index)" style="display: flex;justify-content: space-between;padding: 2vh 10vw;">
						  <van-radio name="1" icon-size="25px" shape="shape" style="display: inline-block;padding: 1vw;">同意</van-radio>
						  <van-radio name="2" icon-size="25px" shape="shape" style="display: inline-block;">不同意</van-radio>
						</van-radio-group>
					</view>
				
				</view>
				<button class="close-btn" :disabled="btn_disble" @click="showModalClick" v-if="isSinger">输入签名</text></button>
				<button class="close-btn" :disabled="btn_disble" @click="nextPage" v-else>开始填写</text><van-icon name="arrow" class="icon" /></button>
			</view>
			<van-popup :show="showModal" @close="onClose" closeable="true" style="position: fixed">
				<view class="title">请在下面输入签名：</view>
				<canvas class="mycanvas" canvas-id="mycanvas" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"></canvas>
				<view class="footer">
					<view class="left" @click="finish">完成</view>
					<view class="right" @click="clear">清除</view>
				</view>
			</van-popup>
		</view>
	</view>
</template>

<script>
	import { pathToBase64, base64ToPath } from '../../js_sdk/gsq-image-tools/image-tools/index.js'
	var x = 20;
	var y =20;
	export default {
		data(){
			return {
				title: '',
				radio: '0',
				sub_text: [
					'您好，体质是人体处于相对健康时的一种身体状态，是先天与后天多种因素共同作用下形成的一种个性特征。中医认为，体质影响着疾病的发生、发展，以及患病后的疾病性质。因此了解自身体质，根据体质特点指导日常生活，可以最大限度地预防疾病的发生与发展。因此，我们将要开展一项关于儿童体质类型的调查，来总结儿童中医体质类型特点，为将来医生指导家长育儿、防病治病提供帮助。现诚邀您及您的孩子参加该项研究。',
					'本研究采用问卷形式，鉴于儿童对平素自身情况了解欠缺或表达欠准确以及对本问卷的理解难于把握，本问卷由家长填写孩子的具体情况，对孩子本身无任何风险及不良反应，您需要提供孩子既往和当前生活状态（学习、饮食、情绪等）信息。通过本研究，您可以初步了解孩子的中医体质类型，为将来根据中医体质类型生活指导、预防疾病提供依据。',
					'本研究不需要任何费用，回答本调查问卷可能会占用您一些时间。',
					'您孩子的调查记录将保存在医院，您及孩子的个人身份信息绝对保密，任何有关本项研究结果的公开报告将不会披露您孩子的个人身份。参加本项研究是完全自愿的，您可以拒绝参加此项研究。',
					'本项研究的项目负责人是首都医科大学附属北京中医医院李敏，本项研究的资助方是北京市医院管理局儿科学科协同发展中心。','如果您有与本研究相关的任何问题，请联系北京中医医院儿科医生，联系电话 52176906、52176591。',
					'如果您有与孩子自身权益相关的问题，可与首都医科大学附属北京中医医院医学伦理委员会联系，联系电话：010-64011516。',
					'我已阅读知情同意书并同意我的孩子参加本研究（或我已经和孩子讨论过这个研究项目，我的孩子同意参加本研究）',
				],
				sub_text2: [
					'您好，体质是人体处于相对健康时的一种身体状态，是先天与后天多种因素共同作用下形成的一种个性特征。中医认为，体质影响着疾病的发生、发展，以及患病后的疾病性质。因此了解自身体质，根据体质特点指导日常生活，可以最大限度地预防疾病的发生与发展。因此，我们将要开展一项关于儿童体质类型的调查，来总结儿童中医体质类型特点，为将来医生指导家长育儿、防病治病提供帮助。现诚邀您及您的孩子参加该项研究。',
					'本研究采用问卷形式，鉴于儿童对平素自身情况了解欠缺或表达欠准确以及对本问卷的理解难于把握，本问卷由家长填写孩子的具体情况，对孩子本身无任何风险及不良反应，您需要提供孩子既往和当前生活状态（学习、饮食、情绪等）信息。通过本研究，您可以初步了解孩子的中医体质类型，为将来根据中医体质类型生活指导、预防疾病提供依据。',
					'本研究不需要任何费用，回答本调查问卷可能会占用您一些时间。',
					'您孩子的调查记录将保存在医院，您及孩子的个人身份信息绝对保密，任何有关本项研究结果的公开报告将不会披露您孩子的个人身份。参加本项研究是完全自愿的，您可以拒绝参加此项研究。',
					'本项研究的项目负责人是首都医科大学附属北京中医医院李敏，本项研究的资助方是北京市医院管理局儿科学科协同发展中心。',
					'如果您有与本研究相关的任何问题，请联系北京中医医院儿科医生，联系电话 52176906、52176591。',
					'如果您有与孩子自身权益相关的问题，可与首都医科大学附属北京中医医院医学伦理委员会联系，联系电话：010-64011516'
				],
				sub_option: [
					{text:'我已阅读知情同意书并同意参加本研究。', radio: '0'}
				],
				sub_option2: [
					{text:'家长：我已阅读知情同意书并同意我的孩子参加本研究', radio: '0'},
					{text:'孩子：我已阅读知情同意书并同意我的孩子参加本研究', radio: '0'}
				],
				opinionList: [],
				sub_description: [],
				isSinger: true, // 是否需要签名
				btn_disble: true, // 显示签名弹窗
				isEditSinger: false, // 判断是否写签名
				showModal: false,
				isAge: 0,
				ctx:'',         //绘图图像
				points:[]       //路径点集合 
			}
		},
		onLoad(){
			this.ctx = uni.createCanvasContext("mycanvas",this);   //创建绘图对象
			//设置画笔样式
			this.ctx.fillStyle="#fff";
			this.ctx.fillRect(0,0,400,620);
			this.ctx.draw();
			this.ctx.lineWidth = 4;
			this.ctx.lineCap = "round"
			this.ctx.lineJoin = "round"
			if(uni.getStorageSync('age') === '3'){
				this.title = '3~6岁儿童中医体质调查表';
				this.opinionList = this.sub_option;
				this.sub_description = this.sub_text;
			}else {
				this.title = '6~14岁儿童中医体质调查表';
				this.opinionList = this.sub_option2;
				this.sub_description = this.sub_text2;
			}
		},
		methods: {
			nextPage: function(){
				uni.navigateTo({
					url:'../basic/basicInfo'
				})
				// uni.navigateTo({
				// 	url:'../question/sexAge/qusetionOne'
				// })
			},
			showModalClick: function(){
				this.showModal = true;
				this.isEditSinger = false;
			},
			onClose: function(){
				 this.showModal= false ;
				 this.clear();
			},
			moveHandle(){
				return;
			},
			//触摸开始，获取到起点
				touchstart:function(e){
					let startX = e.changedTouches[0].x;
					let startY = e.changedTouches[0].y;
					let startPoint = {X:startX,Y:startY};
					
					/* **************************************************
						#由于uni对canvas的实现有所不同，这里需要把起点存起来
					 * **************************************************/
					this.points.push(startPoint);
					//每次触摸开始，开启新的路径
					this.ctx.beginPath();
				},
				
				//触摸移动，获取到路径点
				touchmove:function(e){
					let moveX = e.changedTouches[0].x;
					let moveY = e.changedTouches[0].y;
					let movePoint = {X:moveX,Y:moveY};
					this.points.push(movePoint);       //存点
					let len = this.points.length;
					if(len>=2){
						this.draw();                   //绘制路径
					}
					//  设置编辑了签名的状态
					if(!this.isEditSinger){
						this.isEditSinger = true;
					}
				},
				
				// 触摸结束，将未绘制的点清空防止对后续路径产生干扰
				touchend:function(){                   
					this.points=[];
				},
				
				/* ***********************************************
				#   绘制笔迹
				#	1.为保证笔迹实时显示，必须在移动的同时绘制笔迹
				#	2.为保证笔迹连续，每次从路径集合中区两个点作为起点（moveTo）和终点(lineTo)
				#	3.将上一次的终点作为下一次绘制的起点（即清除第一个点）
				************************************************ */
				draw: function() {
					let point1 = this.points[0]
					let point2 = this.points[1]
					this.points.shift()
					this.ctx.moveTo(point1.X, point1.Y)
					this.ctx.lineTo(point2.X, point2.Y)
					this.ctx.stroke()
					this.ctx.draw(true)
				},
				
				//清空画布
				clear:function(){
					let that = this;
					that.isEditSinger = false;
					uni.getSystemInfo({
						success: function(res) {
							let canvasw = res.windowWidth;
							let canvash = res.windowHeight;
							that.ctx.clearRect(0, 0, canvasw, canvash);
							that.ctx.draw(true);
						},
					})
				},
				
				//完成绘画并保存到本地
				finish:function(){
					if(this.isEditSinger){
						var that = this;
						uni.canvasToTempFilePath({
							  canvasId: 'mycanvas',
							  success: function(res) {
								  pathToBase64(res.tempFilePath)  
									.then(base64 => {  
									   uni.setStorageSync('imgBase', base64);
									   that.showModal = false;
									   that.isEditSinger = false;
									   that.isSinger = false;
									})  
									.catch(error => {  
									  uni.showToast({
										  title:  '签名获取失败, 请稍后再试',
										  duration: 2000,
										icon: 'none'
									  }); 
									})
							},
						});
					}else{
						uni.showToast({
						    title:  '请先绘制签名',
						    duration: 2000,
							icon: 'none'
						});
					}
				
			},
			onchange: function(event, option, index ) {
				this.opinionList[index].radio =  event.detail;
				if(this.opinionList.every(v=> {
					return v.radio === '1'
				})){
					this.btn_disble = false;
				}else {
					this.btn_disble = true;
				}
			}
		},
	}
</script>

<style lang="scss">
	.sub_content {
		height: 100vh;
		width: 100vw;
		background: #7399F7;
		overflow: hidden;
		.content{
			width: 100vw;
			height: 100vh;
			overflow: scroll;
			position: relative;
			.title-image{
				image{
					width: 100%;
					height: 30vh;
				}
			}
			.content-view {
				margin: 0 4vw 6vh 4vw;
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
					padding: 0 3vw 5vh 3vw;
					text-align: left;
					// font-family: '微软雅黑';
					font-size: 40rpx;
					// font-weight: 600;
				}
				.close-btn{
					background: #FFEF6B;
					border-radius: 45rpx;
					width: 60vw;
					margin-top: -4vh;
					position: absolute;
					margin-left: 18vw;
					box-shadow: 0rpx 15rpx 0rpx #BDB258;
					.icon {
					  font-size: 26px;
					  vertical-align:middle;
					}
				}
			}
		}
	
		.title{
			height:50upx;
			line-height: 50upx;
			font-size: 16px;
			padding: 2vh 2vw;
			background-color: #ECECEC;
		}
		.mycanvas{
			width: 90vw;
			height: calc(80vh - 200upx);
			background-color: #FFF;
		}
		.footer{
			font-size: 16px;
			height: 150upx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			background-color: #ECECEC;
		}
		.left,.right{
			line-height: 100upx;
			height: 100upx;
			width: 250upx;
			text-align: center;
			font-weight: bold;
			color: white;
			border-radius: 5upx;
		}
		.left{
			background: #007AFF;
		}
		.right{
			background:orange;
		}
	}	
</style>
