<template>
	<view class="food_body">
		<view class="food-content">
		  <view class="content">
		  	<view class="title-image">
		  		<view style="position: absolute;color:#fff;top:8.4vh;right:10vw;width: 46vw;text-align: center;">
		  				<text style="font-size: 1.2rem;">{{title}}</text>
		  		</view>
		  		<image src="https://www.softcasing.com/images/view/ic_basic_title.png" mode=""></image>
		  	</view>
		  	<view class="content-view">
		  	   <view class="subcript-test">
		  			 <text style="display: block;">尊敬的家长:</text>
		  			<text style="text-indent: 2em;display: inline-block;line-height: 5vh;white-space: 2rem;" v-for="(item, index) in sub_description" :key="index">
						{{item}}
					</text>
		  		    <!-- <view classs="precautions-content"  
		  			style="background: #FEE8E3;color: #E58483;padding: 2vh 3vw;border-radius: 10px;margin-top: 2vh;">
		  				<text style="display: block;font-size: 15px;">注意事项：</text>
		  				<text style="display: block;font-size: 14px;line-height: 3.5vh;">1、若孩子曾明确诊断为哮喘，且您在孩子哮喘发病后曾调整过孩子的饮食结构，请填写孩子发病前的饮食情况；若孩子曾明确诊断为哮喘，未调整过饮食结构，请填写孩子平时的饮食情况；若未患哮喘则填写平时饮食情况即可。</text>
		  				<text style="display: block;font-size: 14px;line-height: 3.5vh;">2、请您根据孩子自身情况，结合每类食物相应的参考图片，对孩子的食物情况进行食用次数的填写及食用量的等级评估。请根据您孩子平时饮食的实际情况，填写下列问题。</text>
		  			</view> -->
					<view v-for="(itemtext, index) in opinionList" :key=index>
						<text style="text-indent: 2em;display: inline-block;">
							{{itemtext.text}}
						</text>
						<van-radio-group :value="itemtext.radio" @change="onchange($event, opinionList, index)" style="display: flex;justify-content: space-between;padding: 2vh 10vw;">
						  <van-radio name="1" icon-size="25px" shape="shape" style="display: inline-block;padding: 1vw;">同意</van-radio>
						  <van-radio name="2" icon-size="25px" shape="shape" style="display: inline-block;">不同意</van-radio>
						</van-radio-group>
					</view>
		  		</view>
		  		<button class="close-btn" :disabled="btn_disble" @click="nextPage">开始填写</text><van-icon name="arrow" class="icon" /></button>
		  	</view>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				title: '儿童饮食问卷',
				sub_text: ['您好,特应性（过敏性）体质儿童，中医认为存在着气血阴阳的相对不平衡，因此容易发生过敏性疾病疾病，如支气管哮喘、过敏性鼻炎等。该体质的形成除与先天遗传因素有关外，与后天因素如饮食营养、生活起居、精神情志、环境、疾病与药物因素也密切相关。现鉴于您孩子目前的体质特点，我们邀请您继续填写饮食问卷，通过本研究，期望在将来发布适合各种体质类型的儿童饮食指导建议，从生活饮食方面预防特异性体质儿童或有过敏性家族史的儿童发展为哮喘，并希望能够减少哮喘儿童的发病次数、减轻发作程度。',
				'本研究不需要任何费用，回答本调查问卷可能会占用您一些时间。',
				'您孩子的调查记录将保存在医院，您及孩子的个人身份信息绝对保密，任何有关本项研究结果的公开报告将不会披露您的个人身份。参加本项研究是完全自愿的，您可以拒绝参加此项研究。'
				],
				sub_text2: [
					'您好,特应性（过敏性）体质儿童，中医认为存在着气血阴阳的相对不平衡，因此容易发生过敏性疾病疾病，如支气管哮喘、过敏性鼻炎等。该体质的形成除与先天遗传因素有关外，与后天因素如饮食营养、生活起居、精神情志、环境、疾病与药物因素也密切相关。现鉴于您孩子目前的体质特点，我们邀请您继续填写饮食问卷，通过本研究，期望在将来发布适合各种体质类型的儿童饮食指导建议，从生活饮食方面预防特异性体质儿童或有过敏性家族史的儿童发展为哮喘，并希望能够减少哮喘儿童的发病次数、减轻发作程度。',
					'本研究不需要任何费用，回答本调查问卷可能会占用您一些时间。',
					'您孩子的调查记录将保存在医院，您及孩子的个人身份信息绝对保密，任何有关本项研究结果的公开报告将不会披露您的个人身份。参加本项研究是完全自愿的，您可以拒绝参加此项研究。'
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
				btn_disble: true,
				isAge: 0
			
			}
		},
		methods: {
			nextPage: function(){
				delete require.cache[require.resolve('../../../util/food.json')]
				uni.navigateTo({
					url:'./foodtwo'
				})
			},
			onchange: function(event, option, index) {
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
		onLoad() {
			if(uni.getStorageSync('age') === '3'){
				this.title = '3~6岁儿童饮食问卷';
				this.opinionList = this.sub_option;
				this.sub_description = this.sub_text;
			}else {
				this.title = '6~14岁儿童饮食问卷';
				this.opinionList = this.sub_option2;
				this.sub_description = this.sub_text2;
			}
		}
	}
</script>

<style lang="scss">
	.food_body {
		height: 100vh;
		width: 100vw;
		background: #FA8E74;
		overflow: hidden;
		.food-content {
			width: 100vw;
			height: 100vh;
			overflow: scroll;
			// position: relative;
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
	}
</style>
