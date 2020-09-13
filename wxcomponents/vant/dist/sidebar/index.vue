<template>
<uni-shadow-root class="vant-dist-sidebar-index"><view class="van-sidebar van-hairline--top-bottom custom-class">
  <slot></slot>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'vant/dist/sidebar/index'
import { VantComponent } from '../common/component';
VantComponent({
    relation: {
        name: 'sidebar-item',
        type: 'descendant',
        linked(target) {
            this.children.push(target);
            this.setActive(this.data.activeKey);
        },
        unlinked(target) {
            this.items = this.children.filter((item) => item !== target);
            this.setActive(this.data.activeKey);
        }
    },
    props: {
        activeKey: {
            type: Number,
            value: 0,
            observer: 'setActive'
        }
    },
    beforeCreate() {
        this.children = [];
        this.currentActive = -1;
    },
    methods: {
        setActive(activeKey) {
            const { children, currentActive } = this;
            if (!children.length) {
                return Promise.resolve();
            }
            this.currentActive = activeKey;
            const stack = [];
            if (currentActive !== activeKey && children[currentActive]) {
                stack.push(children[currentActive].setActive(false));
            }
            if (children[activeKey]) {
                stack.push(children[activeKey].setActive(true));
            }
            return Promise.all(stack);
        }
    }
});
export default global['__wxComponents']['vant/dist/sidebar/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-sidebar{width:85px;width:var(--sidebar-width,85px)}
</style>