(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){"use strict";function videos(){document.querySelectorAll(".Embed").forEach(setupVideo)}function setupVideo(e){var t=e.querySelector(".Embed-figure"),o=e.querySelector(".Embed-link"),r=new Player(t,options);players.push({player:r,el:e}),o.addEventListener("click",function(t){players.forEach(function(e){e.el.classList.remove("is-playing")}),e.classList.add("is-playing"),t.preventDefault(),r.play()}),r.ready().then(function(){e.querySelector("iframe").classList.add("Embed-iframe"),e.classList.add("is-ready")}),r.on("ended",function(t){e.classList.add("is-notAnimated"),e.classList.remove("is-playing"),r.setCurrentTime(0).then(function(){r.pause()})})}var Player=require("@vimeo/player"),smoothscroll=require("smoothscroll-polyfill");smoothscroll.polyfill();var options={byline:!1,color:"ed001c",portrait:!1,title:!1};document.querySelector(".Logo-path").addEventListener("animationend",function(e){videos()}),document.querySelectorAll(".js-toggle").forEach(function(e){e.addEventListener("click",function(e){document.querySelector(".Info").classList.toggle("is-target"),document.documentElement.classList.toggle("is-overlaid"),e.preventDefault()})}),document.querySelector(".Intro-link").addEventListener("click",function(e){document.querySelector("#work").scrollIntoView({behavior:"smooth",block:"start"}),e.preventDefault()});var players=[]},{"@vimeo/player":2,"smoothscroll-polyfill":3}],2:[function(require,module,exports){(function(global){!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e.Vimeo=e.Vimeo||{},e.Vimeo.Player=t())}(this,function(){"use strict";function e(e,t){return t={exports:{}},e(t,t.exports),t.exports}function t(e,t,n){var r=E.get(e.element)||{};t in r||(r[t]=[]),r[t].push(n),E.set(e.element,r)}function n(e,t){return(E.get(e.element)||{})[t]||[]}function r(e,t,n){var r=E.get(e.element)||{};if(!r[t])return!0;if(!n)return r[t]=[],E.set(e.element,r),!0;var i=r[t].indexOf(n);return-1!==i&&r[t].splice(i,1),E.set(e.element,r),r[t]&&0===r[t].length}function i(e,t){var i=n(e,t);if(i.length<1)return!1;var o=i.shift();return r(e,t,o),o}function o(e,t){var n=E.get(e);E.set(t,n),E.delete(e)}function a(e,t){return 0===e.indexOf(t.toLowerCase())?e:""+t.toLowerCase()+e.substr(0,1).toUpperCase()+e.substr(1)}function u(e){return e instanceof window.HTMLElement}function s(e){return!isNaN(parseFloat(e))&&isFinite(e)&&Math.floor(e)==e}function c(e){return/^(https?:)?\/\/((player|www).)?vimeo.com(?=$|\/)/.test(e)}function f(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.id,n=e.url,r=t||n;if(!r)throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");if(s(r))return"https://vimeo.com/"+r;if(c(r))return r.replace("http:","https:");if(t)throw new TypeError("“"+t+"” is not a valid video id.");throw new TypeError("“"+r+"” is not a vimeo.com url.")}function l(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return T.reduce(function(t,n){var r=e.getAttribute("data-vimeo-"+n);return(r||""===r)&&(t[n]=""===r?1:r),t},t)}function h(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise(function(n,r){if(!c(e))throw new TypeError("“"+e+"” is not a vimeo.com url.");var i="https://vimeo.com/api/oembed.json?url="+encodeURIComponent(e);for(var o in t)t.hasOwnProperty(o)&&(i+="&"+o+"="+encodeURIComponent(t[o]));var a="XDomainRequest"in window?new XDomainRequest:new XMLHttpRequest;a.open("GET",i,!0),a.onload=function(){if(404!==a.status)if(403!==a.status)try{var t=JSON.parse(a.responseText);n(t)}catch(e){r(e)}else r(new Error("“"+e+"” is not embeddable."));else r(new Error("“"+e+"” was not found."))},a.onerror=function(){var e=a.status?" ("+a.status+")":"";r(new Error("There was an error fetching the embed code from Vimeo"+e+"."))},a.send()})}function d(e,t){var n=e.html;if(!t)throw new TypeError("An element must be provided");if(null!==t.getAttribute("data-vimeo-initialized"))return t.querySelector("iframe");var r=document.createElement("div");return r.innerHTML=n,t.appendChild(r.firstChild),t.setAttribute("data-vimeo-initialized","true"),t.querySelector("iframe")}function v(e){return"string"==typeof e&&(e=JSON.parse(e)),e}function p(e,t,n){if(e.element.contentWindow&&e.element.contentWindow.postMessage){var r={method:t};void 0!==n&&(r.value=n);var i=parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/,"$1"));i>=8&&i<10&&(r=JSON.stringify(r)),e.element.contentWindow.postMessage(r,e.origin)}}function y(e,t){var o=[],a=void 0;if((t=v(t)).event)"error"===t.event&&n(e,t.data.method).forEach(function(n){var i=new Error(t.data.message);i.name=t.data.name,n.reject(i),r(e,t.data.method,n)}),o=n(e,"event:"+t.event),a=t.data;else if(t.method){var u=i(e,t.method);u&&(o.push(u),a=t.value)}o.forEach(function(t){try{if("function"==typeof t)return void t.call(e,a);t.resolve(a)}catch(e){}})}function m(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var g=void 0!==Array.prototype.indexOf,w=void 0!==window.postMessage;if(!g||!w)throw new Error("Sorry, the Vimeo Player API is not available in this browser.");var k="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},b=(e(function(e,t){!function(e){function t(e,t){function r(e){if(!this||this.constructor!==r)return new r(e);this._keys=[],this._values=[],this._itp=[],this.objectOnly=t,e&&n.call(this,e)}return t||y(e,"size",{get:d}),e.constructor=r,r.prototype=e,r}function n(e){this.add?e.forEach(this.add,this):e.forEach(function(e){this.set(e[0],e[1])},this)}function r(e){return this.has(e)&&(this._keys.splice(p,1),this._values.splice(p,1),this._itp.forEach(function(e){p<e[0]&&e[0]--})),-1<p}function i(e){return this.has(e)?this._values[p]:void 0}function o(e,t){if(this.objectOnly&&t!==Object(t))throw new TypeError("Invalid value used as weak collection key");if(t!=t||0===t)for(p=e.length;p--&&!m(e[p],t););else p=e.indexOf(t);return-1<p}function a(e){return o.call(this,this._values,e)}function u(e){return o.call(this,this._keys,e)}function s(e,t){return this.has(e)?this._values[p]=t:this._values[this._keys.push(e)-1]=t,this}function c(e){return this.has(e)||this._values.push(e),this}function f(){(this._keys||0).length=this._values.length=0}function l(){return h(this._itp,this._values)}function h(e,t,n){var r=[0],i=!1;return e.push(r),{next:function(){var o,a=r[0];return!i&&a<t.length?(o=n?[t[a],n[a]]:t[a],r[0]++):(i=!0,e.splice(e.indexOf(r),1)),{done:i,value:o}}}}function d(){return this._values.length}function v(e,t){for(var n=this.entries();;){var r=n.next();if(r.done)break;e.call(t,r.value[1],r.value[0],this)}}var p,y=Object.defineProperty,m=function(e,t){return e===t||e!==e&&t!==t};"undefined"==typeof WeakMap&&(e.WeakMap=t({delete:r,clear:f,get:i,has:u,set:s},!0)),"undefined"!=typeof Map&&"function"==typeof(new Map).values&&(new Map).values().next||(e.Map=t({delete:r,has:u,get:i,set:s,keys:function(){return h(this._itp,this._keys)},values:l,entries:function(){return h(this._itp,this._keys,this._values)},forEach:v,clear:f})),"undefined"!=typeof Set&&"function"==typeof(new Set).values&&(new Set).values().next||(e.Set=t({has:a,add:c,delete:r,clear:f,keys:l,values:l,entries:function(){return h(this._itp,this._values,this._values)},forEach:v})),"undefined"==typeof WeakSet&&(e.WeakSet=t({delete:r,add:c,clear:f,has:a},!0))}(void 0!==k?k:window)}),e(function(e){var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(t,n,r){n[t]=n[t]||r(),e.exports&&(e.exports=n[t])}("Promise",k,function(){function e(e,t){d.add(e,t),h||(h=p(d.drain))}function n(e){var n,r=void 0===e?"undefined":t(e);return null==e||"object"!=r&&"function"!=r||(n=e.then),"function"==typeof n&&n}function r(){for(var e=0;e<this.chain.length;e++)i(this,1===this.state?this.chain[e].success:this.chain[e].failure,this.chain[e]);this.chain.length=0}function i(e,t,r){var i,o;try{!1===t?r.reject(e.msg):(i=!0===t?e.msg:t.call(void 0,e.msg))===r.promise?r.reject(TypeError("Promise-chain cycle")):(o=n(i))?o.call(i,r.resolve,r.reject):r.resolve(i)}catch(e){r.reject(e)}}function o(t){var i,u=this;if(!u.triggered){u.triggered=!0,u.def&&(u=u.def);try{(i=n(t))?e(function(){var e=new s(u);try{i.call(t,function(){o.apply(e,arguments)},function(){a.apply(e,arguments)})}catch(t){a.call(e,t)}}):(u.msg=t,u.state=1,u.chain.length>0&&e(r,u))}catch(e){a.call(new s(u),e)}}}function a(t){var n=this;n.triggered||(n.triggered=!0,n.def&&(n=n.def),n.msg=t,n.state=2,n.chain.length>0&&e(r,n))}function u(e,t,n,r){for(var i=0;i<t.length;i++)!function(i){e.resolve(t[i]).then(function(e){n(i,e)},r)}(i)}function s(e){this.def=e,this.triggered=!1}function c(e){this.promise=e,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function f(t){if("function"!=typeof t)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var n=new c(this);this.then=function(t,i){var o={success:"function"!=typeof t||t,failure:"function"==typeof i&&i};return o.promise=new this.constructor(function(e,t){if("function"!=typeof e||"function"!=typeof t)throw TypeError("Not a function");o.resolve=e,o.reject=t}),n.chain.push(o),0!==n.state&&e(r,n),o.promise},this.catch=function(e){return this.then(void 0,e)};try{t.call(void 0,function(e){o.call(n,e)},function(e){a.call(n,e)})}catch(e){a.call(n,e)}}var l,h,d,v=Object.prototype.toString,p="undefined"!=typeof setImmediate?function(e){return setImmediate(e)}:setTimeout;try{Object.defineProperty({},"x",{}),l=function(e,t,n,r){return Object.defineProperty(e,t,{value:n,writable:!0,configurable:!1!==r})}}catch(e){l=function(e,t,n){return e[t]=n,e}}d=function(){function e(e,t){this.fn=e,this.self=t,this.next=void 0}var t,n,r;return{add:function(i,o){r=new e(i,o),n?n.next=r:t=r,n=r,r=void 0},drain:function(){var e=t;for(t=n=h=void 0;e;)e.fn.call(e.self),e=e.next}}}();var y=l({},"constructor",f,!1);return f.prototype=y,l(y,"__NPO__",0,!1),l(f,"resolve",function(e){var n=this;return e&&"object"==(void 0===e?"undefined":t(e))&&1===e.__NPO__?e:new n(function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");t(e)})}),l(f,"reject",function(e){return new this(function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");n(e)})}),l(f,"all",function(e){var t=this;return"[object Array]"!=v.call(e)?t.reject(TypeError("Not an array")):0===e.length?t.resolve([]):new t(function(n,r){if("function"!=typeof n||"function"!=typeof r)throw TypeError("Not a function");var i=e.length,o=Array(i),a=0;u(t,e,function(e,t){o[e]=t,++a===i&&n(o)},r)})}),l(f,"race",function(e){var t=this;return"[object Array]"!=v.call(e)?t.reject(TypeError("Not an array")):new t(function(n,r){if("function"!=typeof n||"function"!=typeof r)throw TypeError("Not a function");u(t,e,function(e,t){n(t)},r)})}),f})})),E=new WeakMap,T=["id","url","width","maxwidth","height","maxheight","portrait","title","byline","color","autoplay","autopause","loop","responsive","speed"],_=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),j=new WeakMap,x=new WeakMap,M=function(){function e(t){var n=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(m(this,e),window.jQuery&&t instanceof jQuery&&(t.length>1&&window.console&&console.warn&&console.warn("A jQuery object with multiple elements was passed, using the first element."),t=t[0]),"string"==typeof t&&(t=document.getElementById(t)),!u(t))throw new TypeError("You must pass either a valid element or a valid id.");if("IFRAME"!==t.nodeName){var i=t.querySelector("iframe");i&&(t=i)}if("IFRAME"===t.nodeName&&!c(t.getAttribute("src")||""))throw new Error("The player element passed isn’t a Vimeo embed.");if(j.has(t))return j.get(t);this.element=t,this.origin="*";var a=new b(function(e,i){var a=function(t){if(c(t.origin)&&n.element.contentWindow===t.source){"*"===n.origin&&(n.origin=t.origin);var r=v(t.data),i="event"in r&&"ready"===r.event,o="method"in r&&"ping"===r.method;if(i||o)return n.element.setAttribute("data-ready","true"),void e();y(n,r)}};if(window.addEventListener?window.addEventListener("message",a,!1):window.attachEvent&&window.attachEvent("onmessage",a),"IFRAME"!==n.element.nodeName){var u=l(t,r);h(f(u),u).then(function(e){var r=d(e,t);return n.element=r,o(t,r),j.set(n.element,n),e}).catch(function(e){return i(e)})}});return x.set(this,a),j.set(this.element,this),"IFRAME"===this.element.nodeName&&p(this,"ping"),this}return _(e,[{key:"callMethod",value:function(e){var n=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new b(function(i,o){return n.ready().then(function(){t(n,e,{resolve:i,reject:o}),p(n,e,r)})})}},{key:"get",value:function(e){var n=this;return new b(function(r,i){return e=a(e,"get"),n.ready().then(function(){t(n,e,{resolve:r,reject:i}),p(n,e)})})}},{key:"set",value:function(e,n){var r=this;return b.resolve(n).then(function(n){if(e=a(e,"set"),void 0===n||null===n)throw new TypeError("There must be a value to set.");return r.ready().then(function(){return new b(function(i,o){t(r,e,{resolve:i,reject:o}),p(r,e,n)})})})}},{key:"on",value:function(e,r){if(!e)throw new TypeError("You must pass an event name.");if(!r)throw new TypeError("You must pass a callback function.");if("function"!=typeof r)throw new TypeError("The callback must be a function.");0===n(this,"event:"+e).length&&this.callMethod("addEventListener",e).catch(function(){}),t(this,"event:"+e,r)}},{key:"off",value:function(e,t){if(!e)throw new TypeError("You must pass an event name.");if(t&&"function"!=typeof t)throw new TypeError("The callback must be a function.");r(this,"event:"+e,t)&&this.callMethod("removeEventListener",e).catch(function(e){})}},{key:"loadVideo",value:function(e){return this.callMethod("loadVideo",e)}},{key:"ready",value:function(){var e=x.get(this);return b.resolve(e)}},{key:"addCuePoint",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.callMethod("addCuePoint",{time:e,data:t})}},{key:"removeCuePoint",value:function(e){return this.callMethod("removeCuePoint",e)}},{key:"enableTextTrack",value:function(e,t){if(!e)throw new TypeError("You must pass a language.");return this.callMethod("enableTextTrack",{language:e,kind:t})}},{key:"disableTextTrack",value:function(){return this.callMethod("disableTextTrack")}},{key:"pause",value:function(){return this.callMethod("pause")}},{key:"play",value:function(){return this.callMethod("play")}},{key:"unload",value:function(){return this.callMethod("unload")}},{key:"getAutopause",value:function(){return this.get("autopause")}},{key:"setAutopause",value:function(e){return this.set("autopause",e)}},{key:"getColor",value:function(){return this.get("color")}},{key:"setColor",value:function(e){return this.set("color",e)}},{key:"getCuePoints",value:function(){return this.get("cuePoints")}},{key:"getCurrentTime",value:function(){return this.get("currentTime")}},{key:"setCurrentTime",value:function(e){return this.set("currentTime",e)}},{key:"getDuration",value:function(){return this.get("duration")}},{key:"getEnded",value:function(){return this.get("ended")}},{key:"getLoop",value:function(){return this.get("loop")}},{key:"setLoop",value:function(e){return this.set("loop",e)}},{key:"getPaused",value:function(){return this.get("paused")}},{key:"getPlaybackRate",value:function(){return this.get("playbackRate")}},{key:"setPlaybackRate",value:function(e){return this.set("playbackRate",e)}},{key:"getTextTracks",value:function(){return this.get("textTracks")}},{key:"getVideoEmbedCode",value:function(){return this.get("videoEmbedCode")}},{key:"getVideoId",value:function(){return this.get("videoId")}},{key:"getVideoTitle",value:function(){return this.get("videoTitle")}},{key:"getVideoWidth",value:function(){return this.get("videoWidth")}},{key:"getVideoHeight",value:function(){return this.get("videoHeight")}},{key:"getVideoUrl",value:function(){return this.get("videoUrl")}},{key:"getVolume",value:function(){return this.get("volume")}},{key:"setVolume",value:function(e){return this.set("volume",e)}}]),e}();return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document,t=function(e){"console"in window&&console.error&&console.error("There was an error creating an embed: "+e)};[].slice.call(e.querySelectorAll("[data-vimeo-id], [data-vimeo-url]")).forEach(function(e){try{if(null!==e.getAttribute("data-vimeo-defer"))return;var n=l(e);h(f(n),n).then(function(t){return d(t,e)}).catch(t)}catch(e){t(e)}})}(),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document,t=function(t){if(c(t.origin)&&t.data&&"spacechange"===t.data.event)for(var n=e.querySelectorAll("iframe"),r=0;r<n.length;r++)if(n[r].contentWindow===t.source){var i=n[r].parentElement;i&&-1!==i.className.indexOf("vimeo-space")&&(i.style.paddingBottom=t.data.data[0].bottom+"px");break}};window.addEventListener?window.addEventListener("message",t,!1):window.attachEvent&&window.attachEvent("onmessage",t)}(),M})}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],3:[function(require,module,exports){!function(){"use strict";function o(o){var t=["MSIE ","Trident/","Edge/"];return new RegExp(t.join("|")).test(o)}function t(){function t(o,t){this.scrollLeft=o,this.scrollTop=t}function r(o){return.5*(1-Math.cos(Math.PI*o))}function i(o){if(null===o||"object"!=typeof o||void 0===o.behavior||"auto"===o.behavior||"instant"===o.behavior)return!0;if("object"==typeof o&&"smooth"===o.behavior)return!1;throw new TypeError("behavior member of ScrollOptions "+o.behavior+" is not a valid value for enumeration ScrollBehavior.")}function s(o,t){return"Y"===t?o.clientHeight+h<o.scrollHeight:"X"===t?o.clientWidth+h<o.scrollWidth:void 0}function c(o,t){var e=l.getComputedStyle(o,null)["overflow"+t];return"auto"===e||"scroll"===e}function n(o){var t=s(o,"Y")&&c(o,"Y"),l=s(o,"X")&&c(o,"X");return t||l}function f(o){var t;do{t=(o=o.parentNode)===e.body}while(!1===t&&!1===n(o));return t=null,o}function a(o){var t,e,i,s=(y()-o.startTime)/v;t=r(s=s>1?1:s),e=o.startX+(o.x-o.startX)*t,i=o.startY+(o.y-o.startY)*t,o.method.call(o.scrollable,e,i),e===o.x&&i===o.y||l.requestAnimationFrame(a.bind(l,o))}function p(o,r,i){var s,c,n,f,p=y();o===e.body?(s=l,c=l.scrollX||l.pageXOffset,n=l.scrollY||l.pageYOffset,f=u.scroll):(s=o,c=o.scrollLeft,n=o.scrollTop,f=t),a({scrollable:s,method:f,startTime:p,startX:c,startY:n,x:r,y:i})}if(!("scrollBehavior"in e.documentElement.style&&!0!==l.__forceSmoothScrollPolyfill__)){var d=l.HTMLElement||l.Element,v=468,h=o(l.navigator.userAgent)?1:0,u={scroll:l.scroll||l.scrollTo,scrollBy:l.scrollBy,elementScroll:d.prototype.scroll||t,scrollIntoView:d.prototype.scrollIntoView},y=l.performance&&l.performance.now?l.performance.now.bind(l.performance):Date.now;l.scroll=l.scrollTo=function(){void 0!==arguments[0]&&(!0!==i(arguments[0])?p.call(l,e.body,void 0!==arguments[0].left?~~arguments[0].left:l.scrollX||l.pageXOffset,void 0!==arguments[0].top?~~arguments[0].top:l.scrollY||l.pageYOffset):u.scroll.call(l,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:l.scrollX||l.pageXOffset,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:l.scrollY||l.pageYOffset))},l.scrollBy=function(){void 0!==arguments[0]&&(i(arguments[0])?u.scrollBy.call(l,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:0,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:0):p.call(l,e.body,~~arguments[0].left+(l.scrollX||l.pageXOffset),~~arguments[0].top+(l.scrollY||l.pageYOffset)))},d.prototype.scroll=d.prototype.scrollTo=function(){if(void 0!==arguments[0])if(!0!==i(arguments[0])){var o=arguments[0].left,t=arguments[0].top;p.call(this,this,void 0===o?this.scrollLeft:~~o,void 0===t?this.scrollTop:~~t)}else{if("number"==typeof arguments[0]&&void 0===arguments[1])throw new SyntaxError("Value couldn't be converted");u.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left:"object"!=typeof arguments[0]?~~arguments[0]:this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top:void 0!==arguments[1]?~~arguments[1]:this.scrollTop)}},d.prototype.scrollBy=function(){void 0!==arguments[0]&&(!0!==i(arguments[0])?this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior}):u.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop))},d.prototype.scrollIntoView=function(){if(!0!==i(arguments[0])){var o=f(this),t=o.getBoundingClientRect(),r=this.getBoundingClientRect();o!==e.body?(p.call(this,o,o.scrollLeft+r.left-t.left,o.scrollTop+r.top-t.top),"fixed"!==l.getComputedStyle(o).position&&l.scrollBy({left:t.left,top:t.top,behavior:"smooth"})):l.scrollBy({left:r.left,top:r.top,behavior:"smooth"})}else u.scrollIntoView.call(this,void 0===arguments[0]||arguments[0])}}}var l=window,e=document;"object"==typeof exports?module.exports={polyfill:t}:t()}()},{}]},{},[1]);