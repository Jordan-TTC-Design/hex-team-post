(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-505e5346"],{"04d1":function(e,t,n){var c=n("342f"),o=c.match(/firefox\/(\d+)/i);e.exports=!!o&&+o[1]},"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},"14c3":function(e,t,n){var c=n("da84"),o=n("c65b"),r=n("825a"),a=n("1626"),l=n("c6b6"),i=n("9263"),s=c.TypeError;e.exports=function(e,t){var n=e.exec;if(a(n)){var c=o(n,e,t);return null!==c&&r(c),c}if("RegExp"===l(e))return o(i,e,t);throw s("RegExp#exec called on incompatible receiver")}},"208f":function(e,t,n){"use strict";n("b0c0");var c=n("7a23"),o=function(e){return Object(c["pushScopeId"])("data-v-5210c0a0"),e=e(),Object(c["popScopeId"])(),e},r={key:0,class:"card"},a={class:"card-body border-bottom border-gray-middle"},l={class:"d-flex align-items-center"},i=["src"],s={class:"user-info"},u={class:"d-flex align-items-center gap-2"},d={class:"user-info-subtitle"},m={class:"card-body pb-0"},p=["innerHTML"],b={class:"postCard__imgBox"},f=["src","alt"],O={class:"card-body"},j={class:"d-flex align-items-center"},g=o((function(){return Object(c["createElementVNode"])("i",{class:"webIcon bi bi-heart-fill"},null,-1)})),v=o((function(){return Object(c["createElementVNode"])("i",{class:"webIcon bi bi-chat-fill"},null,-1)})),h={key:0,class:"commentList__item"},k={class:"fs-6"},w=Object(c["createTextVNode"])(" 查看全部"),y={class:"text-gray-dark px-1"},x=Object(c["createTextVNode"])("則留言 "),C={key:0,class:"card-body border-top postCard-response"},I=o((function(){return Object(c["createElementVNode"])("i",{class:"webIcon bi bi-arrow-right-circle-fill"},null,-1)})),N=[I];function E(e,t,n,o,I,E){var V=Object(c["resolveComponent"])("RouterLink"),S=Object(c["resolveComponent"])("MoreModel");return void 0!==o.targetItem?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",r,[Object(c["createElementVNode"])("div",a,[Object(c["createElementVNode"])("div",l,[Object(c["createElementVNode"])("img",{src:o.targetItem.user.photo||"https://i.imgur.com/ZWHoRPi.png",alt:"user-picture",class:"user-picture"},null,8,i),Object(c["createElementVNode"])("div",s,[Object(c["createVNode"])(V,{to:"/profile/".concat(o.targetItem.user.id),class:"user-info-title"},{default:Object(c["withCtx"])((function(){return[Object(c["createTextVNode"])(Object(c["toDisplayString"])(o.targetItem.user.name),1)]})),_:1},8,["to"]),Object(c["createElementVNode"])("div",u,[o.targetItem.user.id!==o.userData.user.id&&o.userData.user.token.length>0?(Object(c["openBlock"])(),Object(c["createElementBlock"])("button",{key:0,onClick:t[0]||(t[0]=function(){return o.toggleFollow&&o.toggleFollow.apply(o,arguments)}),type:"button",class:Object(c["normalizeClass"])(["followBtn",{followed:o.isFollowed>=0}])},Object(c["toDisplayString"])(o.isFollowed>=0?"已追蹤":"追蹤"),3)):Object(c["createCommentVNode"])("",!0),Object(c["createElementVNode"])("p",d,Object(c["toDisplayString"])(o.targetTime),1)])]),o.targetItem.user.id===o.userData.user.id&&o.userData.user.token.length>0?(Object(c["openBlock"])(),Object(c["createBlock"])(S,{key:0,"item-id":o.targetItem._id,"function-list":[{name:"編輯貼文",func:o.editPost},{name:"刪除貼文",func:o.deletePost}]},null,8,["item-id","function-list"])):Object(c["createCommentVNode"])("",!0)])]),Object(c["createElementVNode"])("div",m,[o.targetItem.content.length>0?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{key:0,ref:"postCardTextContent",class:Object(c["normalizeClass"])(["postCard__txtContent pb-3",{showAll:!0===o.textContentShowData.isShowAll}]),innerHTML:o.targetItem.content},null,10,p)):Object(c["createCommentVNode"])("",!0),!0===o.textContentShowData.needHide&&!1===o.textContentShowData.isShowAll?(Object(c["openBlock"])(),Object(c["createElementBlock"])("p",{key:1,onClick:t[1]||(t[1]=function(e){return o.textContentShowData.isShowAll=!0}),class:"showMoreBtn"}," ... 顯示更多 ")):Object(c["createCommentVNode"])("",!0),Object(c["createElementVNode"])("div",b,[o.targetItem.image.length>0?(Object(c["openBlock"])(),Object(c["createElementBlock"])("img",{key:0,src:o.targetItem.image,alt:"".concat(o.targetItem.id,"圖片"),class:"postCard__imgBox__img"},null,8,f)):Object(c["createCommentVNode"])("",!0)])]),Object(c["createElementVNode"])("div",O,[Object(c["createElementVNode"])("div",j,[Object(c["createElementVNode"])("p",{onClick:t[2]||(t[2]=function(){return o.toogleLike&&o.toogleLike.apply(o,arguments)}),class:Object(c["normalizeClass"])(["d-flex align-items-center gap-1 me-4 handPointer",{"text-primary":o.isLiked>=0}])},[g,Object(c["createTextVNode"])(" "+Object(c["toDisplayString"])(o.targetItem.likes.length),1)],2),Object(c["createElementVNode"])("p",{class:"d-flex align-items-center gap-1 handPointer",onClick:t[3]||(t[3]=function(e){return o.commentsShowData.isShowAll=o.targetItem.comments.length})},[v,Object(c["createTextVNode"])(" "+Object(c["toDisplayString"])(o.targetItem.comments.length),1)])]),Object(c["createElementVNode"])("ul",{class:Object(c["normalizeClass"])(["commentList",{"py-1":o.targetItem.comments.length>0}])},[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(o.targetItem.comments,(function(e,t){return Object(c["openBlock"])(),Object(c["createElementBlock"])(c["Fragment"],{key:e.id},[t<o.commentsShowData.isShowAll?(Object(c["openBlock"])(),Object(c["createElementBlock"])("li",h,[Object(c["createVNode"])(V,{to:"/profile/".concat(o.targetItem.user.id),class:"fs-6 fw-bolder text-dark"},{default:Object(c["withCtx"])((function(){return[Object(c["createTextVNode"])(Object(c["toDisplayString"])(e.user.name),1)]})),_:2},1032,["to"]),Object(c["createElementVNode"])("p",k,Object(c["toDisplayString"])(e.comment),1),n.postItem.user.id===o.userData.user.id||e.user.id===o.userData.user.id?(Object(c["openBlock"])(),Object(c["createBlock"])(S,{key:0,"item-id":o.targetItem._id,"function-list":[{name:"刪除",func:function(){o.deleteComment(e.id,t)}}]},null,8,["item-id","function-list"])):Object(c["createCommentVNode"])("",!0)])):Object(c["createCommentVNode"])("",!0)],64)})),128)),o.commentsShowData.needHide&&o.commentsShowData.isShowAll!==o.targetItem.comments.length?(Object(c["openBlock"])(),Object(c["createElementBlock"])("li",{key:0,onClick:t[4]||(t[4]=function(e){return o.commentsShowData.isShowAll=o.targetItem.comments.length}),class:"text-gray-dark handPointer"},[w,Object(c["createElementVNode"])("span",y,Object(c["toDisplayString"])(o.targetItem.comments.length),1),x])):Object(c["createCommentVNode"])("",!0)],2)]),o.userData.user.token.length>0?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",C,[Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{type:"text","onUpdate:modelValue":t[5]||(t[5]=function(e){return o.newComment=e}),class:"form-control",placeholder:"回覆..."},null,512),[[c["vModelText"],o.newComment]]),Object(c["createElementVNode"])("button",{class:"btn btn-default",onClick:t[6]||(t[6]=function(){return o.addComment&&o.addComment.apply(o,arguments)})},N)])):Object(c["createCommentVNode"])("",!0)])):Object(c["createCommentVNode"])("",!0)}var V=n("1da1"),S=(n("96cf"),n("c740"),n("a434"),n("f606")),B=n("c3c2"),D=n("04bb"),_=n("c88a"),F=n("c1df"),M=n.n(F),T={components:{MoreModel:_["a"]},props:["postItem","postIndex"],setup:function(e){var t=Object(S["a"])(),n=Object(B["a"])(),o=Object(D["a"])(),r=Object(c["ref"])(""),a=Object(c["ref"])(null),l=JSON.parse(localStorage.getItem("sd-user"))||{},i=Object(c["ref"])({needHide:!1,isShowAll:!0}),s=Object(c["ref"])({needHide:!1,isShowAll:2}),u=Object(c["computed"])((function(){return e.postItem}));function d(){e.postItem&&e.postItem.comments.length>1&&(s.value.needHide=!0)}function m(){return p.apply(this,arguments)}function p(){return p=Object(V["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return l=JSON.parse(localStorage.getItem("sd-user")),console.log(u.value._id,r.value),e.next=4,n.addComment(r.value,u.value._id,l.token);case 4:t=e.sent,"success"===t.status&&(r.value="");case 6:case"end":return e.stop()}}),e)}))),p.apply(this,arguments)}function b(e,t){return f.apply(this,arguments)}function f(){return f=Object(V["a"])(regeneratorRuntime.mark((function t(c,o){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return l=JSON.parse(localStorage.getItem("sd-user")),t.next=3,n.deleteComment(c,l.token);case 3:r=t.sent,"success"===r.status&&n.posts[e.postIndex].comments.splice(o,1);case 5:case"end":return t.stop()}}),t)}))),f.apply(this,arguments)}function O(){return j.apply(this,arguments)}function j(){return j=Object(V["a"])(regeneratorRuntime.mark((function c(){var o;return regeneratorRuntime.wrap((function(c){while(1)switch(c.prev=c.next){case 0:return c.next=2,n.deletePost(u.value._id,t.user.token);case 2:o=c.sent,console.log(o),"success"===o.status&&n.posts.splice(e.postIndex,1);case 5:case"end":return c.stop()}}),c)}))),j.apply(this,arguments)}function g(){return v.apply(this,arguments)}function v(){return v=Object(V["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log(u.value),n.newPostModel.action="edit",n.newPostModel.id=u.value._id,n.targetPost.content=u.value.content,n.targetPost.image=u.value.image,n.targetPost.contentType=u.value.contentType,n.targetPost.tag=u.value.tag||[],n.openPostModel("group");case 8:case"end":return e.stop()}}),e)}))),v.apply(this,arguments)}Object(c["watch"])(a,(function(e){e.clientHeight>96&&(i.value.needHide=!0,i.value.isShowAll=!1)})),Object(c["watch"])(u.value.comments,(function(){d()})),d();var h=Object(c["computed"])((function(){var e=o.myFollowUser.findIndex((function(e){return e._id===u.value.user._id}));return e}));function k(){return w.apply(this,arguments)}function w(){return w=Object(V["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:l=JSON.parse(localStorage.getItem("sd-user")),l&&(h.value+1>0?(console.log("刪除"),o.deleteFollow(u.value.user._id,t.user.token)):(console.log("新增"),o.addFollow(u.value.user._id,t.user.token)));case 2:case"end":return e.stop()}}),e)}))),w.apply(this,arguments)}function y(){return x.apply(this,arguments)}function x(){return x=Object(V["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:l=JSON.parse(localStorage.getItem("sd-user")),l&&(t=u.value.likes.findIndex((function(e){return e._id===l.id})),t+1>0?n.deleteLike(u.value._id,l.token):n.addLike(u.value._id,l.token));case 2:case"end":return e.stop()}}),e)}))),x.apply(this,arguments)}var C=Object(c["computed"])((function(){return u.value.likes.findIndex((function(e){return e._id===l.id}))})),I=Object(c["computed"])((function(){return M()(u.value.createdAt).locale("zh-tw").format("YYYY/MM/DD HH:mm:ss ")}));return{userData:t,postsData:n,isFollowed:h,isLiked:C,textContentShowData:i,commentsShowData:s,newComment:r,targetItem:u,postCardTextContent:a,targetTime:I,addComment:m,deleteComment:b,toogleLike:y,editPost:g,deletePost:O,toggleFollow:k}}},A=(n("2c7c"),n("6b0d")),R=n.n(A);const L=R()(T,[["render",E],["__scopeId","data-v-5210c0a0"]]);t["a"]=L},"2c7c":function(e,t,n){"use strict";n("c219")},"4bbf":function(e,t,n){"use strict";n("6981")},"4e82":function(e,t,n){"use strict";var c=n("23e7"),o=n("e330"),r=n("59ed"),a=n("7b0b"),l=n("07fa"),i=n("577e"),s=n("d039"),u=n("addb"),d=n("a640"),m=n("04d1"),p=n("d998"),b=n("2d00"),f=n("512c"),O=[],j=o(O.sort),g=o(O.push),v=s((function(){O.sort(void 0)})),h=s((function(){O.sort(null)})),k=d("sort"),w=!s((function(){if(b)return b<70;if(!(m&&m>3)){if(p)return!0;if(f)return f<603;var e,t,n,c,o="";for(e=65;e<76;e++){switch(t=String.fromCharCode(e),e){case 66:case 69:case 70:case 72:n=3;break;case 68:case 71:n=4;break;default:n=2}for(c=0;c<47;c++)O.push({k:t+c,v:n})}for(O.sort((function(e,t){return t.v-e.v})),c=0;c<O.length;c++)t=O[c].k.charAt(0),o.charAt(o.length-1)!==t&&(o+=t);return"DGBEFHACIJK"!==o}})),y=v||!h||!k||!w,x=function(e){return function(t,n){return void 0===n?-1:void 0===t?1:void 0!==e?+e(t,n)||0:i(t)>i(n)?1:-1}};c({target:"Array",proto:!0,forced:y},{sort:function(e){void 0!==e&&r(e);var t=a(this);if(w)return void 0===e?j(t):j(t,e);var n,c,o=[],i=l(t);for(c=0;c<i;c++)c in t&&g(o,t[c]);u(o,x(e)),n=o.length,c=0;while(c<n)t[c]=o[c++];while(c<i)delete t[c++];return t}})},"512c":function(e,t,n){var c=n("342f"),o=c.match(/AppleWebKit\/(\d+)\./);e.exports=!!o&&+o[1]},6981:function(e,t,n){},"81aa":function(e,t,n){},"841c":function(e,t,n){"use strict";var c=n("c65b"),o=n("d784"),r=n("825a"),a=n("1d80"),l=n("129f"),i=n("577e"),s=n("dc4a"),u=n("14c3");o("search",(function(e,t,n){return[function(t){var n=a(this),o=void 0==t?void 0:s(t,e);return o?c(o,t,n):new RegExp(t)[e](i(n))},function(e){var c=r(this),o=i(e),a=n(t,c,o);if(a.done)return a.value;var s=c.lastIndex;l(s,0)||(c.lastIndex=0);var d=u(c,o);return l(c.lastIndex,s)||(c.lastIndex=s),null===d?-1:d.index}]}))},"96ca":function(e,t,n){"use strict";n("81aa")},"9c1d":function(e,t,n){"use strict";n("ac1f"),n("841c"),n("b0c0");var c=n("7a23"),o=function(e){return Object(c["pushScopeId"])("data-v-6f450164"),e=e(),Object(c["popScopeId"])(),e},r={class:"postFilter-search"},a=o((function(){return Object(c["createElementVNode"])("i",{class:"bi bi-search"},null,-1)})),l=[a],i={class:"postFilter-dropdown"},s={key:0,class:"tmp"},u={class:"d"},d={key:0,class:"d-header"},m=["onClick"];function p(e,t,n,o,a,p){return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{class:Object(c["normalizeClass"])(["postFilter",o.props.class])},[Object(c["createElementVNode"])("div",r,[Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{type:"text",class:"form-control bg-white",placeholder:"搜尋關鍵字","onUpdate:modelValue":t[0]||(t[0]=function(e){return o.query=e})},null,512),[[c["vModelText"],o.query]]),Object(c["createElementVNode"])("button",{class:"btn search p-0 me-3",type:"button",onClick:t[1]||(t[1]=function(){return o.search&&o.search.apply(o,arguments)})},l)]),Object(c["createElementVNode"])("div",i,[Object(c["createElementVNode"])("div",{class:"postFilter-dropdown-text",onClick:t[2]||(t[2]=function(){return o.toggle&&o.toggle.apply(o,arguments)})},[Object(c["createTextVNode"])(Object(c["toDisplayString"])(o.name)+" ",1),Object(c["createElementVNode"])("i",{class:Object(c["normalizeClass"])(["bi bi-chevron-down",[o.isDropdown?"bi-chevron-up":"bi-chevron-down"]])},null,2)]),o.isDropdown?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",s,[Object(c["createElementVNode"])("ul",u,[n.header?(Object(c["openBlock"])(),Object(c["createElementBlock"])("li",d,Object(c["toDisplayString"])(n.header),1)):Object(c["createCommentVNode"])("",!0),(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(o.props.items,(function(e){return Object(c["openBlock"])(),Object(c["createElementBlock"])("li",{class:Object(c["normalizeClass"])(["d-item",[o.type===e.type?"active":""]]),key:e.type,onClick:function(t){return o.choose(e.name,e.type)}},Object(c["toDisplayString"])(e.name),11,m)})),128))])])):Object(c["createCommentVNode"])("",!0)])],2)}var b={components:{},props:{items:Array,header:String},setup:function(e,t){var n=t.emit,o=Object(c["ref"])(""),r=Object(c["ref"])(e.items[0].type),a=Object(c["ref"])(e.items[0].name),l=Object(c["ref"])(!1),i=function(){l.value=!l.value},s=function(){var e={query:o.value,type:r.value||"asc"};console.log(e),n("search",e)},u=function(e,t){a.value=e,r.value=t,i(),s()};return{props:e,query:o,type:r,name:a,isDropdown:l,search:s,choose:u,toggle:i}}},f=(n("96ca"),n("6b0d")),O=n.n(f);const j=O()(b,[["render",p],["__scopeId","data-v-6f450164"]]);t["a"]=j},addb:function(e,t,n){var c=n("4dae"),o=Math.floor,r=function(e,t){var n=e.length,i=o(n/2);return n<8?a(e,t):l(e,r(c(e,0,i),t),r(c(e,i),t),t)},a=function(e,t){var n,c,o=e.length,r=1;while(r<o){c=r,n=e[r];while(c&&t(e[c-1],n)>0)e[c]=e[--c];c!==r++&&(e[c]=n)}return e},l=function(e,t,n,c){var o=t.length,r=n.length,a=0,l=0;while(a<o||l<r)e[a+l]=a<o&&l<r?c(t[a],n[l])<=0?t[a++]:n[l++]:a<o?t[a++]:n[l++];return e};e.exports=r},c219:function(e,t,n){},c88a:function(e,t,n){"use strict";n("b0c0");var c=n("7a23"),o=function(e){return Object(c["pushScopeId"])("data-v-0dba6e56"),e=e(),Object(c["popScopeId"])(),e},r={class:"moreMenu"},a=o((function(){return Object(c["createElementVNode"])("i",{class:"webIcon bi bi-three-dots"},null,-1)})),l=[a],i={class:"moreMenu__box border border-secondary rounded bg-white"},s=["onClick"];function u(e,t,n,o,a,u){return Object(c["openBlock"])(),Object(c["createElementBlock"])(c["Fragment"],null,[Object(c["createElementVNode"])("div",r,[Object(c["createElementVNode"])("button",{type:"button",onClick:t[0]||(t[0]=function(e){return o.modalOpen=!o.modalOpen}),class:"btn btn-sm"},l),Object(c["withDirectives"])(Object(c["createElementVNode"])("ul",i,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(n.functionList,(function(e){return Object(c["openBlock"])(),Object(c["createElementBlock"])("li",{key:e.name,class:"moreMenu__item",onClick:function(t){return o.toogleFunc(e.func)}},Object(c["toDisplayString"])(e.name),9,s)})),128))],512),[[c["vShow"],!0===o.modalOpen]])]),Object(c["withDirectives"])(Object(c["createElementVNode"])("div",{class:"dropdownBg",onClick:t[1]||(t[1]=function(e){return o.modalOpen=!1})},null,512),[[c["vShow"],!0===o.modalOpen]])],64)}var d={props:["itemId","functionList"],setup:function(){var e=Object(c["ref"])(!1);function t(t){t(),e.value=!1}return{modalOpen:e,toogleFunc:t}}},m=(n("4bbf"),n("6b0d")),p=n.n(m);const b=p()(d,[["render",u],["__scopeId","data-v-0dba6e56"]]);t["a"]=b},d784:function(e,t,n){"use strict";n("ac1f");var c=n("e330"),o=n("6eeb"),r=n("9263"),a=n("d039"),l=n("b622"),i=n("9112"),s=l("species"),u=RegExp.prototype;e.exports=function(e,t,n,d){var m=l(e),p=!a((function(){var t={};return t[m]=function(){return 7},7!=""[e](t)})),b=p&&!a((function(){var t=!1,n=/a/;return"split"===e&&(n={},n.constructor={},n.constructor[s]=function(){return n},n.flags="",n[m]=/./[m]),n.exec=function(){return t=!0,null},n[m](""),!t}));if(!p||!b||n){var f=c(/./[m]),O=t(m,""[e],(function(e,t,n,o,a){var l=c(e),i=t.exec;return i===r||i===u.exec?p&&!a?{done:!0,value:f(t,n,o)}:{done:!0,value:l(n,t,o)}:{done:!1}}));o(String.prototype,e,O[0]),o(u,m,O[1])}d&&i(u[m],"sham",!0)}},d998:function(e,t,n){var c=n("342f");e.exports=/MSIE|Trident/.test(c)}}]);
//# sourceMappingURL=chunk-505e5346.891c7798.js.map