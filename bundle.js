!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){n(1),e.exports=n(2)},function(e,t){var n=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function c(e){try{s(r.next(e))}catch(e){a(e)}}function i(e){try{s(r.throw(e))}catch(e){a(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,i)}s((r=r.apply(e,t||[])).next())}))},r=this&&this.__generator||function(e,t){var n,r,o,a,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(a){return function(i){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;c;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return c.label++,{value:a[1],done:!1};case 5:c.label++,r=a[1],a=[0];continue;case 7:a=c.ops.pop(),c.trys.pop();continue;default:if(!(o=c.trys,(o=o.length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){c=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){c.label=a[1];break}if(6===a[0]&&c.label<o[1]){c.label=o[1],o=a;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(a);break}o[2]&&c.ops.pop(),c.trys.pop();continue}a=t.call(e,c)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,i])}}};fetch("./dist/data.json").then((function(e){return e.json()})).then((function(e){!function(e){var t,n,r=e,o=document.getElementById("search"),i=document.querySelector(".list"),s=document.querySelector(".nav-conteiner"),l=document.querySelectorAll(".choose"),u=document.querySelector(".mobile-dropdown-nav"),d=e,f="",h="brand",p=!1,m=r.length;function v(e){e&&(f=e.target.value.toUpperCase()),m=d.length,d=r.filter((function(e){return-1!==e[h].toUpperCase().indexOf(f)}));var o=r.filter((function(e){return-1===e[h].toUpperCase().indexOf(f)}));!function(e){if(r.length>0){var t=d.map((function(e){return e.id}));e.forEach((function(e){Array.from(e).forEach((function(e){t.forEach((function(t){e.dataset.id===t&&e.classList.replace("hide","show")}))}))}))}}([t,n]),function(e,t){if(r.length>0){var n=e.map((function(e){return e.id}));t.forEach((function(e){Array.from(e).forEach((function(e){n.forEach((function(t){e.dataset.id===t&&e.classList.replace("show","hide")}))}))}))}}(o,[t,n]),b()}function g(){i.innerHTML="",r.map((function(e){var t=document.createElement("li");t.className="item",t.setAttribute("data-id",e.id),t.innerHTML=e.phone+'\n        <span class="brand">\n          '+e.brand+'\n        </span>\n        <button class="delete-btn"value="'+e.id+'">\n          <i class="fas fa-trash-alt"></i>\n        </button>',i.appendChild(t)})),t=document.querySelectorAll(".item"),document.querySelectorAll(".delete-btn").forEach((function(e){return e.addEventListener("click",E)}))}function y(){var e=document.querySelector(".order-conteiner");e.innerHTML="",r.map((function(t){var n=document.createElement("li");n.className="order-item red-theme show",n.setAttribute("data-id",t.id),n.setAttribute("data-theme","red-theme"),n.innerHTML="\n                <h4>"+t.phone+'</h4>\n                <div class="preloader">\n                  <span class="active"></span>\n                  <span class="active"></span>\n                  <span class="active"></span>\n                </div>\n                <p>'+t.description+'</p>\n                <span class="brand-order">'+t.brand+'</span>\n                <button class="add-to-cart">Add To Cart</button>\n                <span class="price">'+t.price+"</span>\n            ",e.appendChild(n)})),n=document.querySelectorAll(".order-item"),x(void 0)}o.addEventListener("keyup",v),o.addEventListener("click",(function(){if(""===f){var e=this.previousElementSibling,n=e.previousElementSibling,r=this.parentElement.nextElementSibling;p=!p,r.classList.toggle("show"),this.classList.toggle("on-focus"),n.classList.toggle("on-focus"),e.classList.toggle("on-focus")}p?L():(o.blur(),t.forEach((function(e){e.classList.remove("show")})))})),g(),y();var b=function(){0===d.length?i.innerHTML='<p class="no-result">No Match</p>':0===m&&0!==d&&(g(),L())};function E(){var e=this.value,t=this.parentElement,n=document.querySelector(".order-item[data-id]");r=r.filter((function(t){return t.id!==e})),t.classList.remove("show"),t.classList.add("hide-scale-down"),n.classList.add("hide-scale-down"),n.addEventListener("transitionend",(function(){t.remove(),n.remove()}))}function L(){t.forEach((function(e,t){setTimeout((function(){e.classList.add("show")}),30*(t+1))}))}var S=document.querySelector("#scroll");i.addEventListener("scroll",(function(){var e=i.scrollTop,t=i.offsetHeight,n=e/(i.scrollHeight-t)*100;S.style.height=n+"%"}));var w=document.querySelectorAll(".filter"),q=function(e){h=e.target.value,v(f)};function x(e){var t=localStorage.getItem("Theme");"undefined"!==t&&"null"!==t||(localStorage.setItem("Theme",s.dataset.theme),e="red-theme"),void 0===e&&(e=t,t="red-theme"),document.body.classList.replace(t,e),n.forEach((function(n){return n.classList.replace(t,e)})),s.dataset.theme=e,localStorage.setItem("Theme",e)}w.forEach((function(e){return e.addEventListener("change",q)})),l.forEach((function(e){e.addEventListener("click",(function(){x(this.dataset.theme)}))})),x(localStorage.getItem("Theme")),u.addEventListener("click",(function(){c.classList.toggle("show"),u.classList.toggle("change-arrow-direction")})),document.querySelector(".drop-down-menu").addEventListener("click",(function(){document.querySelector(".change-theme").classList.toggle("show"),this.classList.toggle("show")}));var A=document.querySelectorAll(".sort-input"),T=document.querySelectorAll(".icon-set");A.forEach((function(e){e.addEventListener("change",(function(t){var n=e.previousElementSibling,o=t.target.value,c=e.dataset.sortBy;T.forEach((function(e){return e.classList.remove("active-set")})),n.classList.add("active-set"),r.sort((function(e,t){return"from lowest"===o?parseFloat(e[c])-parseFloat(t[c]):parseFloat(t[c])-parseFloat(e[c])})),y(),a()}))}));var j=document.querySelector(".fa-chevron-left"),k=document.getElementById("sort-aside");j.addEventListener("click",(function(){this.classList.toggle("active"),k.classList.toggle("active")}))}(e.data),a()})).catch((function(){console.log(new Error)}));var o=["/Iphone11-Pro.png","/Samsung-galaxy-s20-ultra.jpg","/Huawei-p40-pro.jpg","/Xperia-1.png","/xiaomi-mi-10-pro.png","/asus-zenfone-5-.webp","/oppo-find-x.jpg"];function a(){return n(this,void 0,void 0,(function(){return r(this,(function(e){return o.forEach((function(e,t){setTimeout((function(){fetch("./dist/img"+e).then((function(e){return e.blob()})).then((function(e){return URL.createObjectURL(e)})).then((function(e){var n=document.createElement("img"),r=document.querySelectorAll(".preloader"),o=Array.from(r[t].querySelectorAll("span"));n.src=e,r[t].appendChild(n),o.forEach((function(e){return e.remove()}))})).catch((function(){console.log(new Error("oops"))}))}),200*t)})),[2]}))}))}var c=document.querySelector(".nav-conteiner");document.addEventListener("scroll",(function(){window.scrollY>=c.offsetHeight?c.classList.add("fixed-nav"):c.classList.remove("fixed-nav")}))},function(e,t){}]);