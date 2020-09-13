<template>
<uni-shadow-root class="vant-dist-tab-index"><view v-if="shouldRender" :class="'custom-class '+(utils.bem('tab__pane', { active, inactive: !active }))">
  <slot></slot>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>

global['__wxRoute'] = 'vant/dist/tab/index'
import { VantComponent } from '../common/component';
VantComponent({
    relation: {
        name: 'tabs',
        type: 'ancestor',
        linked(target) {
            this.parent = target;
        },
        unlinked() {
            this.parent = null;
        }
    },
    props: {
        dot: Boolean,
        info: null,
        title: String,
        disabled: Boolean,
        titleStyle: String,
        name: {
            type: [Number, String],
            value: '',
        }
    },
    data: {
        active: false
    },
    watch: {
        title: 'update',
        disabled: 'update',
        dot: 'update',
        info: 'update',
        titleStyle: 'update'
    },
    methods: {
        getComputedName() {
            if (this.data.name !== '') {
                return this.data.name;
            }
            return this.index;
        },
        updateRender(active, parent) {
            const { data: parentData } = parent;
            this.inited = this.inited || active;
            this.setData({
                active,
                shouldRender: this.inited || !parentData.lazyRender
            });
        },
        update() {
            if (this.parent) {
                this.parent.updateTabs();
            }
        }
    }
});
export default global['__wxComponents']['vant/dist/tab/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.vant-dist-tab-index{-webkit-flex-shrink:0;flex-shrink:0;width:100%}.van-tab__pane,:host{box-sizing:border-box}.van-tab__pane{overflow-y:auto}.van-tab__pane--active{height:auto}.van-tab__pane--inactive{height:0;overflow:visible}
</style>