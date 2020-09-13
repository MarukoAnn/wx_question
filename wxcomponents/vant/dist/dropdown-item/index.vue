<template>
<uni-shadow-root class="vant-dist-dropdown-item-index"><view v-if="showWrapper" :class="utils.bem('dropdown-item', direction)" :style="wrapperStyle">
  <van-popup :show="showPopup" custom-style="position: absolute;" overlay-style="position: absolute;" :overlay="overlay" :position="direction === 'down' ? 'top' : 'bottom'" :duration="transition ? duration : 0" :close-on-click-overlay="closeOnClickOverlay" @close="onClickOverlay">
    <van-cell v-for="(item,index) in (options)" :key="item.value" :data-option="item" :class="utils.bem('dropdown-item__option', { active: item.value === value } )" clickable :icon="item.icon" @click.native="onOptionTap">
      <view slot="title" class="van-dropdown-item__title" :style="item.value === value  ? 'color:' + activeColor : ''">
        {{ item.text }}
      </view>
      <van-icon v-if="item.value === value" name="success" class="van-dropdown-item__icon" :color="activeColor"></van-icon>
    </van-cell>

    <slot></slot>
  </van-popup>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>
import VanPopup from '../popup/index.vue'
import VanCell from '../cell/index.vue'
import VanIcon from '../icon/index.vue'
global['__wxVueOptions'] = {components:{'van-popup': VanPopup,'van-cell': VanCell,'van-icon': VanIcon}}

global['__wxRoute'] = 'vant/dist/dropdown-item/index'
import { VantComponent } from '../common/component';
VantComponent({
    field: true,
    relation: {
        name: 'dropdown-menu',
        type: 'ancestor',
        linked(target) {
            this.parent = target;
        },
        unlinked() {
            this.parent = null;
        }
    },
    props: {
        value: null,
        title: String,
        disabled: Boolean,
        titleClass: String,
        options: {
            type: Array,
            value: []
        }
    },
    data: {
        transition: true,
        showPopup: false,
        showWrapper: false,
        displayTitle: ''
    },
    created() {
        this.setData({ displayTitle: this.computedDisplayTitle(this.data.value) });
    },
    methods: {
        computedDisplayTitle(curValue) {
            const { title, options } = this.data;
            if (title) {
                return title;
            }
            const match = options.filter(option => option.value === curValue);
            const displayTitle = match.length ? match[0].text : '';
            return displayTitle;
        },
        onClickOverlay() {
            this.toggle();
            this.$emit('close');
        },
        onOptionTap(event) {
            let { value, displayTitle } = this.data;
            const { option } = event.currentTarget.dataset;
            const { value: optionValue } = option;
            if (optionValue !== value) {
                value = optionValue;
                displayTitle = this.computedDisplayTitle(optionValue);
                this.$emit('change', optionValue);
            }
            this.setData({ showPopup: false, value, displayTitle });
            const time = this.data.duration || 0;
            setTimeout(() => {
                this.setData({ showWrapper: false });
            }, time);
            // parent 中的 itemListData 是 children 上的数据的集合
            // 数据的更新由 children 各自维护，但是模板的更新需要额外触发 parent 的 setData
            this.parent.setData({ itemListData: this.parent.data.itemListData });
        },
        toggle() {
            const { childIndex } = this.data;
            this.parent.toggleItem(childIndex);
        }
    }
});
export default global['__wxComponents']['vant/dist/dropdown-item/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-dropdown-item{position:fixed;right:0;left:0;overflow:hidden}.van-dropdown-item__option{text-align:left}.van-dropdown-item__option--active .van-dropdown-item__icon,.van-dropdown-item__option--active .van-dropdown-item__title{color:#1989fa;color:var(--dropdown-menu-option-active-color,#1989fa)}.van-dropdown-item--up{top:0}.van-dropdown-item--down{bottom:0}.van-dropdown-item__icon{display:block;line-height:inherit}
</style>