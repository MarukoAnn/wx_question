<template>
	<view class="loding">
		<view class="loader loader-4"></view>
		<view class="load_title">
			  <text>加载中...</text>
		</view>
	</view>
</template>
<script>
	var bmap = require('../../libs/bmap-wx.min.js'); 
	// import amap from '../../libs/amap-wx.js'
	export default {
	 data(){
		return {
		   city: '',
		   // key: 'bccaa20d03da08710888f0d6a3d2535a'
		}
	},
	methods:{
	},
	created: function() {//默认加载
	   var that = this;
	   var BMap = new bmap.BMapWX({ 
			ak: 'Hj6iYG5NRRx8PCt6W0XqXz40BEeL1xhY',
		});

		var success = function(data) {
			  console.log(data)
			  uni.setStorageSync('city', data.originalData.result.addressComponent.city);
			  console.log(that.city)
			  uni.redirectTo({
					url: '../select/selectAge'
				});
		} 
		 var fail = function(data) { 
				console.log(data);
				uni.redirectTo({
					url: '../select/selectAge'
				});
			};
		BMap.regeocoding({
		   fail: fail, 
		   success: success,
		});
	},
}
</script>

<style>
	.loding{
		background: #749AFB;
		width: 100vw;
		height: 100vh;
	}
      @media only screen and (max-width: 600px) {
      section { min-width: 350px; }
      }
      .loader { 
        position: absolute; 
        width: 60px; 
        height: 60px; 
        border-radius: 50%;
        margin: 75px; 
        display: inline-block; 
        vertical-align: middle;
        /* display: inline; */
        top: 25vh;
        left: 20vw;
      }
      .loader-4 { 
          border: 7px double #F5A250; 
          -webkit-animation: ball-turn 1s linear infinite; 
          animation: ball-turn 1s linear infinite;
       }
      .loader-4:before,  .loader-4:after { 
          content: ""; 
          position: absolute; 
          width: 17px; 
          height: 17px; 
          background: #FA642B; 
          border-radius: 50%; 
          bottom: 0; 
          right: 37px; 
        }
      .loader-4:after { 
          left: 37px;
          top: 0;
       }
      /*LOADER-2*/
     .load_title {
          font-family: 'Open Sans';
          color: #FFF;
          font-size: 20px;
          width: 100%;
          text-align: center;
          z-index: 9999;
          position: absolute;
          top: 55%;
          opacity: 1;
          line-height: 30px;
    }
    .load_title span {
          font-weight: normal;
          font-style: italic;
          font-size: 25px;
          color: #fff;
          opacity: 0.5;
          margin-left: 3vw;
          
    }
    @-webkit-keyframes dot-jump {
        0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        }
        100% {
        -webkit-transform: translateY(-15px);
        transform: translateY(-15px);
        }
    }
    @keyframes dot-jump {
        0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        }
        100% {
        -webkit-transform: translateY(-15px);
        transform: translateY(-15px);
        }
    }
    @-webkit-keyframes ball-turn {
        0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        }
        100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
        }
    }
    @keyframes ball-turn {
        0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        }
        100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
        }
    }

</style>
