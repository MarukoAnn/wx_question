<template>
<uni-shadow-root class="vant-dist-dropdown-menu-index"><view class="van-dropdown-menu van-dropdown-menu--top-bottom">
  <view v-for="(item,index) in (itemListData)" :key="item.index" :data-item="item" :data-index="index" :class="utils.bem('dropdown-menu__item', { disabled: item.disabled })" @click="onTitleTap">
    <view :class="(item.titleClass)+' '+(utils.bem('dropdown-menu__title', { active: item.showPopup, down: item.showPopup === (direction === 'down') }))" :style="item.showPopup ? 'color:' + activeColor : ''">
      <view class="van-ellipsis">
        {{item.displayTitle}}
      </view>
    </view>
  </view>

  <slot></slot>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>

global['__wxRoute'] = 'vant/dist/dropdown-menu/index'
import { VantComponent } from '../common/component';
import { addUnit } from '../common/utils';
let ARRAY = [];
VantComponent({
    field: true,
    relation: {
        name: 'dropdown-item',
        type: 'descendant',
        linked(target) {
            this.children = this.children || [];
            // 透传 props 给 dropdown-item
            const { overlay, duration, activeColor, closeOnClickOverlay, direction } = this.data;
            this.updateChildData(target, {
                overlay,
                duration,
                activeColor,
                closeOnClickOverlay,
                direction,
                childIndex: this.children.length
            });
            this.children.push(target);
            // 收集 dorpdown-item 的 data 挂在 data 上
            target &&
                this.setData({
                    itemListData: this.data.itemListData.concat([target.data])
                });
        },
        unlinked(target) {
            this.children = this.children.filter((child) => child !== target);
        }
    },
    props: {
        activeColor: String,
        overlay: {
            type: Boolean,
            value: true
        },
        zIndex: {
            type: Number,
            value: 10
        },
        duration: {
            type: Number,
            value: 200
        },
        direction: {
            type: String,
            value: 'down'
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: true
        },
        closeOnClickOutside: {
            type: Boolean,
            value: true
        }
    },
    data: {
        itemListData: []
    },
    created() {
        ARRAY.push(this);
    },
    destroyed() {
        ARRAY = ARRAY.filter(item => item !== this);
    },
    methods: {
        updateChildData(childItem, newData, needRefreshList = false) {
            childItem.setData(newData);
            if (needRefreshList) {
                // dropdown-item data 更新，涉及到 title 的展示，触发模板更新
                this.setData({ itemListData: this.data.itemListData });
            }
        },
        toggleItem(active) {
            this.children.forEach((item, index) => {
                const { showPopup } = item.data;
                if (index === active) {
                    this.toggleChildItem(item);
                }
                else if (showPopup) {
                    this.toggleChildItem(item, false, { immediate: true });
                }
            });
        },
        toggleChildItem(childItem, show, options = {}) {
            const { showPopup, duration } = childItem.data;
            if (show === undefined)
                show = !showPopup;
            if (show === showPopup) {
                return;
            }
            const newChildData = { transition: !options.immediate, showPopup: show };
            if (!show) {
                const time = options.immediate ? 0 : duration;
                this.updateChildData(childItem, Object.assign({}, newChildData), true);
                setTimeout(() => {
                    this.updateChildData(childItem, { showWrapper: false }, true);
                }, time);
                return;
            }
            this.getChildWrapperStyle().then((wrapperStyle = '') => {
                this.updateChildData(childItem, Object.assign(Object.assign({}, newChildData), { wrapperStyle, showWrapper: true }), true);
            });
        },
        close() {
            this.children.forEach((item) => {
                this.toggleChildItem(item, false, { immediate: true });
            });
        },
        getChildWrapperStyle() {
            const { windowHeight } = wx.getSystemInfoSync();
            const { zIndex, direction } = this.data;
            let offset = 0;
            return this.getRect('.van-dropdown-menu').then(rect => {
                const { top = 0, bottom = 0 } = rect;
                if (direction === 'down') {
                    offset = bottom;
                }
                else {
                    offset = windowHeight - top;
                }
                let wrapperStyle = `z-index: ${zIndex};`;
                if (direction === 'down') {
                    wrapperStyle += `top: ${addUnit(offset)};`;
                }
                else {
                    wrapperStyle += `bottom: ${addUnit(offset)};`;
                }
                return Promise.resolve(wrapperStyle);
            });
        },
        onTitleTap(event) {
            // item ---> dropdown-item
            const { item, index } = event.currentTarget.dataset;
            if (!item.disabled) {
                // menuItem ---> dropdown-menu
                ARRAY.forEach(menuItem => {
                    if (menuItem && menuItem.data.closeOnClickOutside && menuItem !== this) {
                        menuItem.close();
                    }
                });
                this.toggleItem(index);
            }
        }
    }
});
export default global['__wxComponents']['vant/dist/dropdown-menu/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-dropdown-menu{display:-webkit-flex;display:flex;-webkit-user-select:none;user-select:none;height:50px;height:var(--dropdown-menu-height,50px);background-color:#fff;background-color:var(--dropdown-menu-background-color,#fff)}.van-dropdown-menu__item{display:-webkit-flex;display:flex;-webkit-flex:1;flex:1;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;min-width:0}.van-dropdown-menu__item:active{opacity:.7}.van-dropdown-menu__item--disabled:active{opacity:1}.van-dropdown-menu__item--disabled .van-dropdown-menu__title{color:#969799;color:var(--dropdown-menu-title-disabled-text-color,#969799)}.van-dropdown-menu__title{position:relative;box-sizing:border-box;max-width:100%;padding:0 8px;padding:var(--dropdown-menu-title-padding,0 8px);color:#323233;color:var(--dropdown-menu-title-text-color,#323233);font-size:15px;font-size:var(--dropdown-menu-title-font-size,15px);line-height:18px;line-height:var(--dropdown-menu-title-line-height,18px)}.van-dropdown-menu__title:after{position:absolute;top:50%;right:-4px;margin-top:-5px;border-color:transparent transparent currentcolor currentcolor;border-style:solid;border-width:3px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);opacity:.8;content:""}.van-dropdown-menu__title--active{color:#1989fa;color:var(--dropdown-menu-title-active-text-color,#1989fa)}.van-dropdown-menu__title--down:after{margin-top:-1px;-webkit-transform:rotate(135deg);transform:rotate(135deg)}
</style>