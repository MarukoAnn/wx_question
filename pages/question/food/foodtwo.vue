<template>
	<view class="foodBody">
		<scroll-view class="question-content" scroll-y="true" :scroll-top="scrollTop" @scroll="scroll" :scroll-into-view="showItem" > 
			<view class="question-title-image">
				<view style="position: absolute;color:#fff;top:10vh;right:10vw;width: 46vw;text-align: center;">
						<text style="letter-spacing: 2px;font-size: 20px;">饮食问卷</text>
				</view>
				<image src="https://www.softcasing.com/images/view/ic_cs_title.png" mode=""></image>
			</view>
			<view class="question-title">
				<!-- 头部标题 -->
					<view class="progress-bar">
						<view class="bar">
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
					<view class="questions-select-contion" >
						<view class="question-list">
								<!-- <input type="text" value=""  :focus="setfocs" style="width: 10vw;"/> -->
								<view class="question">
									<text style="font-size: 1.2rem;display: inline-block;padding: 1vh 0;">{{question.title}}</text>
									<view style="font-size: 26rpx">
										<view>
											<text style="color: #434343;font-size: 28rpx;margin-top: 1vh;letter-spacing: 1px;" v-for="(item, index) in question.subscript.title" :key="index">
												<text v-if="item.type === 0">
													{{item.text}}
												</text>
												<text v-if="item.type === 1" style="font-weight: 600;color: #FA8E74">
													{{item.text}}
												</text>
												<text v-if="item.type === 2" style="font-weight: 600;color: red">
													{{item.text}}
												</text>
											</text>
										</view>
										<view>
											<image v-if="question.subscript.image" :src="question.subscript.image" style="margin-top: 4px; width: 100%; height: 130px; border-radius: 5px"></image>
										</view>
									</view>
									<!-- 填空单选 -->
									<view v-if="question.type === 1">
										<!-- 标题 -->
									<!-- 	<view class="title"  v-if="question.label" >
											<van-cell v-for="text in question.label" :key="text.text">
												<text>{{text.text}}</text>
												<input v-if="text.input === 1" type="text" value="" style="vertical-align:middle; color: #5AA5F7; margin: 1vh 1vw;padding: 1vh 3vw; display: inline-block; width:15vw; background: #F7F7F7;border-radius: 5px"/>
											</van-cell>
										</view> -->
										<view class="select-item" :style="{border: '1px solid' + item.b_itemBgc, background: item.itemBgc}" v-for="item in question.selectList" :key="item.label" @click="selectCheckItem(item)" :id="item.focus">
											<text class="select-rand" :style="{border: '1px solid' + item.b_checkbcg}">
											</text>
											<van-icon class="select-icon" name="success" color="#96D0FF" v-if="item.i_hidden==='true'" />
											<text :style="{color: item.f_color}"> {{item.label}}</text>
										</view>
									</view>
									<!-- 填空多选 -->
									<view v-if="question.type === 2">
											<view class="item-image" :style="{background: item.color.itemBgc}"  v-for="(item, index) in question.itemSelcet" :key="index" :id="item.focus">
													<!-- 小标题 -->
													<view v-if="item.type === 'title'">
														<view class="select-item" :style="{background: item.color.itemTitleBgc}">
															<text style="color: #fff;">{{item.text_title}}</text>
														</view>
														<view v-if="item.scr_hidden">
															<view v-if="item.help.showhelpText === 'true'" style="background: #FBFDFF; border-radius: 10px; position: relative;padding: 1vh 3.2vw;width: 71vw;margin: 16px 2vw;">
																<view style="font-size: 13px;color:#434343">
																	<text v-for="(textsr_item, index) in item.text_scr" :key="index">
																		<text v-if="textsr_item.type === 0">
																				{{textsr_item.text}}
																		</text>
																		<text v-if="textsr_item.type === 1" style="color: #FA8E74">
																			{{textsr_item.text}}
																		</text>
																	</text>
																</view>
																<image v-for="(itemUrl, intem_index) in item.imageList" :src="itemUrl" :key="intem_index" style="margin-top: 4px; width: calc(100%); height: 160px; border-radius: 5px"></image>
															</view>
														</view>
													</view>
													<!-- 选项 -->
													<view v-if="item.type !== 'title'">
														<!-- A、B、C选项 -->
														<view class="select-item" :style="{background: item.color.itemTitleBgc}">
															<van-cell v-for="(textitem, index1) in item.label" :key="index1" style="display: inline-block;">
																<!-- 填空 -->
																<van-cell >
																	<text style="color: #fff">{{textitem.b_text}}</text>
																	<input v-if="textitem.input === 1" :type="textitem.input_type" :value="textitem.value" @blur="setInputValue($event, item, index1)" style="vertical-align:middle; color: #5AA5F7; margin: 1vh 3vw;padding: 1vh 3vw; display: inline-block; width:15vw; background: #F7F7F7;border-radius: 5px"/>
																	<text style="color: #fff">{{textitem.a_text}}</text>
																	<van-cell v-if="textitem.select.length !== 0" style="color: #fff;">
																		<text style="margin-right: 4px;">（</text>
																		<view :style="{display: 'inline-block', color: radioitem.color.fontcolor}" 
																		v-for="(radioitem, index2) in  textitem.select" :key="index2" @click="radioChange(textitem.select, radioitem)">
																			<text style="display: inline-block;width: 20px;" v-if="index2 !== 0"></text>
																			<view :style="{display: 'inline-block',width: '8px', height: '8px', borderRadius: '50%', border: '1px solid' + radioitem.color.borderColor, position: 'relative'}">
																				 <view :style="{display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', background: radioitem.color.r_bgc, position: 'absolute', top: '2px',left: '2px'}"></view>
																			</view>
																			<text style="margin-left: 4px;padding: 0 4px 0 0;display: inline-block;">{{radioitem.text}}</text>
																		</view>
																		<text>）</text>
																	</van-cell>
																	<text style="color: #fff">{{textitem.text}}</text>
																</van-cell>
															</van-cell>
														</view>
														<!-- 选项内容 -->
														<view class="select-image" v-if="item.questionjson.length !== 0">
															<view v-if="item.scr_hidden" style="display: flex;justify-content: space-between;padding: 0 5vw 0 2vw;" >
																<text>每次食用量等级为</text>
																<text style="margin-top: 2px; font-size: 12px; color: #8ECDFF;"  @click = "helpClick(item)">填写说明</text>
															</view>
															<view v-if="item.scr_hidden">
																<view v-if="item.help.showhelpText === 'true'" style="background: #FBFDFF; border-radius: 10px; position: relative;padding: 1vh 3.2vw;width: 71vw;margin: 16px 2vw;">
																	<image style="width: 20px;height: 20px;position: absolute;right: 4vw;top:-1.2vh" src="../../../static/image/ic_up.png"></image>
																	<view style="font-size: 13px;color: #434343">
																		<text v-for="(textsr_item, text_index) in item.text_scr" :key="text_index">
																			<text v-if="textsr_item.type === 0">
																					{{textsr_item.text}}
																			</text>
																			<text v-if="textsr_item.type === 1" style="color: #FA8E74;">
																				{{textsr_item.text}}
																			</text>
																		</text>
																	</view>
																	<view v-if="item.imgUrl"> 
																		<image v-for="(imgItemUrl, img_index) in item.imgUrl" :key="img_index" :src="imgItemUrl" style="margin-top: 4px; width: calc(100%); height: 160px; border-radius: 5px"></image>
																	</view>
																</view>
															</view>
															<!-- 选项里面的单选 -->
															<view class="select-check">
																<van-row>
																	<view class="select-check-item" v-for="checkItem in item.questionjson" :key="checkItem.label"  @click="selcetChcek(item, checkItem)" :style="{border: '1px solid' + checkItem.color.t_borBgc, background: checkItem.color.bgc}">
																		<!-- 圆圈 -->
																		<text class="check-icon" :style="{background: checkItem.color.t_iconBgc}">
																			<text class="check-icon-point" :style="{background: checkItem.color.t_innericonBgc}"></text>
																		</text>
																		<text class="check-text" :style="{color: checkItem.color.ftcolor}">{{checkItem.label}}</text>
																	</view>
																</van-row>
															</view>
															<!-- 错误显示 -->
														</view>
														<!-- 没有选项的 -->
														<view class="select-image" v-if="item.questionjson.length === 0">
															<view v-if="item.scr_hidden" style="display: flex;justify-content: space-between;padding: 0 5vw 0 2vw;" >
																<text></text>
																<text style="margin-top: 2px; font-size: 12px; color: #8ECDFF;"  @click = "helpClick(item)">填写说明</text>
															</view>
															<view v-if="item.scr_hidden">
																<view v-if="item.help.showhelpText === 'true'" style="background: #FBFDFF; border-radius: 10px; position: relative;padding: 1vh 3.2vw;width: 71vw;margin: 16px 2vw;">
																	<image style="width: 20px;height: 20px;position: absolute;right: 4vw;top:-1.2vh" src="../../../static/image/ic_up.png"></image>
																	<view style="font-size: 13px;color:#434343">
																		<view v-for="(textsr_item, textsr_index) in  item.text_scr" :key="textsr_index">
																	       <text v-if="textsr_item.type === 0">
																	       		{{textsr_item.text}}
																	       </text>
																	       <text v-if="textsr_item.type === 1" style="color: #FA8E74">
																	       	{{textsr_item.text}}
																	       </text>
																		</view>
																	</view>
																	<view v-if="item.imgUrl">
																		<image v-for="(imgItemUrl, imgItemUrl_index) in item.imgUrl" :key="imgItemUrl_index" :src="imgItemUrl" style="margin-top: 4px; width: calc(100%); height: 160px; border-radius: 5px"></image>
																	</view>
																</view>
															</view>
														</view>
														<view class="error-tip" v-if="item.error==='true'">
															<image src="../../../static/image/ic_tiptoop.png" mode=""></image>
															<text>还有这一题没有回答哦</text>
														</view>
													</view>
											</view>
									</view>

								</view>

								<!-- 上下一题的按钮 -->
							<view class="question-btn">
								<button class="close-btn" @click="backQuestion"><van-icon name="arrow-left" class="icon" /><text>上一题</text></button>
								<button class="close-btn" @click="nextQuestion"><text>{{nextText}}</text><van-icon name="arrow" class="icon" /></button>
							</view>
						</view>
					</view>
			</view>
			<!-- 撑底部 -->
			<view style="width: 100vw;height: 2vh;"></view>
		</scroll-view>
<!-- 		<view style="width: 100vw;height: 3vh;"></view> -->
	</view>
</template>

<script>
	import utils from '../../../util/area.js'
	export default {
		data() {
			return {
				// 样式
				total: null,
				num: 9.6,
				nowNum: 1,
				question:'',
				flag: 0,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				subNum: 0,
				passflag: '',
				questionData: '',
				nextText: '下一题',
				showItem: '',
				answer: [],
				a: true,
				family: [],
		  }
		},
		created(){
			this.questionData = require('../../../util/food.json');
			this.question = this.questionData[this.flag];
			this.total =this.questionData.length;
		},
		methods: {
			// 选择数据
			selectItem: function(item){
				if(item.i_hidden === 'false') {
					item.i_hidden = 'true';
				    item.itemBgc  = '#8ECDFF';
					item.b_itemBgc = '#8ECDFF';
					item.b_checkbcg = '#fff';
					item.f_color = '#fff';
				}else{
					item.i_hidden = 'false';
					item.itemBgc  = '#fff';
					item.b_itemBgc = '#E2E2E2';
					item.b_checkbcg = '#E2E2E2';
					item.f_color = '#000';
				}
			},
			// 重绘题目界面
			rebuileComponents() {
			  // 销毁子标签
			  this.a = false;
			  // 重新创建子标签
			  this.$nextTick(() => {
				this.a = true;
			  });
			},
			// 设置滚动到指定位置
			scroll: function(e) {
			     this.old.scrollTop = e.detail.scrollTop
			  },
			  // 单选按钮
			radioChange: function(item, radioItem){
				item.forEach( v => {
					v.color.fontcolor = '#fff';
					v.color.borderColor = '#fff';
					v.color.r_bgc = '#8ECDFF';
					v.status = 0;
				})
				radioItem.color.fontcolor = '#DF2203';
				radioItem.color.borderColor = '#DF2203';
				radioItem.color.r_bgc = '#DF2203';
				radioItem.status = 1;
			},
			// 下一题
			nextQuestion: function(e){
	            // 判断填空多选的是否选择
				// if(this.subNum === 0){
				// 	this.spliceSelectAndInputValue();
				// }
				// 判断填空多选的是否选择
				if(this.question.type === 2){
					this.question.itemSelcet.forEach(v => {
						// 判断是否有填空题未填
						// console.log(v.label.some(val =>{
						// 	return (val.input ===1 && val.value === '')
						// }))
						if(v.status === 1) {
						}else {
							// 判断填空是否有未填的
							if(!v.label.some(val => {
								return (val.type === '1' && val.value === '0')
							})){
								if(!v.label.some(val => {
									return (val.type === '1' && val.value !== '' && val.value !== '0')
								})){
									if(!v.label.some(vl => {
											return ( vl.input === 1 && (vl.value === '' || vl.value === null))
										})) {
											if(v.questionjson.length !== 0){
												// 判断是否有单选题未选
												
												if(v.questionjson.some(valItem => {
													return (valItem.status !== 0)
												})){
													v.status = 1;
												}else{
													v.status = 0;
												}
											}else{
												v.status = 1;
											}
									
										}else{
											v.status = 0;
										}
								}else {
									if(!v.label.some(vl => {
											return ( vl.input === 1 && (vl.value === '' || vl.value === null))
										})) {
											if(v.questionjson.length !== 0){
												// 判断是否有单选题未选
												
												if(v.questionjson.some(valItem => {
													return (valItem.status !== 0)
												})){
													v.status = 1;
												}else{
													v.status = 0;
												}
											}else{
												v.status = 1;
											}
										}
								}
							}else {
								// 否则判断是否有类型为1的值为0
								if(!v.label.some(vl => {
									return ( vl.input === 1 && vl.value === '')
								})) {
									v.status = 1;
								}else {
									// 否则判断是有单选未选
									if(v.questionjson.length !== 0){
										// 判断是否有单选题未选
										
										if(v.questionjson.some(valItem => {
											return (valItem.status !== 0)
										})){
											v.status = 1;
										}else{
											v.status = 0;
										}
									}else{
										v.status = 1;
									}
								}
							}
						}
					
					});
					this.passflag =  this.question.itemSelcet.some(val=> {
						return val.status === 0
					})
				}else {
					this.passflag =  this.question.selectList.every( val=> {
						return (val.status !== 1)
					})
				}
				this.flagfocus = 0;
				if(this.passflag){
					uni.showToast({
						title: '您有选项未选择',
						icon: 'none',
						duration: 2000
					});
					if(this.question.type === 2){
						this.question.itemSelcet.forEach(v=> {
							if(v.status === 0) {
							v.error = 'true';
							v.color.itemBgc = "#FFCECE"
							v.color.itemTitleBgc = "#FFA2A2"
							if(this.flagfocus === 0){
								this.showItem = v.focus;
								this.flagfocus = 1;
							}
							
						}
					});
					}else {
					  this.question.selectList.forEach(v=> {
							if(this.flagfocus === 0){
								this.showItem = v.focus;
								this.flagfocus = 1;
							}
							v.b_itemBgc = '#FFA2A2';
							v.itemBgc = '#FFA2A2';
							v.b_checkbcg = '#fff';
						    v.f_color = '#fff';
					  });
					}
				}else {
					// 判断数据已填写或者选择
					if(this.nextText !== '提交'){
                        this.rebuileComponents();
						this.flag += 1;
						this.nowNum = this.nowNum + 1;
						this.num = 100 / this.total * this.nowNum;
						if(this.flag <= this.questionData.length -2){
							this.setScroll();
							this.question =  this.questionData[this.flag];
						}else {
							this.nextText = '提交';
							this.num = 100;
							this.setScroll();
							this.question =  this.questionData[this.flag];
						}
					} else {
							if(this.subNum === 0 ){
								this.spliceSelectAndInputValue();
							}
							let child_id = uni.getStorageSync('child_id');
							uni.showLoading({
								title: '加载中'
							});
							let that = this;
							uni.request({
								url: utils.env + '/Home/Report/addReportFamily', //仅为示例，并非真实接口地址。
								data: {
								   child_id:  child_id,
								   answer: this.answer,
								   family: this.family
								},
								method: 'POST',
								header: {
									'custom-header': 'application/json' //自定义请求头信息
								},
								success: function (res) {
									that.subNum = 0;
									uni.hideLoading();
									if(res.data.status === '1000'){
										uni.showToast({
											title: '请求成功',
											duration: 2000
										});
										uni.redirectTo({
											url: "../../score/success"
										})
									}else{
										uni.showToast({
											title: res.data.msg,
											duration: 2000,
											icon: 'none'
										});
									}
								},	
								fail: function(e) {
									that.subNum = 0;
									uni.showToast({
										title: '请求失败，请检查网络',
										duration: 2000,
										icon: 'none'
									});
								}
							});
				 }
			  }
			},
			// 上一题
			backQuestion: function(){
				if(this.flag === 0) {
					console.log(this.flag)
					uni.navigateBack()
				}else{
					this.rebuileComponents();
					this.flag -= 1;
					this.nowNum = this.nowNum - 1;
					this.num = 100 / this.total * this.nowNum;
					this.nextText = '下一题';
					this.question = this.questionData[this.flag]
				}
				
			},
			// 填空
			setInputValue: function(e, item, index){
				item.label[index].value = e.detail.value;
				// console.log(item.label)
				if(!item.label.some(val => {
					return (val.type === '1' && val.value === '0')
				})){
					if(!item.label.some(v => {
						return (v.type === '1' && v.value !== '' && v.value !== '0' )
					})){
						if(!item.label.some(value => {
							return (value.input === 1 && value.value === '')
						})){
							item.color.itemBgc ='#E8F5FF';
							item.color.itemTitleBgc ='#8ECDFF'
							item.error = 'false';
						}
						// 否则判断是否有类型为1的值为0
						}else {
							
							if(item.label.some(value => {
								return (value.input === 1 && value.value === '')
							})){
								item.color.itemBgc ='#E8F5FF';
								item.color.itemTitleBgc ='#8ECDFF'
								item.error = 'false';
							}else{
								if(item.questionjson.length === 0){
									item.color.itemBgc ='#E8F5FF';
									item.color.itemTitleBgc ='#8ECDFF'
									item.error = 'false';
								}else {
									if(item.questionjson.some(valItem => {
										return (valItem.status !== 0)
									})){
										item.color.itemBgc ='#E8F5FF';
										item.color.itemTitleBgc ='#8ECDFF'
										item.error = 'false';
									}
								}
							}
						}
				}else{
					item.color.itemBgc ='#E8F5FF';
					item.color.itemTitleBgc ='#8ECDFF'
					item.error = 'false';
				}
			},
			// 选择等级
			selcetChcek: function(item, data) {
				if(!item.label.some(val =>{
					return (val.input ===1 && val.value === '')
				})){
					item.color.itemBgc ='#E8F5FF';
					item.color.itemTitleBgc ='#8ECDFF'
					item.error = 'false';
				}
				item.questionjson.forEach( v=> {
					v.color.ftcolor = '#000';
					v.color.t_iconBgc = '#707070';
					v.color.t_innericonBgc = '#FFFFFF';
					v.color.t_borBgc = '#DADBDC';
					v.color.bgc = '#E8F5FF';
					v.status = 0;
				})
				data.color.ftcolor = '#fff';
				data.color.t_iconBgc = '#fff';
				data.color.bgc = '#5CB7FF';
				data.color.t_innericonBgc = '#5CB7FF';
				data.color.t_borBgc = '#5CB7FF'
				data.status = 1;
				data.error = 'false';
			},
			// 请求帮助
			helpClick: function(item) {
				if	( item.help.showhelpText === 'false'){
					item.help.showhelpText = 'true';
					item.help.imgurl = '../../../static/image/ic_show.png'
				}else {
					item.help.showhelpText = 'false';
					item.help.imgurl = '../../../static/image/ic_help.png'
				}

			},
			// 填空多选的选择项
			selectCheckItem: function(item){
				this.question.selectList.forEach(v => {
					if(v.status === 0){
						v.b_itemBgc = '#E2E2E2';
						v.itemBgc  = '#fff';
						v.b_checkbcg = '#E2E2E2';
						v.f_color = '#000';
					}
				})
				if(item.i_hidden === 'false') {
					item.i_hidden = 'true';
				    item.itemBgc  = '#8ECDFF';
					item.b_itemBgc = '#8ECDFF';
					item.b_checkbcg = '#fff';
					item.f_color = '#fff';
					item.status = 1;
				}else{
					item.i_hidden = 'false';
					item.itemBgc  = '#fff';
					item.b_itemBgc = '#E2E2E2';
					item.b_checkbcg = '#E2E2E2';
					item.f_color = '#000';
					item.status = 0;
				}
			},
			setScroll: function(e) {
				this.scrollTop = this.old.scrollTop
					this.$nextTick(function() {
						this.scrollTop = 0
					});
			},
			// 计算填空题
			spliceSelectAndInputValue: function(){
				this.subNum = 1;
				this.family = [];
				this.answer = [];
				// delete require.cache[require.resolve('../../../util/food.json')]
				// const question_list = require('../../../util/food.json')
				// console.log(question_list.splice(0, 2))
				this.questionData.splice(0, 2).forEach(V => {
					if(V.type === 2) {
						V.itemSelcet.forEach(val => {
							// 判断填空题
							val.label.forEach(v => {
								// 获取填空的值
								if(v.input === 1){
									this.family.push(v.value)
								}
							})
						})
					}else{
					// 多选题
					    let arr = [];
						V.selectList.forEach((vitem, index) => {
							if(vitem.status === 1){
								arr.push(index)
							}
						})
						this.family.push(arr)
					}
				})
				console.log(this.family);
				let quitList = [];
				this.questionData.forEach(item => {
					let list = []
					// console.log(item)
					// 填空题
					if(item.type === 2) {
						if(item.title === '四、水果类'){
							if(item.flag === 'flag'){
								let arr = []
								arr.push(item.flag)
								quitList.unshift(arr)
							}
							item.itemSelcet.forEach(val => {
								let arr =[]
								// 判断填空题
								if(val.type !== 'title'){
									val.label.forEach(v => {
										if(v.input === 1){
											arr.push(v.value)
										}
										if(v.select.length !== 0){
											v.select.forEach(v_label => {
												if(v_label.status === 1){
													arr.push(v_label.text === '周'? 0: 1)
												}
											})
										}
									})
									// 判断填空题中的单选
									if(val.label.length !== 0) {
										if(val.questionjson.length !== 0){
											val.questionjson.forEach(vitem => {
												if(vitem.status === 1){
													arr.push(vitem.label.toString())
												}
											})
										}
									}
									if(val.type!==undefined){
										arr.push(val.type)
									}
									if(val.label.length !== 0){
										quitList.push(arr);
									}
								}	
							})
							
						}else{
						  if(quitList.length !== 0){
							  this.answer.push(quitList);
							  quitList = [];
							  let a = []
							  a.push(item.flag)
							  list.unshift(a)
							  item.itemSelcet.forEach(val => {
							  let arr = [];
								if(val.type !== 'title'){
									// 判断填空题
									val.label.forEach(v => {
										if(v.input === 1){
											arr.push(v.value)
										}
										if(v.select.length !== 0){
											v.select.forEach(v_label => {
												if(v_label.status === 1){
													arr.push(v_label.text === '周'? 0: 1)
												}
											})
										}
									})
									// 判断填空题中的单选
									if(val.label.length !== 0) {
										if(val.questionjson.length !== 0){
											val.questionjson.forEach(vitem => {
												if(vitem.status === 1){
													arr.push(vitem.label.toString())
												}
											})
										}
									}
									if(val.type!==undefined){
										arr.push(val.type)
									}
									if(val.flag!==undefined){
										arr.push(val.flag)
									}
									if(arr.length !== 0){
										list.push(arr)
									}
								}
							})
							
						  }else{
							let a = []
							a.push(item.flag)
							list.unshift(a)
							if(item.flag === 'final'){
								  console.log(item.flag)
								  item.itemSelcet.forEach(val => {
										if(val.type !== 'title'){
											// 判断填空题
											val.label.forEach(v => {
												if(v.input === 1){
													let sarr = [];
													sarr.push(v.value);
													list.push(sarr)
												}
											})
										}
									})
							}else{
								item.itemSelcet.forEach(val => {
								  let arr = [];
									if(val.type !== 'title') {
										// 判断填空题
										val.label.forEach(v => {
											if(v.input === 1){
												arr.push(v.value)
											}
											if(v.select.length !== 0){
												v.select.forEach(v_label => {
													if(v_label.status === 1){
														arr.push(v_label.text === '周'? 0: 1)
													}
												})
											}
										})
										// 判断填空题中的单选
										if(val.label.length !== 0) {
											if(val.questionjson.length !== 0){
												val.questionjson.forEach(vitem => {
													if(vitem.status === 1){
														arr.push(vitem.label.toString())
													}
												})
											}
										}
										if(val.type!==undefined){
											arr.push(val.type)
										}
										if(val.flag!==undefined){
											arr.push(val.flag)
										}
										if(arr.length !== 0){
											list.push(arr)
										}
									}
								})						
							}
						
						  }
						    this.answer.push(list);
						}
					}
				})
			}
	},

}
</script>

<style lang='scss'>
	.foodBody {
		width: 100vw;
		height: 100vh;
		background: #FA8E74;
		overflow: hidden;
		.question-content{
			width: 100vw;
			height: 100vh;
			.question-title-image{
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
					margin: 0 4vw;
					border-top-left-radius: 20rpx;
					border-top-right-radius: 20rpx;
					padding: 3vh 3vh 3vh 3vh;
					.bar{
						text-align: left;
						margin-top: 1vh;
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
					margin: -2px  auto;
					height: auto;
					padding-bottom: 8vh;
					/* margin-bottom: 6vh; */
					position: relative;
					border-bottom-left-radius: 20rpx;
					border-bottom-right-radius: 20rpx;
					.question-list {
						padding-top: 2vh;
						padding-left: 5vw;
						padding-right: 5vw;
						.question {
							/* 填空多选带单选 */
							/* margin: 2vh  0; */
						  .item-image {
								border-radius: 10rpx;
								padding: 0 0 2vh 0;
								select-item {
									margin-top: 2vh;
									margin-bottom: 4vh;
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
									img {
										width: 80vw;
										height: 20vh;
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
													position: absolute;
													left: 3px;
													top: 3px;
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
							    /* 错误提示的样式 */
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
							/* 填空多选 */
							.select-item {
								margin-top: 4vh;
								padding: 1vh 3vw;
								line-height: 25px;
								border-radius: 10rpx;
								position: relative;
								.select-rand{
									display: inline-block;
									width: 18px;
									height: 18px;
									margin-right: 4vw;
									background: #fff;
									border-radius: 3px;
								}
								.select-icon {
									position: absolute;
									z-index: 9999;
									left: 3.5vw;
									top: 10px;
								}
							}
						}
						.question-btn {
							width: 93%;
							bottom: -23px;
							position: absolute;
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
