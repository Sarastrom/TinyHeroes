(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{3224:function(t,e,o){"use strict";o.r(e);o(13),o(12),o(9),o(11);var r=o(231),c=(o(36),o(0)),n=(o(8),o(15),o(2)),l=o(46);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}function h(t){var e=t._this,o=t.category,r=t.style,style=void 0===r?"":r,c=t.meta,meta=void 0!==c&&c,n=t.params,l=void 0===n?{}:n,f=meta?"_META":"",d="none"!==function(t,e){var o=e.shape,r=e.color,c=e.format;return o||r||c?!o||r||c?o||!r||c?o||r||!c?"much":"format":"color":"shape":"none"}(0,l)?"_FILTERS":"",h=o.name[o.lang]||o.name["en-US"],m="";l.shape&&(m+="".concat(e.$t("WEB_APP.SEO.FILTERS.".concat(l.shape.toUpperCase()),"")," ")),l.color&&(m+="".concat(e.$t("WEB_APP.SEO.FILTERS.".concat(l.color.toUpperCase()),"")," ")),m+="".concat(style," "),l.format&&(m+="".concat(e.$t("WEB_APP.SEO.FILTERS.".concat(l.format.toUpperCase()),"PNG")," "));var P="";return l.shape&&(P+="".concat(e.$t("WEB_APP.SEO.FILTERS.".concat(l.shape.toUpperCase()),"")," ")),l.color&&(P+="".concat(e.$t("WEB_APP.SEO.FILTERS.".concat(l.color.toUpperCase()),"")," ")),P+="".concat(h," "),l.format&&(P+="".concat(e.$t("WEB_APP.SEO.FILTERS.".concat(l.format.toUpperCase()),"PNG")," ")),e.$t("WEB_APP.SEO.CATEGORY_STYLE.DESCRIPTION".concat(d).concat(f),{filters:m.toLowerCase(),style:style,category:h.toLowerCase(),filter_category:P.toLowerCase()})}function m(t){var e=t.app,o=t.params,r=t.store,c=t.redirect;if(o.platform){var n=Object(l.a)(o.platform);return new Promise((function(t){var l=e.$utils.normalizeValue(o.pack);r.dispatch("setPack",l),r.dispatch("setPlatform",n.$rootPath);var f=r.state.platform.apiCode;if(r.state.appInfo.platforms[f]&&"all"!==f){var m=r.state,P=m.i18n.locale;r.dispatch("getPack").then((function(c){if(c.success){var v=r.getters.hostUrl||"https://icons8.com",y="".concat(v,"/icon/pack/").concat(l,"/").concat(f);"all"===f&&(y="".concat(v,"/icon/pack/").concat(l));var C=function(t,style,e,o){var r=e.name[e.lang]||e.name["en-US"],c="free-icons"===e.code?".".concat(e.code):"",n="";return o?(o.shape&&(n+="".concat(t.$t("WEB_APP.SEO.FILTERS.".concat(o.shape.toUpperCase()),"")," ")),o.color&&(n+="".concat(t.$t("WEB_APP.SEO.FILTERS.".concat(o.color.toUpperCase()),"")," ")),n+="".concat(style," "),o.format&&(n+="".concat(t.$t("WEB_APP.SEO.FILTERS.".concat(o.format.toUpperCase()),"PNG")," ")),"".concat(t.$t("WEB_APP.SEO.CATEGORY_STYLE".concat(c,".TITLE"),{style:n.trim(),category:r}))):name}(e,m.platform.title,d({},m.pack,{lang:P}),n),title=C;m.pack.free&&(C+='<span class="badge is-big">Free SVG</span>');var E=h({_this:e,style:m.platform.title,category:d({},m.pack,{lang:P}),params:n});E+="<br/>".concat(e.$t("WEB_APP.SEO.CATEGORY_PACKS.DESCRIPTION_ADDITION"));var S=h({_this:e,style:m.platform.title,category:d({},m.pack,{lang:P}),meta:!0,params:n});r.dispatch("updateSEO",{titlePage:C,descriptionPage:E,title:title,description:S,canonical:y,image:c.category.share_preview}),t(d({currentPlatform:o.platform},c,{fetchComplete:!0,parsedParams:n}))}else t({error:{message:c.message},fetchComplete:!0})})).catch((function(e){console.error("page error",e&&e.message?e.message:e),c(301,encodeURI("/icon/pack/free-icons/".concat(f))),t({currentPlatform:o.platform,error:{message:e.message}})}))}else c(301,encodeURI("/icons/pack/".concat(l)))}))}}var P={name:"PackPlatformPage",layout:"appTmp",scrollToTop:!0,data:function(){return{allIconsLoaded:!1,page:1,category:void 0,activeGrid:void 0,fetchComplete:!1,currentPlatform:void 0,parsedParams:void 0,colorBuffer:null,newPlatform:null,platformsWithOutColor:["color","m_two_tone","office","dusk","ultraviolet","nolan","cotton","doodle","flat_round","clouds","bubbles","plasticine","cool"]}},computed:d({},Object(n.e)({seo:function(t){return t.seo.data},iconsGridStyle:function(t){return t.ui.iconsGridStyle},extendedIconsGridStyle:function(t){return t.ui.extendedIconsGridStyle},platforms:function(t){return t.appInfo.platforms},platform:function(t){return t.platform},filters:function(t){return t.filters},pack:function(t){return t.pack},lang:function(t){return t.i18n.locale},colors:function(t){return t.filters.colorsList}}),{extendedGrid:function(){return"all"===this.$route.params.platform},gridStyle:function(){return this.extendedGrid?this.extendedIconsGridStyle:this.iconsGridStyle}}),watch:{platform:function(t,e){t.apiCode!==e.apiCode&&(this.currentPlatform=this.platform.apiCode,this.setStyleCategory(this.currentPlatform))}},asyncData:function(t){t.app;var e=t.params;t.store,t.redirect;return{parsedParams:Object(l.a)(e.platform),category:void 0,error:void 0}},mounted:function(){if(this.$route.params.platform||(window.location="/icons/pack/".concat(this.$route.params.pack)),this.currentPlatform=this.platform.apiCode,this.category||this.error||this.fetchData(this.$route.params),this.parsedParams){var t=this.colors?this.colors[this.parsedParams.color||"black"]:{value:"000000",code:"black",title:""};this.setSearchColor(t)}},updated:function(){},methods:d({},Object(n.b)(["changeSelectPlatform","setSearchColor","setFilterColorBuffer"]),{activateGrid:function(t){this.activeGrid=t},fetchData:function(t){var e=this;return this.fetchComplete=!1,new Promise((function(o){m({app:e,store:e.$store,params:t}).then((function(t){e.category=t.category,e.fetchComplete=!0,o()})).catch((function(t){console.error("error",t),e.checkError(t),o()}))}))},fetchNext:function(t){var e=this;this.$store.dispatch("getPack",{page:this.page+1}).then((function(o){e.page++,o.success?(console.log(o),e.mergeCategories(e.category,o.category),t.loaded()):(t.complete(),e.allIconsLoaded=!0,console.log("--- Loaded Icons ---"))})).catch((function(o){o.response.data.error&&(t.complete(),e.allIconsLoaded=!0),console.error("page error",o&&o.message?o.message:o)}))},mergeCategories:function(t,e){e.subcategory.forEach((function(e){var o,sub=t.subcategory.find((function(t){return t.code===e.code}));sub?(o=sub.icons).push.apply(o,Object(r.a)(e.icons)):t.subcategory.push(e)}))},checkError:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.error;t&&(console.log("this.error",this.error),this.error=void 0)},showColors:function(t){return!this.platformsWithOutColor.some((function(e){return e===t}))},setStyleCategory:function(style){this.newPlatform=style,this.showColors(this.newPlatform)||this.setFilterColorBuffer(this.filters.color||this.filters.colorBuffer),this.changeSelectPlatform(),"all"!==style?this.$router.push(this.getCurrentLink("/icon/pack/".concat(this.pack.code,"/").concat(this.platforms[style].seoCode))):this.$router.push(this.getCurrentLink("/icons/pack/".concat(this.pack.code)))},getCurrentLink:function(path){return this.filters.format&&(path+="--".concat(this.filters.format)),this.filters.color&&this.showColors(this.newPlatform)&&!this.filters.colorBuffer&&(path+="--".concat(this.filters.color)),this.showColors(this.newPlatform)&&this.filters.colorBuffer&&(path+="--".concat(this.filters.colorBuffer),this.setFilterColorBuffer(null)),this.filters.shape&&(path+="--".concat(this.filters.shape)),path}})},v=(o(970),o(1)),component=Object(v.a)(P,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"pack-page"},[t.category?[o("div",{staticClass:"app-page-section custom-padding"},[o("app-header")],1)]:[o("div",{staticClass:"app-page-section custom-padding"},[o("icon-placeholder",{attrs:{type:"description"}})],1)],t.fetchComplete&&!t.category?o("div",{staticClass:"app-page-section custom-padding"},[o("nothing-found")],1):t._e(),t.category?t._e():[o("div",{staticClass:"app-page-section custom-padding"},[o("icon-placeholder",{attrs:{count:24,type:"icon"}})],1)],t.category?o("div",{staticClass:"app-page-section custom-padding"},[t._l(t.category.subcategory,(function(e){return o("div",[o("h6",{staticClass:"app-page-section-title"},[t._v(t._s(e.name))]),o("icon-grid",{attrs:{icons:e.icons,"grid-style":t.gridStyle,id:e.name,action:"select","active-grid":t.activeGrid},on:{activate:t.activateGrid}})],1)})),o("no-ssr",[o("infinite-loading",{directives:[{name:"show",rawName:"v-show",value:!t.allIconsLoaded,expression:"!allIconsLoaded"}],attrs:{distance:450},on:{infinite:t.fetchNext}},[o("div",{staticClass:"is-loading",attrs:{slot:"spinner"},slot:"spinner"})])],1),t.allIconsLoaded?o("request-icon"):t._e()],2):t._e()],2)}),[],!1,null,"7de83e80",null);e.default=component.exports},834:function(t,e,o){var content=o(971);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(7).default)("76728402",content,!0,{sourceMap:!1})},970:function(t,e,o){"use strict";var r=o(834);o.n(r).a},971:function(t,e,o){(t.exports=o(6)(!1)).push([t.i,'.pack-page .platforms[data-v-7de83e80]{display:inline-block;width:auto}.is-loading[data-v-7de83e80]{position:relative;height:100px}.is-loading[data-v-7de83e80]:after{content:"";position:absolute;top:50%;left:50%;margin-top:-1.5rem;margin-left:-1.5rem;width:3rem;height:3rem;border-radius:50%;border:2px solid hsla(0,0%,66.7%,.2);border-top-color:hsla(0,0%,66.7%,.8);-webkit-animation:spin 1s linear infinite;animation:spin 1s linear infinite}',""])}}]);