(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e1184cba"],{"057f":function(t,e,r){var n=r("c6b6"),o=r("fc6a"),a=r("241c").f,i=r("4dae"),u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return a(t)}catch(e){return i(u)}};t.exports.f=function(t){return u&&"Window"==n(t)?c(t):a(o(t))}},"0b42":function(t,e,r){var n=r("da84"),o=r("e8b5"),a=r("68ee"),i=r("861d"),u=r("b622"),c=u("species"),s=n.Array;t.exports=function(t){var e;return o(t)&&(e=t.constructor,a(e)&&(e===s||o(e.prototype))?e=void 0:i(e)&&(e=e[c],null===e&&(e=void 0))),void 0===e?s:e}},"159b":function(t,e,r){var n=r("da84"),o=r("fdbc"),a=r("785a"),i=r("17c2"),u=r("9112"),c=function(t){if(t&&t.forEach!==i)try{u(t,"forEach",i)}catch(e){t.forEach=i}};for(var s in o)o[s]&&c(n[s]&&n[s].prototype);c(a)},"17c2":function(t,e,r){"use strict";var n=r("b727").forEach,o=r("a640"),a=o("forEach");t.exports=a?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},"1da1":function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));r("d3b7");function n(t,e,r,n,o,a,i){try{var u=t[a](i),c=u.value}catch(s){return void r(s)}u.done?e(c):Promise.resolve(c).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,a){var i=t.apply(e,r);function u(t){n(i,o,a,u,c,"next",t)}function c(t){n(i,o,a,u,c,"throw",t)}u(void 0)}))}}},"1dde":function(t,e,r){var n=r("d039"),o=r("b622"),a=r("2d00"),i=o("species");t.exports=function(t){return a>=51||!n((function(){var e=[],r=e.constructor={};return r[i]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},3690:function(t,e,r){"use strict";var n=r("be92"),o=Object(n["b"])({id:"statusStore",state:function(){return{isLoading:[],pageLoading:!1,noScroll:!1,signUpModel:!1,logInModel:!1,diamondModel:!1,forgetPasswordsModel:!1,imgCropperModel:{open:!1,url:"https://i.imgur.com/ZWHoRPi.png",file:null,name:""},askModel:{open:!1,title:"提醒您",text:"請問你要登出嗎？",action:null},remindModel:{open:!1,title:"提醒您",text:"您尚未登入，無法購買！"},popInfoModel:{open:!1,title:""},emailModel:!1}},actions:{openAskModel:function(t,e,r){this.askModel.open=!0,this.askModel.title=t,this.askModel.text=e,this.askModel.action=r},openPopInfoModel:function(t){this.popInfoModel.open=!0,this.popInfoModel.title=t},openRemindModel:function(t,e){this.remindModel.open=!0,this.remindModel.title=t,this.remindModel.text=e},closePopInfoModel:function(){this.popInfoModel.open=!1,this.popInfoModel.title=""},closeRemindModel:function(){this.remindModel.open=!1,this.remindModel.title=""},closeAskModel:function(){this.askModel.open=!1,this.askModel.title="",this.askModel.text="",this.askModel.action=null},openPageLoader:function(){var t=this;this.pageLoading=!0,setTimeout((function(){t.pageLoading=!1,console.log(t.pageLoading)}),2e3),console.log(this.pageLoading)},addLoading:function(){this.isLoading.push("loading")},shiftLoading:function(){this.isLoading.shift()},openUserImageCropper:function(){this.imgCropperModel.open=!0}}});e["a"]=o},"3d87":function(t,e,r){var n=r("4930");t.exports=n&&!!Symbol["for"]&&!!Symbol.keyFor},"428f":function(t,e,r){var n=r("da84");t.exports=n},"498a":function(t,e,r){"use strict";var n=r("23e7"),o=r("58a8").trim,a=r("c8d2");n({target:"String",proto:!0,forced:a("trim")},{trim:function(){return o(this)}})},"4dae":function(t,e,r){var n=r("da84"),o=r("23cb"),a=r("07fa"),i=r("8418"),u=n.Array,c=Math.max;t.exports=function(t,e,r){for(var n=a(t),s=o(e,n),f=o(void 0===r?n:r,n),d=u(c(f-s,0)),p=0;s<f;s++,p++)i(d,p,t[s]);return d.length=p,d}},"4de4":function(t,e,r){"use strict";var n=r("23e7"),o=r("b727").filter,a=r("1dde"),i=a("filter");n({target:"Array",proto:!0,forced:!i},{filter:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},"4df4":function(t,e,r){"use strict";var n=r("da84"),o=r("0366"),a=r("c65b"),i=r("7b0b"),u=r("9bdd"),c=r("e95a"),s=r("68ee"),f=r("07fa"),d=r("8418"),p=r("9a1f"),h=r("35a1"),l=n.Array;t.exports=function(t){var e=i(t),r=s(this),n=arguments.length,g=n>1?arguments[1]:void 0,v=void 0!==g;v&&(g=o(g,n>2?arguments[2]:void 0));var m,b,y,w,x,O,k=h(e),L=0;if(!k||this==l&&c(k))for(m=f(e),b=r?new this(m):l(m);m>L;L++)O=v?g(e[L],L):e[L],d(b,L,O);else for(w=p(e,k),x=w.next,b=r?new this:[];!(y=a(x,w)).done;L++)O=v?u(w,g,[y.value,L],!0):y.value,d(b,L,O);return b.length=L,b}},5530:function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));r("b64b"),r("a4d3"),r("4de4"),r("d3b7"),r("e439"),r("159b"),r("dbb4");function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function a(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){n(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}},"57b9":function(t,e,r){var n=r("c65b"),o=r("d066"),a=r("b622"),i=r("6eeb");t.exports=function(){var t=o("Symbol"),e=t&&t.prototype,r=e&&e.valueOf,u=a("toPrimitive");e&&!e[u]&&i(e,u,(function(t){return n(r,this)}))}},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,r){var n=r("e330"),o=r("1d80"),a=r("577e"),i=r("5899"),u=n("".replace),c="["+i+"]",s=RegExp("^"+c+c+"*"),f=RegExp(c+c+"*$"),d=function(t){return function(e){var r=a(o(e));return 1&t&&(r=u(r,s,"")),2&t&&(r=u(r,f,"")),r}};t.exports={start:d(1),end:d(2),trim:d(3)}},"5a47":function(t,e,r){var n=r("23e7"),o=r("4930"),a=r("d039"),i=r("7418"),u=r("7b0b"),c=!o||a((function(){i.f(1)}));n({target:"Object",stat:!0,forced:c},{getOwnPropertySymbols:function(t){var e=i.f;return e?e(u(t)):[]}})},"65f0":function(t,e,r){var n=r("0b42");t.exports=function(t,e){return new(n(t))(0===e?0:e)}},"746f":function(t,e,r){var n=r("428f"),o=r("1a2d"),a=r("e538"),i=r("9bf2").f;t.exports=function(t){var e=n.Symbol||(n.Symbol={});o(e,t)||i(e,t,{value:a.f(t)})}},8418:function(t,e,r){"use strict";var n=r("a04b"),o=r("9bf2"),a=r("5c6c");t.exports=function(t,e,r){var i=n(e);i in t?o.f(t,i,a(0,r)):t[i]=r}},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(T){c=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof v?e:v,a=Object.create(o.prototype),i=new E(n||[]);return a._invoke=j(t,r,i),a}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(T){return{type:"throw",arg:T}}}t.wrap=s;var d="suspendedStart",p="suspendedYield",h="executing",l="completed",g={};function v(){}function m(){}function b(){}var y={};c(y,a,(function(){return this}));var w=Object.getPrototypeOf,x=w&&w(w(R([])));x&&x!==r&&n.call(x,a)&&(y=x);var O=b.prototype=v.prototype=Object.create(y);function k(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function L(t,e){function r(o,a,i,u){var c=f(t[o],t,a);if("throw"!==c.type){var s=c.arg,d=s.value;return d&&"object"===typeof d&&n.call(d,"__await")?e.resolve(d.__await).then((function(t){r("next",t,i,u)}),(function(t){r("throw",t,i,u)})):e.resolve(d).then((function(t){s.value=t,i(s)}),(function(t){return r("throw",t,i,u)}))}u(c.arg)}var o;function a(t,n){function a(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(a,a):a()}this._invoke=a}function j(t,e,r){var n=d;return function(o,a){if(n===h)throw new Error("Generator is already running");if(n===l){if("throw"===o)throw a;return I()}r.method=o,r.arg=a;while(1){var i=r.delegate;if(i){var u=P(i,r);if(u){if(u===g)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===d)throw n=l,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var c=f(t,e,r);if("normal"===c.type){if(n=r.done?l:p,c.arg===g)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=l,r.method="throw",r.arg=c.arg)}}}function P(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,P(t,r),"throw"===r.method))return g;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var o=f(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,g;var a=o.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,g):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function M(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function E(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function R(t){if(t){var r=t[a];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function r(){while(++o<t.length)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:I}}function I(){return{value:e,done:!0}}return m.prototype=b,c(O,"constructor",b),c(b,"constructor",m),m.displayName=c(b,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,c(t,u,"GeneratorFunction")),t.prototype=Object.create(O),t},t.awrap=function(t){return{__await:t}},k(L.prototype),c(L.prototype,i,(function(){return this})),t.AsyncIterator=L,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new L(s(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},k(O),c(O,u,"Generator"),c(O,a,(function(){return this})),c(O,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=R,E.prototype={constructor:E,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(M),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return u.type="throw",u.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],u=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var c=n.call(i,"catchLoc"),s=n.call(i,"finallyLoc");if(c&&s){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,g):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),M(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;M(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:R(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),g}},t}(t.exports);try{regeneratorRuntime=n}catch(o){"object"===typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}},"9bdd":function(t,e,r){var n=r("825a"),o=r("2a62");t.exports=function(t,e,r,a){try{return a?e(n(r)[0],r[1]):e(r)}catch(i){o(t,"throw",i)}}},a4d3:function(t,e,r){r("d9f5"),r("b4f8"),r("c513"),r("e9c4"),r("5a47")},a640:function(t,e,r){"use strict";var n=r("d039");t.exports=function(t,e){var r=[][t];return!!r&&n((function(){r.call(null,e||function(){return 1},1)}))}},b0c0:function(t,e,r){var n=r("83ab"),o=r("5e77").EXISTS,a=r("e330"),i=r("9bf2").f,u=Function.prototype,c=a(u.toString),s=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,f=a(s.exec),d="name";n&&!o&&i(u,d,{configurable:!0,get:function(){try{return f(s,c(this))[1]}catch(t){return""}}})},b4f8:function(t,e,r){var n=r("23e7"),o=r("d066"),a=r("1a2d"),i=r("577e"),u=r("5692"),c=r("3d87"),s=u("string-to-symbol-registry"),f=u("symbol-to-string-registry");n({target:"Symbol",stat:!0,forced:!c},{for:function(t){var e=i(t);if(a(s,e))return s[e];var r=o("Symbol")(e);return s[e]=r,f[r]=e,r}})},b64b:function(t,e,r){var n=r("23e7"),o=r("7b0b"),a=r("df75"),i=r("d039"),u=i((function(){a(1)}));n({target:"Object",stat:!0,forced:u},{keys:function(t){return a(o(t))}})},b727:function(t,e,r){var n=r("0366"),o=r("e330"),a=r("44ad"),i=r("7b0b"),u=r("07fa"),c=r("65f0"),s=o([].push),f=function(t){var e=1==t,r=2==t,o=3==t,f=4==t,d=6==t,p=7==t,h=5==t||d;return function(l,g,v,m){for(var b,y,w=i(l),x=a(w),O=n(g,v),k=u(x),L=0,j=m||c,P=e?j(l,k):r||p?j(l,0):void 0;k>L;L++)if((h||L in x)&&(b=x[L],y=O(b,L,w),t))if(e)P[L]=y;else if(y)switch(t){case 3:return!0;case 5:return b;case 6:return L;case 2:s(P,b)}else switch(t){case 4:return!1;case 7:s(P,b)}return d?-1:o||f?f:P}};t.exports={forEach:f(0),map:f(1),filter:f(2),some:f(3),every:f(4),find:f(5),findIndex:f(6),filterReject:f(7)}},c513:function(t,e,r){var n=r("23e7"),o=r("1a2d"),a=r("d9b5"),i=r("0d51"),u=r("5692"),c=r("3d87"),s=u("symbol-to-string-registry");n({target:"Symbol",stat:!0,forced:!c},{keyFor:function(t){if(!a(t))throw TypeError(i(t)+" is not a symbol");if(o(s,t))return s[t]}})},c8d2:function(t,e,r){var n=r("5e77").PROPER,o=r("d039"),a=r("5899"),i="​᠎";t.exports=function(t){return o((function(){return!!a[t]()||i[t]()!==i||n&&a[t].name!==t}))}},d9f5:function(t,e,r){"use strict";var n=r("23e7"),o=r("da84"),a=r("c65b"),i=r("e330"),u=r("c430"),c=r("83ab"),s=r("4930"),f=r("d039"),d=r("1a2d"),p=r("3a9b"),h=r("825a"),l=r("fc6a"),g=r("a04b"),v=r("577e"),m=r("5c6c"),b=r("7c73"),y=r("df75"),w=r("241c"),x=r("057f"),O=r("7418"),k=r("06cf"),L=r("9bf2"),j=r("37e8"),P=r("d1e7"),S=r("6eeb"),M=r("5692"),E=r("f772"),R=r("d012"),I=r("90e3"),T=r("b622"),_=r("e538"),F=r("746f"),A=r("57b9"),N=r("d44e"),D=r("69f3"),C=r("b727").forEach,G=E("hidden"),U="Symbol",W="prototype",H=D.set,J=D.getterFor(U),z=Object[W],Z=o.Symbol,$=Z&&Z[W],B=o.TypeError,Y=o.QObject,Q=k.f,X=L.f,q=x.f,K=P.f,V=i([].push),tt=M("symbols"),et=M("op-symbols"),rt=M("wks"),nt=!Y||!Y[W]||!Y[W].findChild,ot=c&&f((function(){return 7!=b(X({},"a",{get:function(){return X(this,"a",{value:7}).a}})).a}))?function(t,e,r){var n=Q(z,e);n&&delete z[e],X(t,e,r),n&&t!==z&&X(z,e,n)}:X,at=function(t,e){var r=tt[t]=b($);return H(r,{type:U,tag:t,description:e}),c||(r.description=e),r},it=function(t,e,r){t===z&&it(et,e,r),h(t);var n=g(e);return h(r),d(tt,n)?(r.enumerable?(d(t,G)&&t[G][n]&&(t[G][n]=!1),r=b(r,{enumerable:m(0,!1)})):(d(t,G)||X(t,G,m(1,{})),t[G][n]=!0),ot(t,n,r)):X(t,n,r)},ut=function(t,e){h(t);var r=l(e),n=y(r).concat(pt(r));return C(n,(function(e){c&&!a(st,r,e)||it(t,e,r[e])})),t},ct=function(t,e){return void 0===e?b(t):ut(b(t),e)},st=function(t){var e=g(t),r=a(K,this,e);return!(this===z&&d(tt,e)&&!d(et,e))&&(!(r||!d(this,e)||!d(tt,e)||d(this,G)&&this[G][e])||r)},ft=function(t,e){var r=l(t),n=g(e);if(r!==z||!d(tt,n)||d(et,n)){var o=Q(r,n);return!o||!d(tt,n)||d(r,G)&&r[G][n]||(o.enumerable=!0),o}},dt=function(t){var e=q(l(t)),r=[];return C(e,(function(t){d(tt,t)||d(R,t)||V(r,t)})),r},pt=function(t){var e=t===z,r=q(e?et:l(t)),n=[];return C(r,(function(t){!d(tt,t)||e&&!d(z,t)||V(n,tt[t])})),n};s||(Z=function(){if(p($,this))throw B("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?v(arguments[0]):void 0,e=I(t),r=function(t){this===z&&a(r,et,t),d(this,G)&&d(this[G],e)&&(this[G][e]=!1),ot(this,e,m(1,t))};return c&&nt&&ot(z,e,{configurable:!0,set:r}),at(e,t)},$=Z[W],S($,"toString",(function(){return J(this).tag})),S(Z,"withoutSetter",(function(t){return at(I(t),t)})),P.f=st,L.f=it,j.f=ut,k.f=ft,w.f=x.f=dt,O.f=pt,_.f=function(t){return at(T(t),t)},c&&(X($,"description",{configurable:!0,get:function(){return J(this).description}}),u||S(z,"propertyIsEnumerable",st,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!s,sham:!s},{Symbol:Z}),C(y(rt),(function(t){F(t)})),n({target:U,stat:!0,forced:!s},{useSetter:function(){nt=!0},useSimple:function(){nt=!1}}),n({target:"Object",stat:!0,forced:!s,sham:!c},{create:ct,defineProperty:it,defineProperties:ut,getOwnPropertyDescriptor:ft}),n({target:"Object",stat:!0,forced:!s},{getOwnPropertyNames:dt}),A(),N(Z,U),R[G]=!0},dbb4:function(t,e,r){var n=r("23e7"),o=r("83ab"),a=r("56ef"),i=r("fc6a"),u=r("06cf"),c=r("8418");n({target:"Object",stat:!0,sham:!o},{getOwnPropertyDescriptors:function(t){var e,r,n=i(t),o=u.f,s=a(n),f={},d=0;while(s.length>d)r=o(n,e=s[d++]),void 0!==r&&c(f,e,r);return f}})},e439:function(t,e,r){var n=r("23e7"),o=r("d039"),a=r("fc6a"),i=r("06cf").f,u=r("83ab"),c=o((function(){i(1)})),s=!u||c;n({target:"Object",stat:!0,forced:s,sham:!u},{getOwnPropertyDescriptor:function(t,e){return i(a(t),e)}})},e538:function(t,e,r){var n=r("b622");e.f=n},e8b5:function(t,e,r){var n=r("c6b6");t.exports=Array.isArray||function(t){return"Array"==n(t)}},e9c4:function(t,e,r){var n=r("23e7"),o=r("d066"),a=r("2ba4"),i=r("c65b"),u=r("e330"),c=r("d039"),s=r("e8b5"),f=r("1626"),d=r("861d"),p=r("d9b5"),h=r("f36a"),l=r("4930"),g=o("JSON","stringify"),v=u(/./.exec),m=u("".charAt),b=u("".charCodeAt),y=u("".replace),w=u(1..toString),x=/[\uD800-\uDFFF]/g,O=/^[\uD800-\uDBFF]$/,k=/^[\uDC00-\uDFFF]$/,L=!l||c((function(){var t=o("Symbol")();return"[null]"!=g([t])||"{}"!=g({a:t})||"{}"!=g(Object(t))})),j=c((function(){return'"\\udf06\\ud834"'!==g("\udf06\ud834")||'"\\udead"'!==g("\udead")})),P=function(t,e){var r=h(arguments),n=e;if((d(e)||void 0!==t)&&!p(t))return s(e)||(e=function(t,e){if(f(n)&&(e=i(n,this,t,e)),!p(e))return e}),r[1]=e,a(g,null,r)},S=function(t,e,r){var n=m(r,e-1),o=m(r,e+1);return v(O,t)&&!v(k,o)||v(k,t)&&!v(O,n)?"\\u"+w(b(t,0),16):t};g&&n({target:"JSON",stat:!0,forced:L||j},{stringify:function(t,e,r){var n=h(arguments),o=a(L?P:g,null,n);return j&&"string"==typeof o?y(o,x,S):o}})},f606:function(t,e,r){"use strict";var n=r("5530"),o=r("1da1"),a=(r("96cf"),r("498a"),r("e9c4"),r("b0c0"),r("be92")),i=r("bc3a"),u=r.n(i),c=r("3690"),s=Object(c["a"])(),f=Object(a["b"])({id:"userStore",state:function(){return{user:{name:"",id:"",token:"",photo:"https://i.imgur.com/ZWHoRPi.png"},myProfile:{name:"",id:"",token:"",photo:"https://i.imgur.com/ZWHoRPi.png"},userProfile:{name:"",id:"",token:"",photo:"https://i.imgur.com/ZWHoRPi.png"},myWallet:0,defaultPhoto:"https://i.imgur.com/ZWHoRPi.png"}},getters:{},actions:{getLocalToken:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return s.addLoading(),r=!1,e.next=4,JSON.parse(localStorage.getItem("sd-user"));case 4:return n=e.sent,n&&n.token.trim().length>0?(t.user=n,r=!0,t.getMyWallet(t.user.token)):localStorage.setItem("sd-user",JSON.stringify(t.user)),s.shiftLoading(),e.abrupt("return",r);case 8:case"end":return e.stop()}}),e)})))()},updatedLocalUser:function(){var t={name:this.user.name,id:this.user.id,token:this.user.token,photo:this.user.photo};localStorage.setItem("sd-user",JSON.stringify(t))},signUp:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,s.addLoading(),r.next=4,u()({method:"POST",url:"https://hex-post-team-api-server.herokuapp.com/api/user",data:t});case 4:return n=r.sent,console.log(n),e.user.name=n.data.user.name,e.user.token=n.data.user.token,e.user.id=n.data.user._id,e.user.photo=n.data.user.photo,e.getMyWallet(e.user.token),e.updatedLocalUser(),r.abrupt("return",n.data);case 15:return r.prev=15,r.t0=r["catch"](0),console.dir(r.t0),r.abrupt("return",r.t0.response.data);case 19:return r.prev=19,s.shiftLoading(),r.finish(19);case 22:case"end":return r.stop()}}),r,null,[[0,15,19,22]])})))()},logIn:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,s.addLoading(),r.next=4,u()({method:"POST",url:"https://hex-post-team-api-server.herokuapp.com/api/user/sign-in",data:t});case 4:return n=r.sent,e.user.name=n.data.user.name,e.user.token=n.data.user.token,e.user.id=n.data.user._id,e.user.photo=n.data.user.photo,e.getMyWallet(e.user.token),r.abrupt("return",n.data);case 13:return r.prev=13,r.t0=r["catch"](0),console.dir(r.t0),r.abrupt("return",r.t0.response.data);case 17:return r.prev=17,s.shiftLoading(),r.finish(17);case 20:case"end":return r.stop()}}),r,null,[[0,13,17,20]])})))()},checkLogIn:function(t){return Object(o["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,s.addLoading(),e.next=4,u()({method:"GET",url:"https://hex-post-team-api-server.herokuapp.com/api/user/check",headers:{authorization:"".concat(t)}});case 4:return r=e.sent,e.abrupt("return","success"===r.data.status||!1);case 8:return e.prev=8,e.t0=e["catch"](0),e.abrupt("return","success"===e.t0.response.data.status||!1);case 11:return e.prev=11,s.shiftLoading(),e.finish(11);case 14:case"end":return e.stop()}}),e,null,[[0,8,11,14]])})))()},getUserProfile:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var o,a,i,c,f,d,p;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,s.addLoading(),r.next=4,u()({method:"GET",url:"https://hex-post-team-api-server.herokuapp.com/api/user/".concat(t)});case 4:return o=r.sent,a=o.data.data,i=a.follows,c=a.likes,f=a.postCounts,d=a.privateposts,p=a.user,s.shiftLoading(),p.photo=p.photo||e.userProfile.photo,e.userProfile=Object(n["a"])(Object(n["a"])({},p),{},{follows:i,likes:c,postCounts:f,privateposts:d}),console.log(p),r.abrupt("return",o.data.data);case 13:return r.prev=13,r.t0=r["catch"](0),console.dir(r.t0),r.abrupt("return",r.t0);case 17:return r.prev=17,s.shiftLoading(),r.finish(17);case 20:case"end":return r.stop()}}),r,null,[[0,13,17,20]])})))()},getMyProfile:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return s.addLoading(),e.abrupt("return",u()({method:"GET",url:"https://hex-post-team-api-server.herokuapp.com/api/user",headers:{authorization:"".concat(t.user.token)}}).then((function(e){var r=e.data.data,o=r.follows,a=r.likes,i=r.postCounts,u=r.privateposts,c=r.user;return s.shiftLoading(),c.photo=c.photo||t.myProfile.photo,t.myProfile=Object(n["a"])(Object(n["a"])({},c),{},{follows:o,likes:a,postCounts:i,privateposts:u}),e.data.data})).catch((function(t){return s.shiftLoading(),t})));case 2:case"end":return e.stop()}}),e)})))()},getMyWallet:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return s.addLoading(),r.prev=1,r.next=4,u()({method:"GET",url:"https://hex-post-team-api-server.herokuapp.com/api/wallet/",headers:{authorization:"".concat(t)}});case 4:return n=r.sent,console.log(n.data),"success"===n.data.status&&(e.myWallet=n.data.data),s.shiftLoading(),r.abrupt("return",n.data);case 11:return r.prev=11,r.t0=r["catch"](1),console.dir(r.t0),s.shiftLoading(),r.abrupt("return",r.t0);case 16:case"end":return r.stop()}}),r,null,[[1,11]])})))()},forgotPassword:function(t){return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return s.addLoading(),console.log(t),e.abrupt("return",u()({method:"POST",url:"https://hex-post-team-api-server.herokuapp.com/api/user/forgot_password",data:t}).then((function(t){return console.log(t),s.shiftLoading(),t.data.data})).catch((function(t){return console.dir(t),s.shiftLoading(),t})));case 3:case"end":return e.stop()}}),e)})))()},updateUser:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return s.addLoading(),r.abrupt("return",u()({method:"PATCH",url:"https://hex-post-team-api-server.herokuapp.com/api/user/",data:e.user,headers:{authorization:"".concat(t)}}).then((function(t){console.log(t);var r=e.user.token;return e.user=t.data.data,e.user.token=r,s.shiftLoading(),e.updatedLocalUser(),e.checkLogIn(e.user.token),t.data.data})).catch((function(t){return console.dir(t),s.shiftLoading(),t})));case 2:case"end":return r.stop()}}),r)})))()},editUser:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var o,a,i,c;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return s.addLoading(),console.log(t),o=t.name,a=t.birthday,i=t.gender,c=t.memo,r.abrupt("return",u()({method:"PATCH",url:"https://hex-post-team-api-server.herokuapp.com/api/user/",data:{name:o,birthday:a,gender:i,memo:c},headers:{authorization:"".concat(e.user.token)}}).then((function(t){return e.user=Object(n["a"])(Object(n["a"])({},e.user),t.data.data),e.myProfile=Object(n["a"])(Object(n["a"])({},e.myProfile),t.data.data),s.shiftLoading(),e.updatedLocalUser(),s.openRemindModel("變更個人資料成功",""),t.data.data})).catch((function(t){return s.shiftLoading(),s.openRemindModel("變更個人資料失敗",t.response.data.message),t.response.data})));case 4:case"end":return r.stop()}}),r)})))()},resetPassword:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return s.addLoading(),r.abrupt("return",u()({method:"POST",url:"https://hex-post-team-api-server.herokuapp.com/api/user/reset_password",data:t,headers:{authorization:"".concat(e.user.token)}}).then((function(t){return s.shiftLoading(),s.openRemindModel("變更密碼成功","下次登入請輸入新密碼"),t.data})).catch((function(t){return s.shiftLoading(),s.openRemindModel("變更密碼失敗",t.response.data.message),t.response.data})));case 2:case"end":return r.stop()}}),r)})))()},logOut:function(){var t=this;s.openAskModel("登出","請問您確定要登出？",(function(){localStorage.removeItem("sd-user"),t.resetUser()}))},resetUser:function(){this.user.name="",this.user.id="",this.user.token="",this.user.photo="",this.myProfile={}}}});e["a"]=f}}]);
//# sourceMappingURL=chunk-e1184cba.148b84f2.js.map