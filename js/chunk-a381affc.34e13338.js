(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a381affc"],{"70e6":function(e,t,n){"use strict";n.r(t);var a=n("7a23"),r={class:"orderSuccess gap-4"};function c(e,t,n,c,u,o){return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",r,[Object(a["createElementVNode"])("h2",null,Object(a["toDisplayString"])(c.pageTitle),1),Object(a["createElementVNode"])("p",null,Object(a["toDisplayString"])(c.pageTxt),1)])}var u=n("1da1"),o=(n("96cf"),n("6c02")),s=n("afe6"),l=n("f606"),i={setup:function(){var e=Object(o["c"])(),t=Object(o["d"])(),n=Object(s["a"])(),r=Object(l["a"])(),c=Object(a["ref"])("查詢訂單中"),i=Object(a["ref"])("正在為您處理，請等待片刻~"),p=Object(a["ref"])("");function f(){return b.apply(this,arguments)}function b(){return b=Object(u["a"])(regeneratorRuntime.mark((function a(){var u,o,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!e.query.orderId){a.next=21;break}return u=e.query.orderId,p.value=u,a.next=5,n.checkPayment(u);case 5:if(o=a.sent,console.log(o),"授權成功"!==o.message){a.next=18;break}return c.value="交易成功，感謝您的購買！",i.value="儲值後返回首頁",a.next=12,JSON.parse(localStorage.getItem("sd-user"));case 12:return s=a.sent,a.next=15,r.getMyWallet(s.token);case 15:t.push("/"),a.next=21;break;case 18:c.value="交易失敗",i.value="3秒後，即將返回首頁～",setTimeout((function(){t.push("/")}),3e3);case 21:case"end":return a.stop()}}),a)}))),b.apply(this,arguments)}return console.log(e.query),f(),{pageTitle:c,pageTxt:i}}},p=(n("a6f1"),n("6b0d")),f=n.n(p);const b=f()(i,[["render",c],["__scopeId","data-v-ba51376a"]]);t["default"]=b},a6f1:function(e,t,n){"use strict";n("d64e")},d64e:function(e,t,n){}}]);
//# sourceMappingURL=chunk-a381affc.34e13338.js.map