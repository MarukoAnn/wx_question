(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/question/sexAge/question_asthma"],{"0e94":function(t,s,o){"use strict";(function(t){o("555d");e(o("66fd"));var s=e(o("37cf"));function e(t){return t&&t.__esModule?t:{default:t}}t(s.default)}).call(this,o("543d")["createPage"])},1267:function(t,s,o){},"37cf":function(t,s,o){"use strict";o.r(s);var e=o("5b98"),n=o("83d9");for(var i in n)"default"!==i&&function(t){o.d(s,t,(function(){return n[t]}))}(i);o("c15c");var l,c=o("f0c5"),u=Object(c["a"])(n["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],l);s["default"]=u.exports},"5b98":function(t,s,o){"use strict";var e;o.d(s,"b",(function(){return n})),o.d(s,"c",(function(){return i})),o.d(s,"a",(function(){return e}));var n=function(){var t=this,s=t.$createElement;t._self._c},i=[]},"83d9":function(t,s,o){"use strict";o.r(s);var e=o("8bee"),n=o.n(e);for(var i in e)"default"!==i&&function(t){o.d(s,t,(function(){return e[t]}))}(i);s["default"]=n.a},"8bee":function(t,s,o){"use strict";(function(t){Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;e(o("fe2a"));function e(t){return t&&t.__esModule?t:{default:t}}var n={data:function(){return{total:null,num:9.6,qestion:"",nowNum:1,nextlabel:"下一题",flag:0,questionjson:"",flagfocus:0,showItem:"",passflag:!1,scrollTop:0,old:{scrollTop:0},title:"",isdisease:[],a:!0}},created:function(){"3"===t.getStorageSync("age")?this.title="3~6岁儿童中医体质调查表":this.title="6~14岁儿童中医体质调查表",this.questionjson=o("cac7"),this.qestion=this.questionjson.question[this.flag]},methods:{selectItemData:function(t,s){console.log(s),"1"===t.type&&(1!==s.status?("false"===this.qestion.more&&this.qestion.select.forEach((function(t){t.color.fontColor="#000",t.color.iconBgc="#000",t.color.itemBgc="#F7F7F7",t.status=0})),s.status=1,s.color.fontColor="#fff",s.color.iconBgc="#fff",s.color.itemBgc="#8ECDFF"):(s.status=0,s.color.fontColor="#000",s.color.iconBgc="#000",s.color.itemBgc="#F7F7F7"))},scroll:function(t){this.old.scrollTop=t.detail.scrollTop},setScroll:function(t){this.scrollTop=this.old.scrollTop,console.log(this.scrollTop),this.$nextTick((function(){this.scrollTop=0}))},rebuileComponents:function(){var t=this;this.a=!1,this.$nextTick((function(){t.a=!0}))},nextQuestion:function(t){console.log(this.qestion),this.setNextStyle()},backQuestion:function(s){0!==this.flag?(this.rebuileComponents(),"提交"===this.nextlabel&&(this.nextlabel="下一题"),this.nowNum=this.nowNum-1,this.flag-=1,this.num=100/this.total*this.nowNum,this.qestion=this.questionjson.question[this.flag]):t.navigateBack({url:1})},setInputValue:function(t,s,o){s.label[o].value=t.detail.value,s.label.some((function(t){return""===t.value}))?s.status=0:s.status=1,1===s.status&&(s.color.itemBgc="#8ECDFF")},setNextStyle:function(){var s=this;"1"===this.qestion.type?this.passflag=this.qestion.select.some((function(t){return 1===t.status})):this.passflag=this.qestion.select.every((function(t){return 0!==t.status})),this.passflag?this.flag===this.questionjson.question.length-1?(console.log("提交"),this.setQuestionData(),t.setStorageSync("isdisease",this.isdisease),t.redirectTo({url:"./qusetionOne"})):(console.log(this.flag),0===this.flag?this.qestion.select.forEach((function(o){console.log(o),1===o.status&&("B"===o.focus?(t.setStorageSync("isdisease","0"),t.navigateTo({url:"./qusetionOne"})):(s.flag+=1,s.qestion=s.questionjson.question[s.flag]))})):(this.flag+1===this.questionjson.question.length-1&&(this.nextlabel="下一题"),this.flag+=1,this.qestion=this.questionjson.question[this.flag])):(t.showToast({title:"您有选项未填或者未选择",icon:"none",duration:2e3}),this.qestion.select.forEach((function(t){0===t.status&&("1"===s.qestion.type?(t.color.fontColor="#fff",t.color.iconBgc="#fff",t.color.itemBgc="#FFA2A2",0===s.flagfocus&&(s.showItem=t.focus,s.flagfocus=1)):t.color.itemBgc="#FFA2A2")})))},setQuestionData:function(){var t=this;this.questionjson.question.forEach((function(s){if("1"===s.type){var o=[];s.select.forEach((function(t,s){1===t.status&&o.push(s)})),t.isdisease.push(o)}else s.select.forEach((function(s){var o=[];s.label.forEach((function(t){o.push(t.value)})),o.push("asthma"),t.isdisease.push(o)}))}))}}};s.default=n}).call(this,o("543d")["default"])},c15c:function(t,s,o){"use strict";var e=o("1267"),n=o.n(e);n.a}},[["0e94","common/runtime","common/vendor"]]]);