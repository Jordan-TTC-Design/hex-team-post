(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1df5c000"],{"0f6e":function(e,t,n){"use strict";n.r(t);n("ac1f"),n("841c");var c=n("7a23"),o=function(e){return Object(c["pushScopeId"])("data-v-655e8916"),e=e(),Object(c["popScopeId"])(),e},r={class:"container"},a={class:"row justify-content-center"},l={class:"col-xl-6 col-lg-8 col-12 d-flex flex-column gap-4"},s=o((function(){return Object(c["createElementVNode"])("p",null,"點擊載入更多貼文...",-1)})),i=[s],u={key:2,class:"noContentBox"},d=o((function(){return Object(c["createElementVNode"])("p",null,"您尚未追蹤任何用戶～",-1)})),p=o((function(){return Object(c["createElementVNode"])("p",null,"歡迎追蹤喜歡的用戶，即時了解他們的狀況!",-1)})),b=[d,p],m={class:"col-lg-4 col-5 position-relative"};function f(e,t,n,o,s,d){var p=Object(c["resolveComponent"])("PostFilter"),f=Object(c["resolveComponent"])("AddPostCard"),j=Object(c["resolveComponent"])("PostCard"),O=Object(c["resolveComponent"])("FollowingCard");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",r,[Object(c["createElementVNode"])("div",a,[Object(c["createElementVNode"])("div",l,[Object(c["createVNode"])(p,{onSearch:o.search,header:"排序",items:[{name:"由新到舊",type:"desc"},{name:"由舊到新",type:"asc"}]},null,8,["onSearch"]),o.userData.userToken?(Object(c["openBlock"])(),Object(c["createBlock"])(f,{key:0})):Object(c["createCommentVNode"])("",!0),(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(o.postsData.posts,(function(e,t){return Object(c["openBlock"])(),Object(c["createBlock"])(j,{key:e.id,"post-item":e,"post-index":t},null,8,["post-item","post-index"])})),128)),o.morePostBtn?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{key:1,class:"getMorePostBtn",onClick:t[0]||(t[0]=function(){return o.getMorePost&&o.getMorePost.apply(o,arguments)})},i)):Object(c["createCommentVNode"])("",!0),0!==o.postsData.posts.length||o.isLoading?Object(c["createCommentVNode"])("",!0):(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",u,b))]),Object(c["createElementVNode"])("div",m,[Object(c["createVNode"])(O,{following:o.following},null,8,["following"])])])])}var j=n("2909"),O=n("1da1"),g=(n("96cf"),n("4e82"),n("f606")),v=n("c3c2"),k=n("04bb"),w=n("3690"),h=n("9c1d"),y=n("2adf"),E=n("208f"),N=(n("b0c0"),function(e){return Object(c["pushScopeId"])("data-v-2f03d0dd"),e=e(),Object(c["popScopeId"])(),e}),V={class:"sideBox gap-3"},B={class:"p-3 border-bottom d-flex gap-2 align-items-center"},x=N((function(){return Object(c["createElementVNode"])("i",{class:"bi bi-chevron-left"},null,-1)})),C=[x],P=N((function(){return Object(c["createElementVNode"])("div",{class:"card-title"},"我的追蹤",-1)})),D={class:"followUserList card-body d-flex flex-column gap-3"},M=["src","alt"],S={class:"user-info"},R={class:"user-info-title"},_=N((function(){return Object(c["createElementVNode"])("div",{class:"btn btn-sm"},[Object(c["createElementVNode"])("i",{class:"bi bi-arrow-right-circle"})],-1)})),F={key:0,class:"d-flex flex-grow-1 align-items-center justify-content-center text-gray-middle"},I=N((function(){return Object(c["createElementVNode"])("i",{class:"bi bi-person-square"},null,-1)})),L=[I];function q(e,t,n,o,r,a){var l=Object(c["resolveComponent"])("RouterLink");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",V,[Object(c["createElementVNode"])("div",{class:Object(c["normalizeClass"])(["sideBox__card card gap-3",{active:o.listShow}])},[Object(c["createElementVNode"])("div",B,[Object(c["createElementVNode"])("button",{onClick:t[0]||(t[0]=function(){return o.closeModel&&o.closeModel.apply(o,arguments)}),type:"button",class:"btn d-lg-none d-block"},C),P]),Object(c["createElementVNode"])("div",D,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(n.following,(function(e){return Object(c["openBlock"])(),Object(c["createBlock"])(l,{key:e._id,to:"/profile/".concat(e._id),class:"followUser"},{default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("img",{class:"user-picture",src:e.photo||"https://i.imgur.com/ZWHoRPi.png",alt:e.name},null,8,M),Object(c["createElementVNode"])("div",S,[Object(c["createElementVNode"])("span",R,Object(c["toDisplayString"])(e.name),1)]),_]})),_:2},1032,["to"])})),128)),0===n.following.length?(Object(c["openBlock"])(),Object(c["createElementBlock"])("p",F," 目前尚未追蹤任何用戶 ")):Object(c["createCommentVNode"])("",!0)])],2),n.following.length>0?(Object(c["openBlock"])(),Object(c["createElementBlock"])("button",{key:0,onClick:t[1]||(t[1]=function(){return o.openModel&&o.openModel.apply(o,arguments)}),type:"button",class:"sideBtn d-lg-none d-block"},L)):Object(c["createCommentVNode"])("",!0)])}var T={props:["following"],setup:function(){var e=Object(w["a"])(),t=Object(c["ref"])(!1);function n(){t.value=!0,e.noScroll=!0}function o(){t.value=!1,e.noScroll=!1}return{listShow:t,openModel:n,closeModel:o}}},z=(n("2a48"),n("6b0d")),A=n.n(z);const H=A()(T,[["render",q],["__scopeId","data-v-2f03d0dd"]]);var J=H,U={components:{PostFilter:h["a"],AddPostCard:y["a"],PostCard:E["a"],FollowingCard:J},setup:function(){var e=Object(g["a"])(),t=Object(v["a"])(),n=Object(w["a"])(),o=Object(k["a"])(),r=Object(c["ref"])([]),a=Object(c["ref"])(!1),l=Object(c["ref"])(!1),s=Object(c["ref"])({});function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"desc",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";console.log(e,n,c),t.getPostsData.page=1,s.value={page:1,sort:e,query:n,likes:c}}function u(){return d.apply(this,arguments)}function d(){return d=Object(O["a"])(regeneratorRuntime.mark((function n(){var c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a.value=!0,n.next=3,t.getMyFollowPosts(s.value.page,s.value.sort,s.value.query,e.user.token);case 3:c=n.sent,10===c.data.data.length?l.value=!0:l.value=!1,a.value=!1;case 6:case"end":return n.stop()}}),n)}))),d.apply(this,arguments)}function p(e){return b.apply(this,arguments)}function b(){return b=Object(O["a"])(regeneratorRuntime.mark((function t(n){var c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:"like"===n.type?i(n.type,n.query,null===e||void 0===e||null===(c=e.user)||void 0===c?void 0:c.id):i(n.type,n.query,""),u();case 2:case"end":return t.stop()}}),t)}))),b.apply(this,arguments)}function m(){return f.apply(this,arguments)}function f(){return f=Object(O["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:s.value.page+=1,u();case 2:case"end":return e.stop()}}),e)}))),f.apply(this,arguments)}function h(){return y.apply(this,arguments)}function y(){return y=Object(O["a"])(regeneratorRuntime.mark((function t(){var c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n.openPageLoader(),i(),u(),t.next=5,o.getMyFollow(e.user.token);case 5:c=t.sent,r.value=Object(j["a"])(c.data[0].following);case 7:case"end":return t.stop()}}),t)}))),y.apply(this,arguments)}return h(),{postsData:t,following:r,morePostBtn:l,isLoading:a,getMorePost:m,userData:e,search:p}}};n("3315");const W=A()(U,[["render",f],["__scopeId","data-v-655e8916"]]);t["default"]=W},"2a48":function(e,t,n){"use strict";n("4a64")},"2adf":function(e,t,n){"use strict";n("b0c0");var c=n("7a23"),o={class:"card-body d-flex justify-content-between align-items-center"},r={class:"d-flex align-items-center gap-2"},a=["src"],l={class:"d-flex align-items-center gap-2"},s=Object(c["createElementVNode"])("i",{class:"webIcon--sm bi bi-plus-lg"},null,-1),i=Object(c["createTextVNode"])(" 新增貼文 "),u=[s,i],d=Object(c["createElementVNode"])("i",{class:"webIcon--sm bi bi-plus-lg"},null,-1),p=Object(c["createTextVNode"])(" 私密日記 "),b=[d,p];function m(e,t,n,s,i,d){return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{class:Object(c["normalizeClass"])(["card",s.props.class])},[Object(c["createElementVNode"])("div",o,[Object(c["createElementVNode"])("div",r,[Object(c["createElementVNode"])("img",{src:s.userData.user.photo||"https://i.imgur.com/ZWHoRPi.png",alt:"用戶圖片",class:"user-picture me-0"},null,8,a),Object(c["createElementVNode"])("p",null,Object(c["toDisplayString"])(s.userData.user.name),1)]),Object(c["createElementVNode"])("div",l,[Object(c["createElementVNode"])("button",{onClick:t[0]||(t[0]=function(e){return s.postsData.openPostModel("group")}),type:"button",class:"btn btn-default"},u),Object(c["createElementVNode"])("button",{onClick:t[1]||(t[1]=function(e){return s.postsData.openPostModel("person")}),type:"button",class:"btn btn-default"},b)])])],2)}var f=n("f606"),j=n("c3c2"),O={setup:function(e){var t=Object(f["a"])(),n=Object(j["a"])();return{props:e,userData:t,postsData:n}}},g=n("6b0d"),v=n.n(g);const k=v()(O,[["render",m]]);t["a"]=k},3315:function(e,t,n){"use strict";n("51ab")},"4a64":function(e,t,n){},"51ab":function(e,t,n){}}]);
//# sourceMappingURL=chunk-1df5c000.bb63b988.js.map