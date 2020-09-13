<template>
<uni-shadow-root class="vant-dist-image-index"><view :class="'custom-class '+(utils.bem('image', { round }))" :style="style" @click="onClick">
  <image v-if="(!error)" class="image-class van-image__img" :mode="mode" :src="src" :lazy-load="lazyLoad" :show-menu-by-longpress="showMenuByLongpress" @load="onImageLoad" @error="onImageError"></image>

  <view v-if="loading && showLoading" class="loading-class van-image__loading">
    <slot v-if="useLoadingSlot" name="loading"></slot>
    <van-icon v-else name="photo-o" size="22"></van-icon>
  </view>
  <view v-if="error && showError" class="error-class van-image__error">
    <slot v-if="useErrorSlot" name="error"></slot>
    <van-icon v-else name="warning-o" size="22"></van-icon>
  </view>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>
import VanIcon from '../icon/index.vue'
import VanLoading from '../loading/index.vue'
global['__wxVueOptions'] = {components:{'van-icon': VanIcon,'van-loading': VanLoading}}

global['__wxRoute'] = 'vant/dist/image/index'
import { addUnit, isDef } from '../common/utils';
import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
VantComponent({
    mixins: [button, openType],
    classes: ['custom-class', 'loading-class', 'error-class', 'image-class'],
    props: {
        src: String,
        width: String,
        height: String,
        fit: {
            type: String,
            value: 'fill'
        },
        round: Boolean,
        lazyLoad: Boolean,
        showError: {
            type: Boolean,
            value: true
        },
        showLoading: {
            type: Boolean,
            value: true
        },
        showMenuByLongpress: Boolean,
        // 受小程序slot限制所需要的属性
        useLoadingSlot: Boolean,
        useErrorSlot: Boolean,
    },
    data: {
        fitWeapp: 'aspectFit',
        FIT_MODE_MAP: {
            contain: 'aspectFit',
            cover: 'aspectFill',
            fill: 'scaleToFill',
            none: 'center',
            // TODO: 这个没有原生的属性，需要后面实现，暂时先用contain;
            'scale-down': 'aspectFit'
        },
        loading: true,
        error: false
    },
    watch: {
        src() {
            this.setData({
                loading: true,
                error: false
            });
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            const { FIT_MODE_MAP, fit } = this.data;
            this.setData({
                mode: FIT_MODE_MAP[fit],
                style: this.getStyle(),
            });
        },
        getStyle() {
            const { width, height } = this.data;
            let style = '';
            if (isDef(width)) {
                style += `width: ${addUnit(width)};`;
            }
            if (isDef(height)) {
                style += `height: ${addUnit(height)};`;
            }
            return style;
        },
        onImageLoad(event) {
            this.setData({
                loading: false
            });
            this.$emit('load', event.detail);
        },
        onImageError(event) {
            this.setData({
                loading: false,
                error: true,
            });
            this.$emit('error', event.detail);
        },
        onClick(event) {
            this.$emit('click', event.detail);
        },
    }
});
export default global['__wxComponents']['vant/dist/image/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-image{position:relative;display:inline-block}.van-image--round{overflow:hidden;border-radius:50%}.van-image--round .van-image__img{border-radius:inherit}.van-image__error,.van-image__img,.van-image__loading{display:block;width:100%;height:100%}.van-image__error,.van-image__loading{position:absolute;top:0;left:0;display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;color:#969799;color:var(--image-placeholder-text-color,#969799);font-size:14px;font-size:var(--image-placeholder-font-size,14px);background-color:#f8f8f8;background-color:var(--image-placeholder-background-color,#f8f8f8)}
</style>